import { defineStore } from "pinia";
import { useAuthStore } from "./userAuth";
import api from "@/api/services";

export const useProductStore = defineStore("products", {
  state: () => ({
    productsItems: [],

    cartItems: [],
    search: "",
  }),
  getters: {},
  actions: {
    async fetchProducts() {
      const response = await api.get(`/products`);

      sessionStorage.setItem("products", JSON.stringify(response.data));
      this.productsItems = response.data;
    },

    async fetchCartItems() {
      const userStore = useAuthStore();
      console.log("uid", userStore.uid);

      const response = await api.get("/carts", {
        params: {
          userId: userStore.uid,
        },
      });
      sessionStorage.setItem("cartItems", JSON.stringify(response.data));
      console.log("CARTS :", response.data);
      this.cartItems = response.data;
    },

    async cartFunction(product) {
      const userStore = useAuthStore();
      if (!userStore.currentUser) {
        return false;
      }
      const index = this.cartItems.findIndex(
        (items) => items.productId === product.id && items.userId === userStore.uid,
      );
      //console.log(index);
      if (index === -1) {
        const items = {
          productId: product.id,
          quantity: 1,
          userId: userStore.uid,
        };
        //this.cartItems.push({ ...product, quantity: 1, uid: userStore.uid });
        const response = await api.post("/carts", items);
        console.log(response.data);
        this.cartItems.push(response.data);
      } else {
        this.cartItems[index].quantity++;
        await api.patch(`/carts`, {
          id: this.cartItems[index].id,
          quantity: this.cartItems[index].quantity,
        });
      }
      //console.log(this.cartItems);
      return true;
    },
    async increaseQuantity(cartItem) {
      cartItem.quantity++;

      await api.patch("/carts", {
        id: cartItem.id,
        quantity: cartItem.quantity,
      });
    },
    async addProduct(product) {
      try {
        const formData = new FormData();
        formData.append("productName", product.productName);
        formData.append("price", product.price);
        formData.append("brandName", product.brandName);
        formData.append("description", product.description);
        if (product.image) {
          formData.append("image", product.image); // File object goes here directly
        }

        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        await this.fetchProducts();
      } catch (error) {
        console.error("addProduct failed:", error?.response?.data || error);
        toast.error("Failed to add product");
        throw error;
      }
    },
    calculatePrice() {
      const userStore = useAuthStore();

      return this.cartItems.reduce((total, item) => {
        if (item.user_id === userStore.uid) {
          return total + item.product.price * item.quantity;
        }
        return total;
      }, 0);
    },

    async deleteProduct(product) {
      await api.delete(`/products`, { params: { id: product.id } });
      await this.fetchProducts();
      //this.productsItems = this.productsItems.filter((search) => product.id !== search.id);
    },

    async deleteCartProduct(cartItem) {
      const index = this.cartItems.findIndex((item) => item.id === cartItem.id);

      if (index === -1) return;

      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;

        await api.patch(`/carts`, {
          id: cartItem.id,
          quantity: this.cartItems[index].quantity,
        });
      } else {
        await api.delete("/carts", {
          params: {
            id: cartItem.id,
          },
        });

        this.cartItems.splice(index, 1);
      }
    },

    async updateProduct(updatedProduct) {
      const index = this.productsItems.findIndex((product) => product.id === updatedProduct.id);
      console.log(index, "updated excuted");
      if (index !== -1) {
        await api.put(`/products/${updatedProduct.id}`, {
          productName: updatedProduct.productName,
          price: updatedProduct.price,
          brandName: updatedProduct.brandName,
          description: updatedProduct.description,
          image: updatedProduct.image,
        });
        this.productsItems[index] = updatedProduct;
      }
    },
  },
});
