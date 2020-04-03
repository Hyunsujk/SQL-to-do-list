const express = require("express");
const bodyParser = require("body-parser");
const listRouter = require("./routes/list.router");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

app.use("/list", listRouter);

app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});
