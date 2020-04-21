import mongoose, {Document, Schema} from "mongoose";

export interface ITodo extends Document {
    title: string;
    description: string;
    completed: boolean;
    completedAt: Date;
    createdBy: string;
}

const todoSchema: Schema = new Schema({
    title:            { type: String, required: true },
    description:      { type: String, required: true },
    completed:        { type: Boolean, default: false },
    completedAt:      { type: Date },
    createdBy:        { type: String, required: true }
}, {
    timestamps: true
});

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
