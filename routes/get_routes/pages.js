// Export pages get routes-

const path = require("path");
const jwt = require("jsonwebtoken")
module.exports = function (app) {

  app.get("/", (req, res) => {

    res.header("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "../../html/index.html"));
  });

  app.get("/log_sign", (req, res) => {
    res.header("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "../../html/log_sign.html"));
  });

  app.get("/auth", async(req, res) => {


    // console.log(req.user_email);
    // res.send(req.cookies)
    if(req.user_email != "no_email"){
      res.send({'name': req.user_name});
    }

  });

};