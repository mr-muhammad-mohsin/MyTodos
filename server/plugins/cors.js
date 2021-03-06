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
const chalk = require("chalk");
exports.default = () => {
    return {
        register: (server) => __awaiter(void 0, void 0, void 0, function* () {
            const options = {
                origins: ['*'],
                allowCredentials: 'true',
                exposeHeaders: ['content-type', 'content-length'],
                maxAge: 60,
                methods: ['GET, POST, PUT, DELETE, OPTIONS'],
                headers: ['Accept', 'Content-Type', 'Authorization']
            };
            return new Promise((resolve) => {
                try {
                    server.register({ plugin: require('hapi-cors'), options: options });
                    resolve();
                }
                catch (err) {
                    console.log(`Error registering Hapi CORS plugin.`);
                    console.error(chalk.red(`${err}`));
                }
            });
        }),
        info: () => {
            return { name: "Hapi CORS Plugin", version: '1.0.0' };
        }
    };
};
//# sourceMappingURL=cors.js.map