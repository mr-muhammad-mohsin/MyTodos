import * as Hapi from '@hapi/hapi';
import { IServerConfiguration } from "../config/server";
import { IDatabase } from "../config/database";
import * as APIRoutes from "./routes";
import * as TodoRoutes from "./todo/routes";

export async function initAPI(server: Hapi.Server, config: IServerConfiguration, database: IDatabase) {
    APIRoutes.init(server, config, database);
    TodoRoutes.init(server, config, database);
} 

