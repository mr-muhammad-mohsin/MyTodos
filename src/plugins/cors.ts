import * as Hapi from "@hapi/hapi";
import { IPlugin } from "../interfaces/plugin.interface";
import { resolve } from "dns";

const chalk = require ("chalk");

export default (): IPlugin => {
    return {
        register: async (server: Hapi.Server): Promise<void> => {
            const options = {
                origins: ['*'],
                allowCredentials: 'true',
                exposeHeaders: ['content-type', 'content-length'],
                maxAge: 60,
                methods: ['GET, POST, PUT, DELETE, OPTIONS'],
                headers: ['Accept', 'Content-Type', 'Authorization']
            };

            return new Promise<void> ((resolve) => {
                try {
                    server.register({ plugin: require('hapi-cors'), options: options });
                    resolve();

                } catch (err) {
                    console.log(`Error registering Hapi CORS plugin.`);
                    console.error(chalk.red(`${err}`));
                }
            });

        }, 
        info: () => {
            return { name: "Hapi CORS Plugin", version: '1.0.0' };
        }
    };
}