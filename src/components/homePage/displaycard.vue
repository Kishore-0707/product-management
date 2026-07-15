<script setup>
import { useProductStore } from "@/stores/product";
import { useAuthStore } from "@/stores/userAuth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { defineProps } from "vue";
import api from "@/api/services";

const productStore = useProductStore();
const userStore = useAuthStore();
const router = useRouter();
const props = defineProps({
  product: Object
})
console.log('Pro',props.product.image)

</script>

<template>
  <v-img
  :src =" `http://localhost:3333/uploads/products/${props.product.image}`"
  height="200"
  cover
/>
  <v-card-title>
    <p>product name : {{ props.product.brand_name }} {{ props.product.product_name }}</p></v-card-title
  >
  <v-card-subtitle>
    <p>Description : {{ props.product.description }}</p></v-card-subtitle>
  <p style="padding-left: 20px">price :{{ props.product.price }}</p>


  
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
