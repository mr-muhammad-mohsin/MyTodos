"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../config/server");
const controller_1 = __importDefault(require("./controller"));
const TodoValidators = __importStar(require("./validators"));
function Routes(server, config, db) {
    const todoController = new controller_1.default(config, db);
    server.bind(todoController);
    server.route({
        method: "GET",
        path: server_1.builtApiRoute("/todos"),
        options: {
            handler: todoController.index,
            auth: false,
            tags: ["api", "ToDos"],
            description: "Get all todos for the user",
            validate: {
                query: TodoValidators.queryValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "ToDo found and returned"
                        }
                    }
                }
            }
        }
    });
    server.route({
        method: "POST",
        path: server_1.builtApiRoute("/todos"),
        options: {
            handler: todoController.createTodo,
            tags: ["api", "ToDos"],
            description: "Create new todo for user",
            validate: {
                payload: TodoValidators.todoCreateModel
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Todo created successfully"
                        },
                        "401": {
                            description: "User not authenticated, please login"
                        }
                    }
                }
            }
        }
    });
    server.route({
        method: "GET",
        path: server_1.builtApiRoute("/todos/{id}"),
        options: {
            handler: todoController.getTodo,
            tags: ["api", "ToDos"],
            description: "Get todos by id for the user",
            validate: {
                params: TodoValidators.paramValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "ToDo found and returned"
                        },
                        "401": {
                            description: "User not authenticated, please login"
                        }
                    }
                }
            }
        }
    });
    server.route({
        method: "PUT",
        path: server_1.builtApiRoute("/todos/{id}"),
        options: {
            handler: todoController.updateTodo,
            tags: ["api", "ToDos"],
            description: "Update existing todo for user",
            validate: {
                params: TodoValidators.paramValidator,
                payload: TodoValidators.todoUpdateModel
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Todo updated successfully"
                        },
                        "401": {
                            description: "User not authenticated, please login"
                        }
                    }
                }
            }
        }
    });
    server.route({
        method: "DELETE",
        path: server_1.builtApiRoute("/todos/{id}"),
        options: {
            handler: todoController.deleteTodo,
            tags: ["api", "ToDos"],
            description: "Update existing todo for user",
            validate: {
                params: TodoValidators.paramValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Todo updated successfully"
                        },
                        "401": {
                            description: "User not authenticated, please login"
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