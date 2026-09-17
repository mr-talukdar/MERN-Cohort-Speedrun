const ProductObjects = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Phone", price: 500, category: "Electronics" },
  { name: "Book", price: 20, category: "Education" },
  { name: "Pen", price: 2, category: "Education" },
  { name: "Shirt", price: 30, category: "Clothing" },
  { name: "Pants", price: 40, category: "Clothing" },
];

const filterProducts = (products, priceLimit) => {
  let filtered = products.filter((product) => product.price <= priceLimit);
  let filteredNames = filtered.map((product) => product.name);
  return filteredNames;
};

const fetchData = (data) => {
  return new Promise((resolve, reject) => {
    if (data) {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    } else {
      reject(new Error("No data available"));
    }
  });
};

const filterByCategory = (products, category) => {
  let filtered = products.filter((product) => product.category === category);
  let filteredNames = filtered.map((product) => product.name);
  return filteredNames;
};

const dataFetch = async () => {
  try {
    const getproducts = await fetchData(ProductObjects);
    const filteredProducts = filterProducts(getproducts, 50);
    const filteredByCategory = filterByCategory(getproducts, "Electronics");
    console.log(filteredProducts);
    console.log(
      "Total price of all the products",
      getproducts.reduce((total, product) => total + product.price, 0),
    );
    console.log(filteredByCategory);
  } catch (error) {
    console.error("Error:", error);
  }
};

dataFetch();
