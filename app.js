// Configure enviroment variables-
require("dotenv").config();

// Connect to database-
require("./config/database").connect();

// Modules-
const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const methodOverride = require("method-override");

const {extract_token_user_id} = require("./middlewares/extract_token_user_id");

const app = express();

// Middleware-

// Handle post requests-
app.use(express.json());

// Handle put requests-
app.use(methodOverride("_method"));

// cookieParser-
app.use(cookieParser());
//
// EXPRESS SPECIFIC STUFF
// app.use("/static", express.static("static")) // For serving static files
// app.use("/public", express.static("public")) // For serving static files
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }))

// Extract token and user_id-
app.use(extract_token_user_id);


// Compress all responses-
// Using it giving error on image/video loading-
app.use(compression({
  level: 9,
  threshold: 0,
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res)
  }
}));

// GET ROUTES-
require("./routes/get_routes/pages")(app);

// POST ROUTES-
require("./routes/post_routes/post_api/create_and_login_api")(app);

// Export app-
module.exports = app;