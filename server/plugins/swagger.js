"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
const Pack = require('../../package.json');
const swaggerOptions = {
    info: {
        title: "My Todo's Application",
        description: "Self learning Node JS and Hapi",
        version: Pack.version,
        contact: {
            name: 'Muhammad Mohsin',
            email: 'mr.muhammad.mohsin@gmail.com',
            url: 'https://github.com/mr-muhammad-mohsin/MyTodos'
        },
        license: {
            name: 'Private',
            url: 'https://github.com/mr-muhammad-mohsin'
        }
    },
    grouping: 'tags',
    tags: [
        { name: 'API', description: 'Main API Information Routes' },
        { name: 'Users', description: 'User authentication and information' },
        { name: 'ToDos', description: 'ToDos Regulated end points' },
    ],
    swaggerUI: true,
    documentationPage: true,
    documentationPath: "/api/documentation",
    responses: {
        200: { description: 'Success! response returned' },
        400: { description: 'Bad request.' },
        401: { description: 'Unauthorised! Please login' },
        403: { description: 'Forbidden! Operation not allowed' },
        404: { description: 'Not Found! requested resource not found' },
        500: { description: 'Error! Server error, operation failed.' }
    }
};
const register = (server) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        server.register([
            require('@hapi/inert'),
            require('@hapi/vision'),
            {
                plugin: require('hapi-swagger'),
                options: swaggerOptions
            }
        ]);
    }
    catch (error) {
        console.log(` X Error registering swagger plugin`);
        console.error(chalk.red(`${error}`));
    }
});
exports.default = () => {
    return {
        register,
        info: () => {
            return { name: 'Swagger Documentation', version: '1.0.0' };
        }
    };
};
//# sourceMappingURL=swagger.js.map