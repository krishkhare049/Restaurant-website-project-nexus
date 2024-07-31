// Export create and login post route-

const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { account } = require("../../../models/accounts_model");
// const {
//   encrypt,
//   decrypt,
// } = require("../../../authentication/id-encrypt-decrypt");
const { remove_whitespaces } = require("../../../utils/utils");

// const {
//   createToken,
//   verifyToken,
// } = require("../../../authentication/jwt-token");

module.exports = function (app) {
  app.post("/create", async (req, res) => {
    try {
      const user_email = req.body.user_email;
      const user_email_check = await account.findOne({
        user_email: user_email,
      });
      // console.log(`Email is ${user_email_check.user_email} ...`);

      if (!user_email_check) {
        // let myData = new account(req.body);
        const data = new account({
          full_name: req.body.full_name,
          user_email: req.body.user_email,
          user_password: req.body.user_password,

        });

        // const token = await data.generateAuthToken();
        // console.log(`Token is : ${token}`);

        // Setting cookie-
        // res.cookie("ki_jwt_cookie", token, {
        //   httpOnly: true // To make sure that user will not be able to change, remove or client-side scripting on cookie.
        // });

        // await data
        //   .save()
        //   .then(() => {
        //     // res.send("This item has been saved to the database");
        //     // res.redirect("/loginaftercreate");
        //     let new_user = account.findOne({ user_email: req.body.user_email });

        //     res.json({token});

        //     // res.send(encrypt(new_user.id));
        //   })
        //   .catch(() => {
        //     res.status(400).send("Item was not saved to the database");
        //   });

        let new_doc = await data.save();
        const token = await new_doc.generateAuthToken();
        res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 36000000000 })
        // console.log(`Token is : ${token}`);
        res.redirect('/');

      } else {
        // console.log("Account already exists.");
        res.send("Account already exists. Please login.");
      }
    } catch (error) {
      console.log(error);
    }
  });

  // Checking login-
  app.post("/login", async (req, res) => {
    try {
      // console.log(req.body);
      const login_email = req.body.login_email;

      // Remove whitespaces-
      const login_password = remove_whitespaces(req.body.login_password);

      const user = await account.findOne(
        { user_email: login_email },
        { user_email: 1, full_name: 1, user_password: 1, tokens: 1 }
      );
      // console.log(`Email is ${user.user_email} and password is ${user.user_password}...`);
      // res.send(user); //to visit its database page.

      if (user) {
        // console.log(user.user_password);
        const isPasswordMatch = await bcrypt.compare(
          login_password,
          user.user_password
        );
        // console.log(user);
        // console.log(isPasswordMatch);

        // Generating token on login-
        // const token = await user.generateAuthToken();
        // console.log(`Token is : ${token}`);

        if (isPasswordMatch) {
          // console.log("Match");
          // let encryptedid = encrypt(user.id);
          // console.log(encryptedid);
          // res.send(encryptedid);

          // Generating token on login-
          const token = await user.generateAuthToken();
          console.log(`Token is : ${token}`);
          // res.json({ token });
          res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 36000000000 })
          // console.log(`Token is : ${token}`);
          res.redirect('/');
        } else {
          res.send("Not found");
        }
      } else {
        res.send("Not found");
      }
    } catch (error) {
      console.log(error);
      res.send("Not found");
    }
  });

};