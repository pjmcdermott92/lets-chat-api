const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last Name is required']
    },
    display_name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: [true, 'Email address is already registered'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Valid Email Address required'
        ]
    },
    avatar: String,
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    role: String,
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWT = function() {
    return jwt.sign({ user: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES
    });
};

module.exports = mongoose.model('user', userSchema);
