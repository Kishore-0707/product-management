<script setup>
import { useProductStore } from "@/stores/product";
import { useAuthStore } from "@/stores/userAuth";
import fancybutton from "@/components/fancybutton.vue";
import { useRouter,RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import Displaycard from "@/components/homePage/displaycard.vue";

const productStore = useProductStore();
const userStore = useAuthStore();
const router = useRouter()
const loading =ref(true)

onMounted(async () => {
  loading.value = true
  await productStore.fetchCartItems();
  loading.value = false
})


</script>
<template>
  <template v-if="loading">
    <v-container>
      <v-card v-for="n in 10" :key="n" sm="6" md="4"  class="w-10 my-6 pa-7" >
            <v-skeleton-loader type="image" />
            <v-skeleton-loader type="heading" />
            <v-skeleton-loader type="text" />
            <v-skeleton-loader type="button" />
          </v-card>
    </v-container>
  </template>
  <v-container color="danger" class = "">
    <p v-if="productStore.calculatePrice() !== 0">Total Price :{{productStore.calculatePrice() }}</p>
    <p v-else >Cart is Empty !!</p>
    <!-- <div class="card" v-for="items in productStore.cartItems.filter((item) => userStore.uid == item.uid)" :key="items.id" >
        <p>Product Name :{{ items.productName }}</p>
        <p>Price :{{ items.price }}</p>
        

        <button @click="productStore.deleteCartProduct(items)">-</button>
        <p style="display: flex;"> {{ items.quantity }}</p>
        <button @click="productStore.increaseQuantity(items)">+</button>        
    </div>
     -->
    <v-card v-for="items in productStore.cartItems" class="ma-4" :elevation="10">
      
      <v-img
  :src =" `http://localhost:3333/uploads/products/${items.product.image}`"
  height="200"
  cover
/>
  <v-card-title>
    <p>product name : {{ items.product.brand_name }} {{ items.product.product_name }}</p></v-card-title
  >
  <v-card-subtitle>
    <p>Description : {{ items.product.description }}</p></v-card-subtitle>
  <p style="padding-left: 20px">price :{{ items.product.price }}</p>

      <v-card-actions  varient="flat" style="display: flex;">
        <fancybutton style="margin-right:0px ;" @click="productStore.deleteCartProduct(items)">
          -
        </fancybutton>
        <p style="margin: 10px 10px 0px 10px;">{{ items.quantity }}</p>
        <fancybutton @click="productStore.increaseQuantity(items)"> 
          +
        </fancybutton>
      </v-card-actions>
    </v-card>   

    <fancybutton rounded 
                block 
                @click.prevent = "router.push('/cart/payment')">
      PROCCED 
    </fancybutton>
        
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
    margin-bottom:100px ;
  width: 350px;
  background: aliceblue;
  padding: 30px;
  font-size: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}</style>
