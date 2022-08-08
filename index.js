const mongoose = require("mongoose");
const express = require("express");
const user = require("./routes/user/router/user.router");
const auth = require("./routes/auth/router/auth.router");
const collection = require("./routes/collection/router/collection.router");
const group = require("./routes/group/router/group.router");
const item = require("./routes/items/router/item.router");
const role = require("./routes/roles/router/role.router");
const permission = require("./routes/permission/routes/permission.router");
const app = express();
const { errors: celebrateErrors } = require("celebrate");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();

mongoose
  .connect("mongodb://localhost/kashier", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB....");
  });

app.use(express.json());
app.use("/api/users", user);
app.use("/api/login", auth);
app.use("/api/collection", collection);
app.use("/api/group", group);
app.use("/api/item", item);
app.use("/api/role", role);
app.use("/api/permission", permission);

app.use(celebrateErrors());
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
