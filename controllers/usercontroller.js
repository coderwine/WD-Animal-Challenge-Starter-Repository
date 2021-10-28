const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//! CREATE USER
router.post('/register', async(req, res) => {
    const { username, password } = req.body;

    // console.log(process.env.JWT_SECRET)
    try {

        const newUser = await User.create({
            username,
            // password
            password: bcrypt.hashSync(password, 13),
        })

        // GOLD JWT / BCRYPT
        const token = jwt.sign(
            {id: newUser.id, },
            process.env.JWT_SECRET,
            {expiresIn: 60 * 60 * 2}
        )

        res.status(200).json({
            msg: `User Created!`,
            user: newUser,
            token
        }) // will need to add dotenv to app.js

    } catch (error) {
        res.status(500).json({
            error: `Failed: ${error}`, 
        })
    }
})

router.post('/login', async(req,res) => {
    let { username, password } = req.body;

    try {
        
        let login = await User.findOne({
            where: {
                username
            }
        })

        if (login) {
            // for bcrypt
            let compare = await bcrypt.compare(password, login.password);

            // if(password === login.password) {
            if(compare) {
                //added for Gold JWT / Bcrypt
                let token = jwt.sign(
                    {id: login.id},
                    process.env.JWT_SECRET,
                    {expiresIn: 60 * 60 * 2}
                )

                // base build
                res.status(200).json({
                    user: login,
                    msg: 'Successfully logged in!',
                })
            } else {
                res.status(401).json({
                    msg: `Incorrect email or password.`
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            msg: `Error loggin in.`,
            error: error
        })
    }

})


module.exports = router;