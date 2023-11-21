class ProductManager {
  constructor() {
    this.products = []
    this.currentId = 1
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
    }

    //valido que los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
      console.error(
        "Todos los campos son obligatorios, debes cargarlos todos."
      )
      return
    }
    //valido el codigo del producto
    if (this.products.some((product) => product.code === code)) {// .some : busco si algun elemento del array cumple con x condicion
      console.error("Ya existe un producto con el código ingresado.")
      return
    }

    this.products.push(product)
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id)
    if (!product) {
      console.error("No se encontro el producto con Id:", id)
    }
    return product
  }

  getProducts() {
    return this.products
  }
}

const productManager = new ProductManager()

productManager.addProduct("Zapatilla Nike", "Zapatilla nike roja", 50, "zapaNike1.jpg", "P01", 10 )
productManager.addProduct("Remera Adidas", "Remera adidas negra", 25, "remeAdidas1.jpg", "P02", 15 )

// Producto por id
const productById = productManager.getProductById(1)
//const productById = productManager.getProductById(2)


console.log("El Id del Producto es: ", productById)

const ProductoInexistente = productManager.getProductById(3)
