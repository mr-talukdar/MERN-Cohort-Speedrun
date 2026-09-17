const express = require("express");
const app = express();

const users = [
  {
    username: "abcd@example.com",
    password: "abcd1234",
    token: "",
  },
];

const addUser = (username, password) => {
  users.push({ username: username, password: password, token: "" });
  return true;
};

const generateToken = () => {
  let token =
    Math.floor(Math.random() + Math.random() * Math.random()) +
    Date.UTC.toString() +
    Math.floor(Math.random() + Math.random() * Math.random());

  return token;
};

app.use(express.json());

app.post("/signin", (req, res) => {
  const { uname, pwd } = req.body;
  const user = users.find(
    (user) => user.username === uname && user.password === pwd,
  );
  if (user) {
    const token = generateToken();
    user.token = token;
    res.send({
      token,
    });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.post("/signup", (req, res) => {
  const { uname, pwd } = req.body;
  const done = addUser(uname, pwd);
  res.status(200).send("USer added :", done);
});

app.listen(3000, () => {
  console.log("Server started and listenin g on Port 3000");
});
