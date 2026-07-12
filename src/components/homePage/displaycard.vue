<script setup>
import { useProductStore } from "@/stores/product";
import { useAuthStore } from "@/stores/userAuth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const userStore = useAuthStore();
const router = useRouter();

function addToCart(product) {
  productStore.cartFunction(product);

  if (userStore.role === "") {
    router.push("/login");
  }
}
onMounted(() => {
  productStore.fetchProducts();
});

productStore.$subscribe(
  (mutation, state) => {
    console.log("product Store excuted");
    (console.log(mutation, state), { flush: "post" });
  },
  { detached: true },
);
</script>

<template>
  <v-container>
    <v-row class="py-6">
      <v-btn
        color="primary"
        rounded="lg"
        size="large"
        class=""
        width="20%"
        type="submit"
        v-show="userStore.role === 'admin'"
        @click="router.push('/edit')"
        :ripple="{ class: 'text-red' }"
      >
        Edit Product</v-btn
      >
      <v-btn
        color="primary"
        rounded="lg"
        size="large"
        class="ml-4"
        width="20%"
        type="submit"
        @click="router.push('/cart')"
        >cart
      </v-btn>
    </v-row>

    <v-card class="pa-6 mb-6" rounded="lg" v-for="product in productStore.productsItems" :key="product.$id">
      <v-card-title>
        <p>product name : {{ product.brandName }} {{ product.productName }}</p></v-card-title
      >
      <v-card-subtitle>
        <p>Description : {{ product.description }}</p></v-card-subtitle
      >
      <p style="padding-left: 20px">price :{{ product.price }}</p>

      <v-btn
        color="secondary"
        rounded="lg"
        size="large"
        class="ma-8"
        width="80%"
        @click="addToCart(product)"
        >add to cart</v-btn
      >
    </v-card>
  </v-container>
</template>
<style scoped>
.container {
  min-height: 100vh;
  display: block;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
  padding: 40px;
  flex-wrap: wrap;
}

.card {
  margin: auto;
  margin-bottom: 100px;
  width: 350px;
  background: aliceblue;
  padding: 30px;
  font-size: 16px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.card button {
  width: 100%;
  margin-top: 25px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #4f46e5;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
.buttons {
  font-size: large;
  margin-left: 500px;
  padding: 20px 20px 20px 20px;
  margin-bottom: 50px;
}

.card button:hover {
  background: #3730a3;
}
</style>
