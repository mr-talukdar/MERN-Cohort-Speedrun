const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const greet = (user) => {
  console.log("hello " + user.name + " your age is " + user.age);
};

const askQuestion = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const startApp = async () => {
  try {
    const name = await askQuestion("Enter Your Name: ");
    const age = await askQuestion("Enter Your Age: ");
    const gender = await askQuestion("Enter Your Gender: ");
    const user = { name: name, age: age, gender: gender };
    greet(user);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
};

startApp();
