"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
exports.paramValidator = Joi.object().keys({
    id: Joi.string().required()
});
exports.queryValidator = Joi.object().keys({
    completed: Joi.boolean()
});
exports.todoCreateModel = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow(null)
}).label('CreateTodoModel');
exports.todoUpdateModel = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string().allow(null),
    completed: Joi.boolean().allow(true)
}).label('UpdateTodoModel');
//# sourceMappingURL=validators.js.map