const config = require("config-yml");

export interface IServerConfiguration {
    host: string;
    port: number;
    routePrefix: string;
    plugins: Array<string>;   
}

export function getServerConfig (): IServerConfiguration {
    const env = process.env.NODE_ENV || 'dev';
    console.log(env , config.server);
    

    const serverConfig: any = config.server.dev;

    console.log(serverConfig);

    return {
        host: serverConfig.string,
        port: serverConfig.port,
        routePrefix: '/',
        plugins: ['good', 'cors']
    };
} 

export function builtApiRoute(uri: string): string {
    if(uri.indexOf('/') !== 0){
        uri = '/' + uri;
    }
    return '/api' + uri;
}
