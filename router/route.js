const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../db/conn');
const usersSchema = require('../model/userSchema');

router.post('/registers', async (req, res) => {



    const { name, email, phone, work, password, cpassword } = req.body;


    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(422).json({ error: "please fill the field properly" });
    }

    try {

        const newUser = await usersSchema.findOne({ email: email });
        if (newUser) {
            res.json({ error: "email is already exist" });
        }
        else if (password != cpassword) {
            res.status(422).json({ error: "password is not matching" });
        }
        else {
            const newRecord = new usersSchema({ name, email, phone, work, password, cpassword });
            await (newRecord).save();
            res.status(201).json({ message: "register successfully" });

        }

    } catch (error) {
        console.log(error);

    }

})
router.post('/login', async (req, res) => {


    try {
        let token;

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).json({ error: "please fill the field properly" });
        }
        const userExist = await usersSchema.findOne({ email: email });




        if (userExist) {

            const isMatch = await bcrypt.compare(password, userExist.password);

            token = await userExist.generateAuthToken();
            console.log(token)
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true

            })


            if (isMatch) {
                res.json({ message: "login Successfully" });
            }
            else {
                res.json({ error: "invalid data" });
            }
        }

        else {
            res.json({ message: "login successfully" });
        }


    } catch (error) {
        console.log(error);

    }


})



module.exports = router;