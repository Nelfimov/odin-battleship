"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const webpack_start_server_plugin_1 = require("@atls/webpack-start-server-plugin");
const node_stream_1 = require("node:stream");
const webpack_1 = __importDefault(require("webpack"));
const webpack_config_1 = require("./webpack.config");
const webpack_interfaces_1 = require("./webpack.interfaces");
class Service {
    constructor(cwd) {
        this.cwd = cwd;
    }
    async build(plugins = []) {
        const config = (0, webpack_config_1.webpackConfig)(this.cwd);
        const compiler = (0, webpack_1.default)(await config.build());
        return new Promise((resolve, reject) => {
            compiler.run((error, stats) => {
                if (error) {
                    if (!error.message) {
                        reject(error);
                    }
                    else {
                        resolve({
                            errors: [error],
                            warnings: [],
                        });
                    }
                }
                else if (stats) {
                    const { errors = [], warnings = [] } = stats.toJson();
                    resolve({
                        errors,
                        warnings,
                    });
                }
                else {
                    resolve({
                        errors: [],
                        warnings: [],
                    });
                }
            });
        });
    }
    async watch(callback) {
        const config = (0, webpack_config_1.webpackConfig)(this.cwd);
        const pass = new node_stream_1.PassThrough();
        pass.on('data', (chunk) => {
            chunk
                .toString()
                .split(/\r?\n/)
                .filter(Boolean)
                .forEach((row) => {
                try {
                    callback(JSON.parse(row));
                }
                catch {
                    callback({ body: row });
                }
            });
        });
        return (0, webpack_1.default)(await config.build(webpack_interfaces_1.WebpackEnvironment.dev, [
            new webpack_start_server_plugin_1.StartServerPlugin({ stdout: pass, stderr: pass }),
        ])).watch({}, (error, stats) => {
            if (error) {
                callback({
                    severityText: 'ERROR',
                    body: error,
                });
            }
            else if (stats) {
                const { errors = [], warnings = [] } = stats.toJson();
                warnings.forEach((warning) => callback({
                    severityText: 'WARN',
                    body: warning,
                }));
                errors.forEach((err) => callback({
                    severityText: 'ERROR',
                    body: err,
                }));
            }
        });
    }
}
exports.Service = Service;
