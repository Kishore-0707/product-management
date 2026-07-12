<script setup>
import { useAuthStore } from "@/stores/userAuth";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import { watch } from "vue";
import api from "@/api/services";
import debounce from "@/utility/debounce";

const userStore = useAuthStore();
const router = useRouter();
const productStore = useProductStore();


const searchProducts = debounce(async (value) => {
  if (!value.trim()) {
    await productStore.fetchProducts();
    return;
  }

  const response = await api.get(`/products?productName_like=${value}`);
  productStore.productsItems = response.data;

  console.log(response.data);
}, 500);

watch(() => productStore.search, (value) => {
  searchProducts(value);
});

</script>

<template>
    <v-app-bar color="primary" class="pa-4 w-100 " 
  >
      <p>role {{ userStore.role }}</p>

      <v-text-field
        v-model="productStore.search"
        placeholder="Search products..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        class="mx-6"
      />

      <v-spacer></v-spacer>

      <v-btn color="danger.darken-4" variant="text" v-show="!userStore.currentUser" @click="router.push('/login')">login</v-btn>
      <v-btn color="danger.darken-4" variant="text" v-show="userStore.currentUser" @click="userStore.logout">logout</v-btn>

    </v-app-bar>
    
</template>
<style scoped>
.user-info {
  background-color: aliceblue;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
}
</style>
