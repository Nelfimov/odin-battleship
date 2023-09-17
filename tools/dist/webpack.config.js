"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackConfig = void 0;
const config_typescript_1 = __importDefault(require("@atls/config-typescript"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const find_up_1 = __importDefault(require("find-up"));
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const webpack_1 = require("webpack");
const webpack_externals_1 = require("./webpack.externals");
const webpack_externals_2 = require("./webpack.externals");
const webpack_interfaces_1 = require("./webpack.interfaces");
const webpackConfig = (cwd) => {
    const getWorkspaceExternals = async () => {
        try {
            const content = await (0, promises_1.readFile)((0, node_path_1.join)(cwd, 'package.json'), 'utf-8');
            const { externalDependencies = {} } = JSON.parse(content);
            return new Set(Object.keys(externalDependencies));
        }
        catch {
            return Promise.resolve(new Set());
        }
    };
    const getUnpluggedDependencies = async () => {
        const yarnFolder = await (0, find_up_1.default)('.yarn');
        if (!yarnFolder)
            return Promise.resolve(new Set());
        const pnpUnpluggedFolder = (0, node_path_1.join)(yarnFolder, 'unplugged');
        const dependenciesNames = new Set();
        const entries = await (0, fast_glob_1.default)('*/node_modules/*/package.json', {
            cwd: pnpUnpluggedFolder,
        });
        await Promise.all(entries
            .map((entry) => (0, node_path_1.join)(pnpUnpluggedFolder, entry))
            .map(async (entry) => {
            try {
                const { name } = JSON.parse((await (0, promises_1.readFile)(entry)).toString());
                if (name && !webpack_externals_1.FORCE_UNPLUGGED_PACKAGES.has(name)) {
                    dependenciesNames.add(name);
                }
            }
            catch {
            }
        }));
        return dependenciesNames;
    };
    const getExternals = async () => {
        const workspaceExternals = Array.from(await getWorkspaceExternals());
        const unpluggedExternals = Array.from(await getUnpluggedDependencies());
        return Array.from(new Set([...workspaceExternals, ...unpluggedExternals, ...webpack_externals_2.UNUSED_EXTERNALS])).reduce((result, dependency) => ({
            ...result,
            [dependency]: `commonjs2 ${dependency}`,
        }), {});
    };
    const build = async (environment = webpack_interfaces_1.WebpackEnvironment.prod, plugins = []) => ({
        mode: environment,
        bail: environment === webpack_interfaces_1.WebpackEnvironment.prod,
        externals: await getExternals(),
        target: 'async-node',
        optimization: { minimize: false },
        plugins: [environment === webpack_interfaces_1.WebpackEnvironment.dev ? new webpack_1.HotModuleReplacementPlugin() : () => { }, ...plugins],
        entry: (0, node_path_1.join)(cwd, 'src/index'),
        node: { __dirname: false, __filename: false },
        output: { path: (0, node_path_1.join)(cwd, 'dist'), filename: '[name].js' },
        resolve: { extensions: ['.tsx', '.ts', '.js'] },
        devtool: environment === webpack_interfaces_1.WebpackEnvironment.prod ? 'source-map' : 'eval-cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /.tsx?$/, use: {
                        loader: require.resolve('ts-loader'), options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                            onlyCompileBundledFiles: true,
                            compilerOptions: { ...config_typescript_1.default.compilerOptions, sourceMap: true },
                        }
                    }
                },
                { test: /\.proto$/, use: require.resolve('@atls/webpack-proto-imports-loader'), },
                { test: /\.css$/i, use: [require.resolve('style-loader'), require.resolve('css-loader')], },
                { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource', },
                { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', },
                { test: /\.ya?ml$/, use: require.resolve('yaml-loader'), },
            ]
        },
    });
    return { build };
};
exports.webpackConfig = webpackConfig;
