import * as Joi from "joi";

export const paramValidator:any = Joi.object().keys({
    id: Joi.string().required()
})

export const queryValidator:any = Joi.object().keys({
    completed: Joi.boolean()
})

export const todoCreateModel:any = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow(null)
}).label('CreateTodoModel');

export const todoUpdateModel:any = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string().allow(null),
    completed: Joi.boolean().allow(true)
}).label('UpdateTodoModel');
