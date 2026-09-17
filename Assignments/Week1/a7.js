const legal = (users) => {
  return users.filter((user) => user.age >= 18 && user.gender === "male");
};

console.log(
  legal([
    { name: "John", age: 17, gender: "male" },
    { name: "Jane", age: 18, gender: "female" },
    { name: "Jack", age: 19, gender: "male" },
  ]),
);
