const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const { engine } = require("express-handlebars"); // Corrected import statement
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");
// passport config
require("./config/passport")(passport);
// load config
dotenv.config({ path: "./config/config.env" });
connectDB();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handlers
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
// session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// static folder
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/", require("./routes/index"));
app.listen();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running " + process.env.NODE_ENV));
