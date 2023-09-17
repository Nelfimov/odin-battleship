import { WebpackPluginInstance } from 'webpack';
import { Watching } from 'webpack';
export interface ServiceBuildResultMessage {
    message: string;
}
export interface ServiceBuildResult {
    errors: ServiceBuildResultMessage[];
    warnings: ServiceBuildResultMessage[];
}
export declare class Service {
    private readonly cwd;
    constructor(cwd: string);
    build(plugins?: Array<WebpackPluginInstance>): Promise<ServiceBuildResult>;
    watch(callback?: any): Promise<Watching>;
}
