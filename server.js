require("dotenv").config({ path: `./src/environment/demo.env` });
require("./src/config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./src/routes");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-header"
  );
  res.header("Access-Control-Expose-Headers", "X-Custom-header");
  res.header("Access-Control-Expose-Headers", "authorization");
  next();
});

app.use(cors());
app.use("/api/v1/admin", routes.ADMIN);
app.use("/api/v1/group", routes.GROUP);
app.use("/api/v1/server", routes.SERVER);


app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
