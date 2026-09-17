const rl = require("readline/promises").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const greet = (user) => {
  console.log(
    "hello " + user.pronouns + " " + user.name + " your age is " + user.age,
  );
};

const askQuestion = async (question) => {
  const answer = await rl.question(question);
  return answer;
};

const startApp = async () => {
  try {
    const name = await askQuestion("Enter Your Name: ");
    const age = await askQuestion("Enter Your Age: ");
    const pronouns = await askQuestion("Enter Your Pronouns: ");
    const user = { name: name, age: age, pronouns: pronouns };
    greet(user);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
};

startApp();
