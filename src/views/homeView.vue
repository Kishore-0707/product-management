<script setup>
import displaycard from '@/components/homePage/displaycard.vue';
import navt from '@/components/nav.vue';
import { useProductStore } from "@/stores/product";
import { useAuthStore } from "@/stores/userAuth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const userStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  productStore.fetchProducts();
});

function addToCart(product) {
  productStore.cartFunction(product);

  if (userStore.role === "") {
    router.push("/login");
  }
}

productStore.$subscribe(
  (mutation, state) => {
    console.log("product Store excuted");
    (console.log(mutation, state), { flush: "post" });
  },
  { detached: true },
);
</script>
<template>
    <navt  />
    <v-container class="my-16">
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
        <displaycard :product="product"/>
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
<style>

</style>