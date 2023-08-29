const express = require("express");
const router = express.Router();

const User = require('../model/user');
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
    if (await User.getUserByUsername(req.body.username)) {
        return res.status(400).json({ msg: "Name taken try another" });
    }
    try {
        let user = new User({
            username: req.body.username,
            password: req.body.password
        });
        User.addUser(user);
        res.status(200).json({ msg: "User registered" });
    } catch (err) {
        res.status(400).json({ msg: "Failed to register user" });
    }
});

router.post("/authenticate", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        let user;
        try {
            user = await User.getUserByUsername(username);
        } catch (err) {
            return res.status(400).json({ success: false, msg: "Problem in retrieving by username" });
        }
        if (!user) {
            return res.status(400).json({ success: false, msg: "Wrong username" });
        }
        let isMatch = await User.comparePassword(password, user.password);
        if (isMatch === true) {
            const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.SECRET, {
                expiresIn: 10000
            });
            res.status(200).json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    id: user._id,
                    username: user.username
                }
            });
        } else {
            return res.status(404).json({ success: false, msg: "Wrong password" });
        }
    } catch (err) {
        res.status(404).json({ msg: err });
    }
});

module.exports = router;