const rl = require("readline/promises").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const products = [
        { name: "Laptop", price: 1000, stock: 10, category: "Electronics" },
        { name: "Phone", price: 500, stock: 20, category: "Electronics" },
        { name: "Book", price: 20, stock: 50, category: "Education" },
        { name: "Pen", price: 2, stock: 100, category: "Education" },
        { name: "Shirt", price: 30, stock: 30, category: "Clothing" },
        { name: "Pants", price: 40, stock: 25, category: "Clothing" },
      ];
      resolve(products);
    }, 1000);
  });
};

const fetchCategories = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const categories = [
        { name: "Electronics", description: "Electronic items" },
        { name: "Education", description: "Educational items" },
        { name: "Clothing", description: "Clothing items" },
      ];
      resolve(categories);
    }, 1000);
  });
};

const getCategoryInventoryValue = (categoryName, products) => {
  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase(),
  );
  const totalValue = categoryProducts.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  );
  return totalValue;
};

const getInventoryValue = async () => {
  try {
    const products = fetchProducts();
    const categories = fetchCategories();
    const [productData, categoryData] = await Promise.all([
      products,
      categories,
    ]);

    const category = await rl.question("Enter a category name: ");
    const inventoryValue = getCategoryInventoryValue(category, productData);
    console.log(
      `Total inventory value for category ${category}: $${inventoryValue}`,
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
};

getInventoryValue();
