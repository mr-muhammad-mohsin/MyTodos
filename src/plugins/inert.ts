import * as Hapi from '@hapi/hapi';
const chalk = require('chalk');

import {IPlugin} from '../interfaces/plugin.interface';

export default(): IPlugin => {
    return {
        register: async (server: Hapi.Server): Promise<void> => {
            return new Promise((resolve) => {
                try {
                    server.register({ plugin: require('@hapi/inert') });
                    resolve();
                } catch (err) {
                    if(err) {
                        console.error('Error registering inert plugin.');
                        console.error(chalk.red(err));
                    }

                    server.route({
                        method: ['GET'],
                        path: '/{path*}',
                        options: {
                            handler: {
                                directory: {
                                    path: './server/public',
                                    index: true,
                                    redirectToSlash: true
                                }
                            }
                        }
                    });
                }
            });
        },
        info: () => {
            return { name: 'Inert Static Content', version: '1.0.0' };
        }
    };
};
