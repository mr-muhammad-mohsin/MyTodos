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
const Boom = require('boom');
class ToDoController {
    constructor(config, db) {
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
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // query parameter completed == true then only return completed one
            try {
                const query = JSON.parse(JSON.stringify(request.query));
                console.log(query);
                if (query.hasOwnProperty('completed')) {
                    return yield this.database.todo.find({ completed: query.completed });
                }
                return yield this.database.todo.find();
            }
            catch (err) {
                return Boom.badImplementation(err);
            }
        });
    }
    /**
     * API route: POST: api/todos
     * Create a todo for user
     * @param {IRequest} request
     * @param {ResponseToolkit} response
     * @returns {Promise<any>}
     */
    createTodo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = request.payload;
                payload.createdBy = 'Mohsin';
                const created = yield this.database.todo.create(payload);
                return created;
            }
            catch (err) {
                return Boom.badImplementation(err);
            }
        });
    }
    /**
     * API route: GET: api/todos/{id}
     * Gets a todo by id for user
     * @param {IRequest} request
     * @param {ResponseToolkit} response
     * @returns {Promise<any>}
     */
    getTodo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.database.todo.findById(request.params.id);
            return found;
        });
    }
    /**
     * API route: PUT: api/todos/{id}
     * Update todo by id for user
     * @param {IRequest} request
     * @param {ResponseToolkit} response
     * @returns {Promise<any>}
     */
    updateTodo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = request.payload;
                if (payload.hasOwnProperty("completed") && payload.completed === true) {
                    payload.completedAt = new Date().toISOString();
                }
                const updated = yield this.database.todo.findByIdAndUpdate(request.params.id, { $set: payload }, { new: true });
                return updated;
            }
            catch (err) {
                return Boom.badImplementation(err);
            }
        });
    }
    /**
     * API route: DELETE: api/todos/{id}
     * Delete todo by id for user
     * @param {IRequest} request
     * @param {ResponseToolkit} response
     * @returns {Promise<any>}
     */
    deleteTodo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.database.todo.findByIdAndDelete(request.params.id);
            }
            catch (err) {
                return Boom.notImplemented(err);
            }
        });
    }
}
exports.default = ToDoController;
//# sourceMappingURL=controller.js.map