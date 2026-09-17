const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const EveOdd = (num) => {
  if (num % 2 == 0) {
    return true;
  }

  return false;
};

rl.question("Enter Number:", (num) => {
  const userNum = Number(num);
  const result = EveOdd(userNum);
  console.log("The number is " + (result ? "even" : "odd"));
  rl.close();
});
