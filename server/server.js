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
const config = require("config-yml");
const chalk = require("chalk");
const Boom = require('boom');
const Hapi = __importStar(require("@hapi/hapi"));
function init(serverConfig, database) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('\x1Bc');
            console.log(chalk.yellow(` Initializing API Server with Environment ${process.env.NODE_ENV || 'dev'} ...\n`));
            const env = process.env.NODE_ENV || 'dev';
            const serverConfig = config.server[env];
            const serverOpts = {
                debug: { request: ['error'] },
                host: config.host,
                port: config.port,
                router: { isCaseSensitive: false, stripTrailingSlash: true },
                routes: {
                    cors: {
                        origin: ['*']
                    },
                    payload: {
                        maxBytes: 5000000
                    },
                    validate: {
                        failAction(request, h, err) {
                            if (!['prod', 'production', 'staging'].includes(process.env.NODE_ENV)) {
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
            const initializePlugins = () => __awaiter(this, void 0, void 0, function* () {
                const options = { serverConfig: serverConfig, database: database };
                const plugins = serverConfig.plugins;
                for (let i = 0; i < plugins.length; i++) {
                    const target = (require('./plugins/' + plugins[i])).default();
                    console.log(`Registering plugin ${target.info().name} - ${target.info().version}`);
                    yield target.register(server, options);
                }
                console.log(chalk.green("All plugins registered successfully"));
                // TODO: implement API route plugin registration 
            });
            yield initializePlugins();
            return server;
        }
        catch (err) {
            console.log(chalk.red('Error starting server!'));
            console.log(chalk.red(err));
        }
    });
}
exports.init = init;
//# sourceMappingURL=server.js.map