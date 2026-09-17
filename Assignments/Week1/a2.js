const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const canVote = (age) => {
  if (age >= 18) {
    return true;
  }
  return false;
};

rl.question("Enter your age:", (age) => {
  const userAge = Number(age);
  const result = canVote(userAge);
  console.log("can you vote:", result);
  rl.close();
});
