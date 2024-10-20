const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const { generateJWT } = require('../helpers/jwt');

const signUp = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'User with this email address already exists',
            });
        };

        user = new User(req.body);

        // User password encryption
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    
        await user.save();

        // Generate JWT

        const token = await generateJWT(user.id, user.name);
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'something went wrong',
        });
    };

};

const userLogin = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User with this email address does not exist',
            });
        };

        // Confirm password match

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password',
            });
        };

        // Generate JWT

        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'something went wrong',
        });
    };

};

const renewToken = async(req, res = response) => {

    const { uid, name } = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
};

module.exports = {
    signUp,
    userLogin,
    renewToken,
};