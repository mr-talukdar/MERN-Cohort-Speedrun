function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Rahul" },
        { id: 2, name: "Alex" },
        { id: 3, name: "Sam" },
      ]);
    }, 1000);
  });
}

function getOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, userId: 1, amount: 500, status: "completed" },
        { id: 102, userId: 1, amount: 300, status: "cancelled" },
        { id: 103, userId: 2, amount: 700, status: "completed" },
        { id: 104, userId: 3, amount: 200, status: "completed" },
        { id: 105, userId: 2, amount: 400, status: "cancelled" },
        { id: 106, userId: 1, amount: 500, status: "completed" },
      ]);
    }, 1500);
  });
}

const generateOrderReport = async () => {
  try {
    const [users, orders] = await Promise.all([getUsers(), getOrders()]);
    const completedOrders = orders.filter(
      (order) => order.status.toLowerCase() === "completed",
    );

    const completeOrderWithUser = completedOrders.map((order) => {
      const orderUser = users.find((user) => user.id === order.userId);
      return {
        ...order,
        user: orderUser.name,
      };
    });

    const totalRevenue = completeOrderWithUser.reduce(
      (total, order) => total + order.amount,
      0,
    );

    const userTotalSpends = users.map((user) => {
      if (Number.isInteger(user.id)) {
        const userOrders = completeOrderWithUser.filter(
          (order) => order.userId === user.id,
        );
        const totalSpent = userOrders.reduce(
          (total, order) => total + order.amount,
          0,
        );
        return {
          name: user.name,
          totalSpent,
        };
      } else throw new Error("Invalid User Id");
    });

    const response = {
      totalRevenue,
      users: userTotalSpends,
      orders: completeOrderWithUser,
    };

    console.log(response);
  } catch (error) {
    console.log("error");
  }
};
console.log(generateOrderReport());
