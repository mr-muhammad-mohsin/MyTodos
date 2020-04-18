import * as Hapi from "@hapi/hapi";
import { IDatabase } from "../config/database";
import { IServerConfiguration } from "../config/server";

export interface IPluginOptions {
    database: IDatabase;
    serverConfig: IServerConfiguration;
}

export interface IPluginInfo {
    name: string;
    version: string;
}

export interface IPlugin {
    register(server: Hapi.Server, options?: IPluginOptions);
    info(): IPluginInfo;
}

