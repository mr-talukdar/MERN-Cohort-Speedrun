const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sumSereies = (n) => {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
};

rl.question("Enter your number to be summed till", (num) => {
  const n = Number(num);
  const result = sumSereies(n);
  console.log("The sum of series is:", result);
  rl.close();
});
