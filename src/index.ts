const chalk = require ("chalk");

import * as Server from './server';
import * as Database from './config/database';
import { getServerConfig } from './config/server';


console.log('\x1Bc');

process.on('uncaughtException', (error: Error) => {
    console.error(chalk.red.bgWhite(`uncaughtException ${error.message}`));
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: any) => {
    console.error(chalk.white.bgRed(`\nunhandledRejection occured!`));
    console.error(chalk.white.bgRed(reason));
});

const init = async (config, db) => {
    try {
        const server = await Server.init(config, db);
        await server.start();

        console.log(`\n`);
        console.log(chalk.green(' Server is now running @:', server.info.uri));

    } catch (err) {
        console.error (chalk.red(err));
        throw err;
    } 
};

const database = Database.init();
const serverConfig = getServerConfig();

init (serverConfig, database);
