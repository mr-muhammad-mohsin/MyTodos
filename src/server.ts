const config = require("config-yml");
const chalk = require ("chalk");
const Boom = require('boom');

import * as Hapi from '@hapi/hapi';
import { IServerConfiguration } from './config/server';
import { IDatabase } from './config/database';
import { IPluginOptions, IPlugin } from './interfaces/plugin.interface';

import { initAPI } from './api';

export async function init (serverConfig: IServerConfiguration, database: IDatabase): Promise<Hapi.Server> {
    
    try {
        console.log('\x1Bc');
        console.log(chalk.yellow(` Initializing API Server with Environment ${process.env.NODE_ENV || 'dev' } ...\n`));

        const serverOpts = {
            debug: { request: ['error'] },
            host: 'localhost',
            port: serverConfig.port,
            router: { isCaseSensitive: false, stripTrailingSlash: true },
            routes: {
                cors: {
                    origin: ['*']
                },
                payload: {
                    maxBytes: 5000000
                },
                validate: {
                    failAction(request, h, err){
                        if(!['prod', 'production', 'staging'].includes(process.env.NODE_ENV)){
                            throw err;
                        }

                        console.error('Validation Error', err);
                        throw Boom.badRequest(`Invalid request payload input`);
                    }
                },
                timeout: { server: false, socket: false }
            }
        };

        const server = new Hapi.Server(serverOpts);

        server.events.on('response', function (request) {
            console.log(chalk.green(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path));
        });

        const initializePlugins = async () => {
            const options: IPluginOptions = { serverConfig: serverConfig, database: database };
            const plugins: string[] = serverConfig.plugins;

            for (let i=0; i < plugins.length; i++) {
                const target: IPlugin = (require('./plugins/'+plugins[i])).default(); 
                console.log(`Registering plugin ${ target.info().name } - ${ target.info().version }`);
                await target.register(server, options);
            }

            console.log (chalk.green("All plugins registered successfully"));
            
            initAPI(server, config, database);
        };

        await initializePlugins();
        return server;

    } catch (err) {
        console.log(chalk.red('Error starting server!'));
        console.log(chalk.red(err));
    }
}