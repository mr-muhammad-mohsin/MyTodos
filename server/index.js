"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const Server = __importStar(require("./server"));
const Database = __importStar(require("./config/database"));
const server_1 = require("./config/server");
console.log('\x1Bc');
process.on('uncaughtException', (error) => {
    console.error(chalk.red.bgWhite(`uncaughtException ${error.message}`));
});
// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
    console.error(chalk.white.bgRed(`\nunhandledRejection occured!`));
    console.error(chalk.white.bgRed(reason));
});
const init = (config, db) => __awaiter(this, void 0, void 0, function* () {
    try {
        const server = yield Server.init(config, db);
        yield server.start();
        console.log(`\n`);
        console.log(chalk.green(' Server is now running @:', server.info.uri));
    }
    catch (err) {
        console.error(chalk.red(err));
        throw err;
    }
});
const database = Database.init();
const serverConfig = server_1.getServerConfig();
init(serverConfig, database);
//# sourceMappingURL=index.js.map