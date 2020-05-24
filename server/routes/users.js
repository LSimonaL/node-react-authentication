const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/User");
const {JWT_SECRET} = require("../config/creds");


router.post("/users/login", async (req, res) => {
    const { username, password } = req.body;    
    if (username && password) {
        const users = await User.query().select().where({ username: username }).limit(1);
        const user = users[0];

        if (!user) {
            return res.status(404).send({ response: "Wrong username" });
        }

        bcrypt.compare(password, user.password, (error, isSame) => {
            if (error) {
                return res.status(500).send({ });
            }
            if (!isSame) {
                return res.status(404).send({ });
            } else {
                const payload = { user: { username: username } };
                const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: 360000 });
                return res.status(200).send({ username: user.username, token: token });
            }
        });

    } else {
        return res.status(404).send({ response: "Missing username or password" });
    }
});


router.post("/users/register", (req, res) => {
    const { username, password, repeatPassword } = req.body;
    
    if (username && password && repeatPassword && password === repeatPassword) {
        if (password.length < 3) {
            return res.status(400).send({ response: "Password does not fulfill the requirements" });
        } else {
            bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
                if (error) {
                    return res.status(500).send({ });
                }
                try {
                    
                    const existingUser = await User.query().select().where({ username: username }).limit(1);
                    
                    if (existingUser[0]) {
                        return res.status(404).send({ response: "User already exists" });
                    } else {
                        const newUser = await User.query().insert({ 
                            username,
                            password: hashedPassword
                        });                       
                        const payload = { user: { username: username } };
                        const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: 360000 });
                        return res.status(200).send({ username: newUser.username, token: token });
                            }

                } catch (error) {
                    return res.status(500).send({ response: "Something went wrong with the database" });
                }

            });
        }
    } else if (password !== repeatPassword) {
        return res.status(404).send({ response: "Password and repeat password are not the same" });
    } else {
        return res.status(404).send({ response: "Missing fields" });
    }
});

// router.put('/users/resetPassword', async (req, res) => {
//     const existingUser = await User.query().select().where({ username: 'lala' }).limit(1);
//     const result = await User.query()
//         .patch({ password: req.body.password })
//         .where('username', 'lala');

// res.send({response: result})});

module.exports = router;
