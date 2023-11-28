const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = filePath;
    this.products = [];
    this.currentId = 1;

    this.loadProductFromFile();
  }

  loadProductFromFile() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.log("Error al cargar productos desde el archivo:", error.message);
      this.products = [];
    }
  }

  saveProductsToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data, "utf8");
    } catch (error) {
      console.error("Error al guardar productos en el archivo:", error.message);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    //producto
    const product = {
      id: this.currentId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    //valido que los campos sean obligatorios
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      stock === undefined
    ) {
      console.error(
        "Todos los campos son obligatorios, debes cargarlos todos."
      );
      return;
    }
    //valido el codigo del producto
    if (this.products.some((product) => product.code === code)) {
      // .some : busco si algun elemento del array cumple con x condicion
      console.error("Ya existe un producto con el código ingresado.");
      return;
    }

    this.products.push(product);
    this.saveProductsToFile();
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("No se encontro el producto con Id:", id);
    }
    return product;
  }

  getProducts() {
    return this.products;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      // Mantener el id del producto
      updatedProduct.id = id;

      // Actualizar el producto en el arreglo
      this.products[index] = updatedProduct;
    } else {
      console.error("Producto no encontrado. Id:", id);
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "Zapatilla Nike",
  "Zapatilla nike roja",
  50,
  "zapaNike1.jpg",
  "P01",
  10
);
productManager.addProduct(
  "Remera Adidas",
  "Remera adidas negra",
  25,
  "remeAdidas1.jpg",
  "P02",
  15
);

// Producto por id
const productById = productManager.getProductById(1);
//const productById = productManager.getProductById(2)

console.log("El Id del Producto es: ", productById);

const ProductoInexistente = productManager.getProductById(3);

// Actualizar un producto por id
productManager.updateProduct(1, {
  title: "Producto Actualizado",
  description: "Nueva descripción",
  price: 25.99,
  thumbnail: "img_updated.jpg",
  code: "P001",
  stock: 5,
});

console.log(
  "Productos después de la actualización:",
  productManager.getProducts()
);

// Eliminar un producto por id
productManager.deleteProduct(2);
console.log(
  "Productos después de la eliminación:",
  productManager.getProducts()
);
