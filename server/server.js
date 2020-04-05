// call express and body-parser from package.json to use
const express = require("express");
const bodyParser = require("body-parser");
// import router
const listRouter = require("./routes/list.router");

// set express as app and set port as 5000
const app = express();
const PORT = process.env.PORT || 5000;

// let frontend to connect with the server
app.use(bodyParser.urlencoded({ extended: true }));
// to use json in postman
app.use(bodyParser.json());
// route for static files
app.use(express.static("server/public"));

// listRouter will be used for '/list' route
app.use("/list", listRouter);

// listen to port we set as 5000
app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});
