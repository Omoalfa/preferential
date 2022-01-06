const { generateToken } = require('./helper');
const Users = require('./UserModel');

const createUser = async (req, res) => {
    const { name, username, email, password, role } = req.body;

    try {
        const user = new Users({ name, username, email, password, role });

        await user.save();

        return res.status(201).json({
            status: 201,
            message: 'User successfully created',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong',
            status: 500,
            success: false
        })
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: 'invalid credentials',
                status: 401,
                success: false
            })
        }
        
        const match = user.comparePassword(password);
    
        if (!match) {
            return res.status(401).json({
                message: 'invalid credentials',
                status: 401,
                success: false
            })
        }

        const token = generateToken(user._id, username);

        return res.status(200).json({
            message: 'user successfully logged in',
            data: { token },
            success: true,
            status: 200
        })

    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong',
            status: 500,
            success: false
        })
    }
}

const universalController = (req, res) => res.status(200).json({
    message: 'you are allowed in here',
    status: 200,
    success: true,
})

module.exports = {
    createUser,
    loginUser,
    universalController
}