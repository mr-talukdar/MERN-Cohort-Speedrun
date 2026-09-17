const express = require("express");
const fs = require("fs/promises");
const app = express();

const path = require("path");

const port = 3000;

app.use(express.json());

const checkIsHealthy = async (user) => {
  const data = JSON.parse(await fs.readFile("users.json"));
  const userData = data.find(
    (data) => data.name.toLowerCase() === user.toLowerCase(),
  );

  if (userData != undefined) {
    const kidneyData = userData.kidneys;
    const isHealthy = () => {
      if (kidneyData[0].healthy && kidneyData[1].healthy) {
        return "You are healthy, go chuck creatine";
      } else if (kidneyData[0].healthy || kidneyData[1].healthy) {
        return "You have a failing kidney cuz";
      } else return "you ded nigga";
    };
    return isHealthy();
  } else return "404";
};

const addData = async (data) => {
  const userData = JSON.parse(await fs.readFile("users.json"));
  userData.push(data);
  await fs.writeFile(
    path.join(__dirname, "users.json"),
    JSON.stringify(userData),
  );
  return true;
};

app.get("/", (req, res) => {
  res.status(200).send("hello from server");
});

app.get("/user", async (req, res) => {
  const user = req.query.user;
  const healthy = await checkIsHealthy(user);
  if (healthy === "404") res.status(404).send("invalid user");
  else res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", async (req, res) => {
  const data = req.body;
  const dataAdded = await addData(data);
  if (dataAdded) {
    res.status(200).send({
      status: 200,
      data: data,
    });
  } else res.status(500).send("Internal Server Error");
});

app.put("/", (req, res) => {});

app.delete("/", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
