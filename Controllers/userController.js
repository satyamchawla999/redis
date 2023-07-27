const fs = require("fs");
const path = require('path');
const parentDir = path.join(__dirname, '../Data/userData.json');

module.exports.userSignUp = async (req, res) => {

    const { password, confirmPassword, email } = req.body;
    try {
        if (password === confirmPassword) {

            fs.readFile(parentDir, "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const userData = data.length === 0 ? [] : JSON.parse(data);
                    const findUser = userData.findIndex((user) => user.email === email);
                    if (findUser === -1) {

                        userData.push(req.body);
                        fs.writeFile(parentDir, JSON.stringify(userData), (err) => {
                            if (err) console.log(err);
                            // req.session.user = req.body;
                            // console.log(req.session)
                        })

                        console.log("logged in")
                        return res.redirect("/signin")

                    } else {
                        console.log("user already exists")
                        return res.redirect("/signup")
                    }
                }
            })

        } else {
            console.log("password not match")
            return res.redirect("back")
        }


    } catch (err) {
        console.log(err);
    }
}

module.exports.userSignIn = async (req, res) => {
    const { password, email } = req.body;
    console.log("signin",req.body);
    try {

        fs.readFile(parentDir, "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const userData = data.length === 0 ? [] : JSON.parse(data);
                console.log(userData)
                const findUser = userData.findIndex((user) => (user.email === email && user.password === password));
                if (findUser !== -1) {
                    req.session.user = req.body;
                    console.log(req.session)
                    return res.redirect("/")
                } else {
                    console.log("wrong credentials")
                    return res.redirect("/signin")
                }
            }
        })

    } catch (err) {
        console.log(err);
    }
}