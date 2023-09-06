import { cartModel } from "./models/cart.model.js";
import mongoose from "mongoose";

class CartManager {
  //Crea el nuevo carrito
  async newCart() {
    let cart = await cartModel.create({ products: [] });
    console.log("Cart created!");
    return {
      status: "ok",
      message: "El Carrito se creó correctamente!",
      id: cart._id,
    };
  }
  //Obtiene el carrito por ID
  async getCart(id) {
    if (this.validateId(id)) {
      return (await cartModel.findOne({ _id: id }).lean()) || null;
    } else {
      console.log("Not found!");

      return null;
    }
  }
  //Consigue todos los carritos
  async getCarts() {
    return await cartModel.find().lean();
  }
  //Agrega un porducto al carrito por su ID
  async addProductToCart(cid, pid) {
    try {
      console.log(`Adding product ${pid} to cart ${cid}`);
  
      if (mongoose.Types.ObjectId.isValid(cid) && mongoose.Types.ObjectId.isValid(pid)) {
          const updateResult = await cartModel.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": 1 } }
        );
        
        console.log("Update result:", updateResult);
          if (updateResult.matchedCount === 0) {
          const pushResult = await cartModel.updateOne(
            { _id: cid },
            { $push: { products: { product: pid, quantity: 1 } } }
          );
          
          console.log("Push result:", pushResult);
        }
  
        return {
          status: "ok",
          message: "El producto se agregó correctamente!",
        };
      } else {
        return {
          status: "error",
          message: "ID inválido!",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message: "Ocurrió un error al agregar el producto al carrito!",
      };
    }
  }
  
  //Cambia la cantidad de un porducto determinado en el carrito
  async updateQuantity(cid, pid, quantity) {
    try {
        await cartModel.updateOne( { _id: cid },
          { $set: { products: { product: pid, quantity: quantity } } });
        console.log("Product updated!");

        return true;
    } catch (error) {
        console.log("Not found!");
        
        return false;
    }
}
  //Borra un producto del carrito
  async deleteProductFromCart(cid, pid) {
    try {
      if (this.validateId(cid)) {
        const cart = await this.getCart(cid);
        const products = cart.products.filter((item) => item.product !== pid);

        await cartModel.updateOne({ _id: cid }, { products: products });
        console.log("Product deleted!");

        return true;
      } else {
        console.log("Not found!");

        return false;
      }
    } catch (error) {
      return false;
    }
  }
  
  //Vacia el carrito
  async deleteProductsFromCart(cid) {
    try {
      if (this.validateId(cid)) {
        const cart = await this.getCart(cid);

        await cartModel.updateOne({ _id: cid }, { products: [] });
        console.log("Products deleted!");

        return true;
      } else {
        console.log("Not found!");

        return false;
      }
    } catch (error) {
      return false;
    }
  }

  validateId(id) {
    return id.length === 24 ? true : false;
  }
}

export default CartManager;
