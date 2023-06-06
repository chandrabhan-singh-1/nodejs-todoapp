// File to Learn APIs & Params;

import express from "express";
import mongoose, { mongo } from "mongoose";

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "BackendAPIs",
  })
  .then(() => {
    console.log("Database Connection Successful!");
  })
  .catch((err) => {
    console.log(err);
  });

const apiSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserAPI = new mongoose.model("UserAPI", apiSchema);

const app = express();

// Using Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/all", async (req, res) => {
  const users = await UserAPI.find({});
  // console.log(req.query);

  const keyword = req.query.keyword;
  console.log(keyword);

  res.json({
    success: true,
    // user: users,
    users,
  });
});

app.post("/users/new", async (req, res) => {
  const { name, email, password } = req.body;

  await UserAPI.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("tempi", "lol").json({
    success: true,
    message: "Registered Successfully!",
  });
});

// if we write this API below the dynamic route's API, then It will give an error, bcoz route contradiction. There special will be considered as an id, Therefore, put the dynamic routes at the end of the code files.
app.get("/userid/special", (req, res) => {
  res.json({
    success: true,
    message: "Just Joking!",
  });
});

// always add the Dynamic route APIs in the End of code files
app.get("/userid/:id", async (req, res) => {
  // in "/userid/:id" dynamic URL id is a variable, this variable name can be anything
  // const { id } = req.body;  // Use this method when you send id in body

  // const { id } = req.query; //Use this method when you send id in Param/URL

  const { id } = req.params; //Use this method when you give dynamic routing/URL

  const user = await UserAPI.findById(id);
  console.log(req.params);
  res.json({
    success: true,
    user,
  });
});

app.listen(4000, () => {
  console.log("Server is working...");
});
