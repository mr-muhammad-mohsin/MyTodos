import { IDatabase } from "../../config/database";
import { IServerConfiguration } from "../../config/server";
import { IRequest } from "../../interfaces/request.interface";
import * as Hapi from '@hapi/hapi';
import { ITodo } from "./todo";
const Boom = require ('boom');


export default class ToDoController {
    private database: IDatabase;
    private config: IServerConfiguration;

    constructor (config: IServerConfiguration, db: IDatabase) {
        this.config = config;
        this.database = db;
    }
    
    /**
     * API route: GET: api/todos
     * Gets all todos for user
     * @param {IRequest} request
     * @param {ResponseToolkit} response
     * @returns {Promise<any>}
     */
    public async index (request: IRequest, response: Hapi.ResponseToolkit) {
        // query parameter completed == true then only return completed one
        try {
            const query:any = JSON.parse(JSON.stringify(request.query)); 
            console.log(query);
            if (query.hasOwnProperty('completed')) {
                return await this.database.todo.find( { completed: query.completed } );
            }

            return await this.database.todo.find();
        } catch (err) {
            return Boom.badImplementation(err);
        }
    } 
   
    /**
     * API route: POST: api/todos
     * Create a todo for user
     * @param {IRequest} request
     * @param {ResponseToolkit} response
     * @returns {Promise<any>}
     */
    public async createTodo (request: IRequest, response: Hapi.ResponseToolkit) {
        try {
            const payload:any = request.payload;
            payload.createdBy = 'Mohsin';
            
            const created: ITodo = await this.database.todo.create(payload);
            return created;
        } catch (err) {
            return Boom.badImplementation(err);
        }
    } 
   
    /**
     * API route: GET: api/todos/{id}
     * Gets a todo by id for user
     * @param {IRequest} request
     * @param {ResponseToolkit} response
     * @returns {Promise<any>}
     */
    public async getTodo (request: IRequest, response: Hapi.ResponseToolkit) {
        const found: ITodo = await this.database.todo.findById(request.params.id);
        return found;
    } 
    
    /**
     * API route: PUT: api/todos/{id}
     * Update todo by id for user
     * @param {IRequest} request
     * @param {ResponseToolkit} response
     * @returns {Promise<any>}
     */
    public async updateTodo (request: IRequest, response: Hapi.ResponseToolkit) {
        try {
            const payload: any = request.payload;

            if (payload.hasOwnProperty("completed") && payload.completed === true) {
                payload.completedAt = new Date().toISOString();
            }

            const updated: ITodo  = await this.database.todo.findByIdAndUpdate(
                request.params.id, 
                { $set: payload }, 
                { new: true } );
         
            return updated;
        } catch (err) {
            return Boom.badImplementation(err);
        }
    } 

    /**
     * API route: DELETE: api/todos/{id}
     * Delete todo by id for user
     * @param {IRequest} request
     * @param {ResponseToolkit} response
     * @returns {Promise<any>}
     */
    public async deleteTodo (request: IRequest, response: Hapi.ResponseToolkit) {
        try {
            return await this.database.todo.findByIdAndDelete(request.params.id);
        } catch (err) {
            return Boom.notImplemented(err);
        }
    } 
    
}