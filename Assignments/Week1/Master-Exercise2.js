const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
        { name: "Bob", age: 35 },
      ];
      resolve(users);
    }, 1000);
  });
};

const fetchOrders = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orders = [
        { id: 1, userId: 1, amount: 100, completed: true },
        { id: 2, userId: 2, amount: 200, completed: false },
        { id: 3, userId: 3, amount: 300, completed: true },
        { id: 4, userId: 1, amount: 400, completed: false },
        { id: 5, userId: 2, amount: 500, completed: true },
        { id: 6, userId: 3, amount: 600, completed: false },
      ];
      resolve(orders);
    }, 1000);
  });
};

const getdashBoardSummary = async () => {
  try {
    const users = fetchUsers();
    const orders = fetchOrders();
    const [userData, orderdata] = await Promise.all([users, orders]);
    const totalOrderPrice = orderdata
      .filter((order) => order.completed)
      .reduce((total, order) => total + order.amount, 0);
    console.log("Total Order Price:", totalOrderPrice);
    return { totalOrderPrice };
  } catch (error) {
    console.log("Error:", error);
  }
};

getdashBoardSummary();
