"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../config/server");
const controller_1 = __importDefault(require("./controller"));
function Routes(server, config, db) {
    const apiController = new controller_1.default(config, db);
    server.bind(apiController);
    server.route({
        method: "GET",
        path: server_1.builtApiRoute("/home"),
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
function init(server, config, database) {
    Routes(server, config, database);
}
exports.init = init;
//# sourceMappingURL=routes.js.map