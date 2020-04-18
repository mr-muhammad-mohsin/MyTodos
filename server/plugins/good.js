"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
exports.default = () => {
    return {
        register: (server) => __awaiter(this, void 0, void 0, function* () {
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
            return new Promise((resolve) => {
                try {
                    server.register({ plugin: require('@hapi/good'), options: options });
                    resolve();
                }
                catch (err) {
                    console.log(`Error registering good plugin.`);
                    console.error(chalk.red(`${err}`));
                }
            });
        }),
        info: () => {
            return { name: "Good Login Plugin", version: '1.0.0' };
        }
    };
};
//# sourceMappingURL=good.js.map