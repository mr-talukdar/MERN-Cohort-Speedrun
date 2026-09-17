const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const users = [
  {
    username: "abcd@example.com",
    password: "abcd1234",
  },
  {
    username: "rahul@example.com",
    password: "ggwp",
  },
];

const MY_APP_SECRET = "HugaPuga69";

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.send("Need Auth");
      return;
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, MY_APP_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.send("Invalid Auth");
  }
};

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/signup", (req, res) => {
  const { uid, pwd } = req.body;
  const user = users.find((user) => user.username === uid);
  if (!user) {
    users.push({ username: uid, password: pwd });
    res.status(200).send("User Created Successfully");
  } else res.status(300).send("User Already Exists");
});

app.post("/signin", (req, res) => {
  const { uid, pwd } = req.body;
  const user = users.find(
    (user) => user.username === uid && user.password === pwd,
  );
  if (user) {
    const token = jwt.sign({ username: uid }, MY_APP_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.send({ token });
  }
});

app.get("/me", auth, (req, res) => {
  const uid = req.user.username;
  res.send({ username: uid });
});

app.listen(3000, () => {
  console.log("Server started at 3000");
});
