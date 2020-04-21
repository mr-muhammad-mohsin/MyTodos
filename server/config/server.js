"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config-yml");
function getServerConfig() {
    const env = process.env.NODE_ENV || 'dev';
    const serverConfig = config.server;
    console.log(serverConfig);
    return {
        host: serverConfig.string,
        port: serverConfig.port,
        routePrefix: '/',
        plugins: ['good', 'cors', 'inert', 'swagger']
    };
}
exports.getServerConfig = getServerConfig;
function builtApiRoute(uri) {
    if (uri.indexOf('/') !== 0) {
        uri = '/' + uri;
    }
    return '/api' + uri;
}
exports.builtApiRoute = builtApiRoute;
//# sourceMappingURL=server.js.map