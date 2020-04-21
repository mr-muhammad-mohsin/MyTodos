"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config-yml");
const mongoose_1 = __importDefault(require("mongoose"));
const todo_1 = require("../api/todo/todo");
function init() {
    mongoose_1.default.Promise = Promise;
    const env = process.env.NODE_ENV || 'dev';
    const dbConfig = config.db;
    //    const connStr: string = `mongodb://${dbConfig.dbuser}:${dbConfig.dbpass}@${dbConfig.uri}/${dbConfig.db}`;
    const connStr = `mongodb://localhost:27017/${dbConfig.db}`;
    mongoose_1.default.set('useNewUrlParser', true);
    mongoose_1.default.set('useFindAndModify', false);
    mongoose_1.default.set('useCreateIndex', true);
    mongoose_1.default.set('useUnifiedTopology', true);
    mongoose_1.default.connect(connStr);
    mongoose_1.default.set('useCreateIndex', true);
    mongoose_1.default.connection
        .on('error', () => {
        console.log(`Unable to connect to database: ${dbConfig.db}`);
    })
        .once('open', () => {
        console.log(`Successfully connected to the database: ${dbConfig.db.toUpperCase()}`);
    });
    return {
        todo: todo_1.Todo
    };
}
exports.init = init;
//# sourceMappingURL=database.js.map