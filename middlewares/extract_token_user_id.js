const { verifyToken } = require("../authentication/jwt-token");

async function extract_token_user_id(req, res, next) {
  let auth_cookie = req.cookies["jwt"];
  console.log("Token: " + auth_cookie);

  if (!auth_cookie || auth_cookie == undefined) {
    req.user_id = "no_email";
    // next();
  } else {
    // const token = auth_cookie.split("Bearer ")[1];
    const token = auth_cookie;
    // console.log(token);

    // Add token for next step (to check if token is blacklisted)-
    req.token = token;

    const token_data = await verifyToken(token);
    // console.log(token_data);

    if (token_data == "err_while_verifying_jwt") {
      req.user_email = "no_email";
    }
    else{

      const user_email = token_data.user_email;
      const full_name = token_data.full_name;
      req.user_email = user_email;
      req.user_name = full_name;
      console.log(token_data)
    };


    // next();
  };
  next();

};

module.exports = { extract_token_user_id };