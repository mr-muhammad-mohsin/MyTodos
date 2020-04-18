import * as Hapi from "@hapi/hapi";
import { IPlugin } from "../interfaces/plugin.interface";
import { resolve } from "dns";

const chalk = require ("chalk");

export default (): IPlugin => {
    return {
        register: async (server: Hapi.Server): Promise<void> => {
            const options = {
                ops: {
                    interval: 1000
                },
                reporters: {
                    myConsoleReporter: [
                        {
                            module: '@hapi/good-squeeze',
                            name: 'Squeeze',
                            args: [{ log: '*', response: '*', ops: '*' }]
                        },
                        {
                            module: '@hapi/good-console'
                        },
                        'stdout'
                    ]
                }
            };

            return new Promise<void> ((resolve) => {
                try {
                    server.register({ plugin: require('@hapi/good'), options: options });
                    resolve();

                } catch (err) {
                    console.log(`Error registering good plugin.`);
                    console.error(chalk.red(`${err}`));
                }
            });

        }, 
        info: () => {
            return { name: "Good Login Plugin", version: '1.0.0' };
        }
    };
}