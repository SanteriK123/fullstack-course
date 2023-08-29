const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function (id) {
    User.findById(id, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            return docs;
        }
    });
};
module.exports.getUserByUsername = function (username) {
    const query = { username: username };
    return User.findOne(query);
};

module.exports.addUser = async function (newUser) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        await newUser.save();
    } catch (err) {
        throw err;
    }
};

module.exports.comparePassword = function (candidatePassword, hash) {
    try {
        return bcrypt.compare(candidatePassword, hash);
    } catch (err) {
        throw err;
    }
}