import * as Hapi from '@hapi/hapi';
const chalk = require('chalk');

import { IPlugin } from '../interfaces/plugin.interface';
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
        200: { description: 'Success! response returned'},
        400: { description: 'Bad request.'},
        401: { description: 'Unauthorised! Please login'},
        403: { description: 'Forbidden! Operation not allowed'},
        404: { description: 'Not Found! requested resource not found'},
        500: { description: 'Error! Server error, operation failed.'}
    }
};

const register = async(server: Hapi.Server): Promise<void> => {
    try {
        server.register([
            require('@hapi/inert'),
            require('@hapi/vision'),
            {
                plugin: require('hapi-swagger'),
                options: swaggerOptions
            }
        ]);
    } catch (error) {
        console.log(` X Error registering swagger plugin`);
        console.error(chalk.red(`${error}`));
    }
};

export default(): IPlugin => {
    return {
        register,
        info: () => {
            return { name: 'Swagger Documentation', version: '1.0.0' };
        }
    };
};
