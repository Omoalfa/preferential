const Joi = require('joi');
const Users = require('./UserModel');

const createValidator = async (req, res, next) => {
    try {
        const userModel = Joi.object({
            email: Joi.string().email({ tlds: { allow: false }}).required(),
            username: Joi.string().required(),
            role: Joi.string().valid('admin', 'staff', 'member').required(),
            password: Joi.string().required(),
            name: Joi.string().required()
        })

        const { error } = userModel.validate(req.body)
        if (error) return res.status(401).json({
            message: 'Invalid input',
            status: 401,
            success: false
        })  

        const user = await Users.findOne({ email: req.body.email });
        if (user) return res.status(401).json({
            message: 'email exist already',
            status: 401,
            success: false
        })  

        const username = await Users.findOne({ username: req.body.username });
        if (username) return res.status(401).json({
            message: 'username exist already',
            status: 401,
            success: false
        }) 

        return next()
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'something went wrong',
            success: false
        })
    }
}

const loginValidator = async (req, res, next) => {
    try {
        const loginModel = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        })

        const { error } = loginModel.validate(req.body);
        if (error) return res.status(401).json({
            message: 'Invalid input',
            status: 401,
            success: false
        })

        const user = await Users.findOne({ username: req.body.username });
        if (!user) return res.status(401).json({
            message: 'user not found',
            status: 401,
            success: false,
        })

        return next()
    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong',
            status: 500,
            success: false
        })
    }
}

module.exports = {
    createValidator,
    loginValidator
}
