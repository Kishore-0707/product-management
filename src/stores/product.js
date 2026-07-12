import { defineStore } from "pinia";
import { useAuthStore } from "./userAuth";
import api from "@/api/services";

export const useProductStore = defineStore("products", {
  state: () => ({
    productsItems: [],
    //   { id: 1, productName: "bottle", price: 300 },
    //   { id: 2, productName: "mobile", price: 40000 },
    //   { id: 3, productName: "Football", price: 5000 },
    //   { id: 4, productName: "Airpods", price: 20000 },
    //   { id: 5, productName: "Watch", price: 5000 },
    // ],

    cartItems: [],
    search : "",

    // priceInCart: [],
  }),
  getters: {},
  actions: {
    async fetchProducts() {
      const response = await api.get(`http://localhost:3000/products`);
      
      sessionStorage.setItem("products", JSON.stringify(response.data));
      console.log("response :", response);
      console.log("data", response.data);
      this.productsItems = response.data;
    },

    async fetchCartItems() {
      const userStore = useAuthStore()
      console.log(userStore.uid)
      const response = await api.get(`http://localhost:3000/cart?uid_where =${userStore.uid}` );
      sessionStorage.setItem("cartItems", JSON.stringify(response.data));
      console.log("response :", response);
      console.log("data", response.data);
      this.cartItems = response.data;
    },

    async cartFunction(product) {
      const userStore = useAuthStore();
      if (!userStore.currentUser) {
        return false;
      }
      const index = this.cartItems.findIndex(
        (items) => product.id === items.productId && items.uid === userStore.uid,
      );
      //console.log(index);
      if (index === -1) {
        const items = {
          productId: product.id,
          productName: product.productName,
          brandName: product.brandName,
          description : product.description,
          price: product.price,
          quantity: 1,
          uid: userStore.uid,
        };
        //this.cartItems.push({ ...product, quantity: 1, uid: userStore.uid });
        const response = await api.post("http://localhost:3000/cart", items);

        this.cartItems.push(response.data);
      } else {
        this.cartItems[index].quantity++;
        await api.patch(`http://localhost:3000/cart/${this.cartItems[index].id}`, {
          quantity: this.cartItems[index].quantity,
        });
      }
      //console.log(this.cartItems);
      return true;
    },
    async increaseQuantity(cartItem) {
      cartItem.quantity++;

      await api.patch(`http://localhost:3000/cart/${cartItem.id}`, {
        quantity: cartItem.quantity,
      });
    },
    async addProduct(product) {
      await api.post("http://localhost:3000/products", {
        ...product,
      });
      await this.fetchProducts();
      //this.productsItems.push( { id: newID, ...product });
      console.log(this.productsItems);
    },
    calculatePrice() {
      const userStore = useAuthStore();

      return this.cartItems.reduce((total, item) => {
        if (item.uid === userStore.uid) {
          return total + item.price * item.quantity;
        }
        return total;
      }, 0);
    },

    async deleteProduct(product) {
      await api.delete(`http://localhost:3000/products/${product.id}`);
      await this.fetchProducts();
      //this.productsItems = this.productsItems.filter((search) => product.id !== search.id);
    },

    async deleteCartProduct(cartItem) {
      const index = this.cartItems.findIndex((item) => item.id === cartItem.id);

      if (index === -1) return;

      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;

        await api.patch(`http://localhost:3000/cart/${cartItem.id}`, {
          quantity: this.cartItems[index].quantity,
        });
      } else {
        await api.delete(`http://localhost:3000/cart/${cartItem.id}`);

        this.cartItems.splice(index, 1);
      }
    },

    async updateProduct(updatedProduct) {
      const index = this.productsItems.findIndex((product) => product.id === updatedProduct.id);
      console.log(index, "updated excuted");
      if (index !== -1) {
        await api.put(`http://localhost:3000/products/${updatedProduct.id}`, {
          productName: updatedProduct.productName,
          price: updatedProduct.price,
          brandName : updatedProduct.brandName,
          description : updatedProduct.description,
        });
        this.productsItems[index] = updatedProduct;
      }
    },
  },
});
