import { Configuration } from 'webpack';
import { WebpackPluginInstance } from 'webpack';
export declare enum WebpackEnvironment {
    prod = "production",
    dev = "development"
}
export declare type GetWorkspaceExternals = () => Promise<Set<string>>;
export declare type GetUnpluggedDependencies = () => Promise<Set<string>>;
export declare type GetExternals = () => Promise<{
    [key: string]: string;
}>;
export declare type Build = (environment?: WebpackEnvironment, plugins?: Array<WebpackPluginInstance>) => Promise<Configuration>;
export declare type CreateWebpackConfig = (cwd: string) => {
    build: Build;
};
