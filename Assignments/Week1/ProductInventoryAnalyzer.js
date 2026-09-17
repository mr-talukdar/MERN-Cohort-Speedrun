function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Keyboard", categoryId: 10, price: 2500, stock: 4 },
        { id: 2, name: "Mouse", categoryId: 10, price: 1200, stock: 10 },
        { id: 3, name: "Monitor", categoryId: 20, price: 15000, stock: 2 },
        { id: 4, name: "Headphones", categoryId: 30, price: 5000, stock: 5 },
        { id: 5, name: "Webcam", categoryId: 20, price: 7000, stock: 3 },
      ]);
    }, 1200);
  });
}

function getCategories() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 10, name: "Accessories" },
        { id: 20, name: "Displays" },
        { id: 30, name: "Audio" },
      ]);
    }, 800);
  });
}

const generateInventoryReport = async () => {
  const [Products, Categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const productsWithCategory = Products.map((product) => {
    const category = Categories.find(
      (category) => category.id === product.categoryId,
    );
    return {
      ...product,
      category: category.name,
    };
  });

  const inventoryValueEachProduct = productsWithCategory.map((product) => {
    const total = product.price * product.stock;
    return {
      product: product.name,
      totalInventoryValue: total,
      category: product.category,
    };
  });

  const categoryWithInventoryValue = Categories.map((category) => {
    const productForCategory = inventoryValueEachProduct.filter(
      (product) =>
        product.category.toLowerCase() === category.name.toLowerCase(),
    );
    const inventoryForCategory = productForCategory.reduce(
      (total, product) => total + product.totalInventoryValue,
      0,
    );
    return {
      name: category.name,
      totalInventory: inventoryForCategory,
    };
  });

  const categoryWithHighestInventoryValue = categoryWithInventoryValue.find(
    (category) =>
      category.totalInventory ===
      categoryWithInventoryValue.reduce(
        (max, category) =>
          max > category.totalInventory ? max : category.totalInventory,
        categoryWithInventoryValue[0].totalInventory,
      ),
  );

  const totalInventoryValue = inventoryValueEachProduct.reduce(
    (total, product) => total + product.totalInventoryValue,
    0,
  );

  const res = {
    totalInventoryValue,
    highestValueCategory: categoryWithHighestInventoryValue,
    Products,
  };

  console.log(res);
};
generateInventoryReport();
