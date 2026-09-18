const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db.js");
const { Authenticate } = require("./auth.js");
require("dotenv").config({ path: ".env.local" });

const app = express();
app.use(express.json());
mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_PWD}@cluster0.u5tmmqw.mongodb.net/todo-app`,
);

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await UserModel.create({
      name: name,
      email: email,
      password: password,
    });

    res.status(200).send({ message: "You're signed up" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error occurred", error: error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET_KEY,
    );
    res.json({ token: token });
  } else
    res.status(403).json({
      message: "incorrect creds",
    });
});

app.post("/todo", Authenticate, async (req, res) => {
  try {
    const id = req.userID;
    const todo = req.body.todo;
    await TodoModel.create({
      userID: id,
      title: todo,
      done: false,
    });
    res.status(200).json({ message: "Your todo is added" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error occurred", error: error });
  }
});

app.get("/todos", Authenticate, async (req, res) => {
  const id = req.userID;
  const todos = (
    await TodoModel.find({
      userID: id,
    })
  ).map((todo) => {
    return todo.title;
  });
  res.send({ todos: todos });
});

app.listen("3000", () => {
  console.log("Server Started at Local host at the port 3000");
});
