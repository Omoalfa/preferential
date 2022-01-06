const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'staff', 'member'],
        default: 'member',
        required: true
    }
});

UserModel.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    return next()
})

UserModel.method('comparePassword', function (password) {
    return bcrypt.compareSync(password, this.password)
});

module.exports = mongoose.model('User', UserModel);
