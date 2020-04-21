import * as Hapi from '@hapi/hapi';
import { IServerConfiguration, builtApiRoute } from "../../config/server";
import { IDatabase } from "../../config/database";
import ToDoController from './controller';
import * as TodoValidators from './validators';
import Joi from 'joi';

function Routes(server: Hapi.Server, config: IServerConfiguration, db: IDatabase){
    const todoController = new ToDoController(config, db);
    server.bind(todoController);


    server.route({
        method: "GET",
        path: builtApiRoute("/todos"),
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
        path: builtApiRoute("/todos"),
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
        path: builtApiRoute("/todos/{id}"),
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
        path: builtApiRoute("/todos/{id}"),
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
        path: builtApiRoute("/todos/{id}"),
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

export function init(server: Hapi.Server, config: IServerConfiguration, database: IDatabase) {
    Routes(server, config, database);
}

