import  Joi from 'joi';

const querySchema = Joi.object({
    limit: Joi.number().integer().min(1).max(1280),
    page: Joi.number().integer().min(1),
    search: Joi.string().pattern(/^[a-zA-Z-]+$/).allow(''),
});

export default querySchema;