const Users = require('./UserModel');
const { verify } = require('./helper');

const verifyToken = async (req, res, next) => {
    let token;
    const authorization = req.headers.authorization;

    if (authorization) {
        token = authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(400).json({
            message: 'Authorization required',
            status: 400,
            success: false,
        })
    }
    try {
        const { _id } = verify(token, process.env.JWT_SECRET);
        const user = await Users.findOne({ _id });

        if (!user) {
            return res.status(400).json({
                message: 'Authorization required',
                status: 400,
                success: false,
            })
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(400).json({
            message: 'Authorization required',
            status: 400,
            success: false,
        })
    }
}

const AllowAccess = (filter) => async (req, res, next) => {
    const user = req.user;

    try {
        const users = await Users.find(filter).lean();
        const allowedUsernames = users.map(user => user.username);

        if (!allowedUsernames.includes(user.username)) {
            return res.status(403).json({
                message: 'Access denied',
                status: 403,
                success: false,
            })
        }

        return next();
    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong',
            status: 500,
            success: false,
        })
    }
}

module.exports = {
    verifyToken,
    AllowAccess,
}
