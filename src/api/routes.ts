import * as Hapi from '@hapi/hapi';
import { IServerConfiguration, builtApiRoute } from "../config/server";
import { IDatabase } from "../config/database";
import APIController from './controller';

function Routes(server: Hapi.Server, config: IServerConfiguration, db: IDatabase){
    const apiController = new APIController(config, db);
    server.bind(apiController);

    server.route({
        method: "GET",
        path: builtApiRoute("/home"),
        options: {
            handler: apiController.index,
            auth: false,
            tags: ["api", "API"],
            description: "API information route",
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "API Homepage view"
                        }
                    }
                }
            }
        }
    });
}

export function init(server: Hapi.Server, config: IServerConfiguration, database: IDatabase) {
    Routes(server, config, database);
}

