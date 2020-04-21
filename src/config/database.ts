const config = require("config-yml");
import Mongoose from "mongoose";
import { ITodo, Todo } from "../api/todo/todo";

export interface IDatabase {
    todo: Mongoose.Model<ITodo>;
}

export function init(): IDatabase {
    (<any> Mongoose).Promise = Promise;

    const env = process.env.NODE_ENV || 'dev';
    const dbConfig: any = config.db;

//    const connStr: string = `mongodb://${dbConfig.dbuser}:${dbConfig.dbpass}@${dbConfig.uri}/${dbConfig.db}`;
    
    const connStr: string = `mongodb://localhost:27017/${dbConfig.db}`;

    Mongoose.set('useNewUrlParser', true);
    Mongoose.set('useFindAndModify', false);
    Mongoose.set('useCreateIndex', true);
    Mongoose.set('useUnifiedTopology', true);

    Mongoose.connect(connStr);
    Mongoose.set('useCreateIndex', true);

    Mongoose.connection
            .on('error', () => {
                console.log(`Unable to connect to database: ${dbConfig.db}`);
            })
            .once('open', () => {
                console.log(`Successfully connected to the database: ${dbConfig.db.toUpperCase()}`);
            });

    return {
        todo: Todo
    };
}