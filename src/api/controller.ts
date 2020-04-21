import { IDatabase } from "../config/database";
import { IServerConfiguration } from "../config/server";
import { IRequest } from "../interfaces/request.interface";
import * as Hapi from '@hapi/hapi';

export default class APIController {
    private database: IDatabase;
    private config: IServerConfiguration;

    constructor (config: IServerConfiguration, db: IDatabase) {
        this.config = config;
        this.database = db;
    }

    public async index (request: IRequest, response: Hapi.ResponseToolkit) {
        return {
            message: "This is our API server"
        }
    } 
    
}