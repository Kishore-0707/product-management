<script setup>
import { useProductStore } from "@/stores/product";
import { useAuthStore } from "@/stores/userAuth";
import { onMounted, reactive, ref } from "vue";
import Fancybutton from "@/components/fancybutton.vue";
import { useRules } from "vuetify/labs/rules";
import toast from "@/utility/toast";
import displaycard from "@/components/homePage/displaycard.vue";

const productStore = useProductStore();
const userStore = useAuthStore();
const rules = useRules();

const showPopup = ref(false);
const addItems = reactive({
  id: null,
  productName: "",
  price: null,
  description: "",
  brandName: "",
  image: null,
  existingImage: "",
});
const isUpdate = ref(false);
const dialog = ref(false);
const form = ref(null);

function openPopup(product, updateMode) {
  // console.log("Hi",product.image)
  isUpdate.value = updateMode;

  addItems.id = product.id;
  addItems.productName = product.product_name;
  addItems.price = product.price;
  addItems.brandName = product.brand_name;
  addItems.description = product.description;
  addItems.image = null;

  if (updateMode) {
    addItems.existingImage = product.image;
  } else {
    addItems.existingImage = "";
  }

  showPopup.value = true;
}

function closePopup() {
  dialog.value = false;
}

async function save() {
  console.log("form :", form);

  const { valid } = await form.value.validate();
  console.log(valid);
  if (!valid) {
    toast.error("empty data");
    return;
  }

  const fileToUpload = addItems.image ? addItems.image : null;

  const formData = new FormData();
  formData.append("id", addItems.id);
  formData.append("productName", addItems.productName);
  formData.append("price", addItems.price);
  formData.append("brandName", addItems.brandName);
  formData.append("description", addItems.description);
  if (fileToUpload) {
    formData.append("image", fileToUpload); // File object goes here directly
  }
  console.log(fileToUpload)

  if (isUpdate.value) {
    productStore.updateProduct(formData);
  } else {
    productStore.addProduct(formData);
  }
  dialog.value = false;
}

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <v-main>

  
  <v-container  class="d-flex flex-wrap ma-2 w-100">
    <Fancybutton
      @click="
        openPopup(
          { id: null, productName: '', price: null, brandName: '', description: '', image: [] },
          false,
        );
        dialog = true;
      "
      >Add Product</Fancybutton
    >

    <v-card
      class="ma-10 pa-4 w-050 hover-elevation-5 "
      elevation-5
      v-for="product in productStore.productsItems"
      :key="product.id"
    >
      <displaycard :product="product" />

      <v-card-actions class="border-primary">
        <Fancybutton
          class="mx-2"
          @click="
            openPopup(product, true);
            dialog = true;
          "
        >
          Update</Fancybutton
        >
        <Fancybutton @click="productStore.deleteProduct(product)">delete</Fancybutton>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" class="ma-5" height="900" width="700" rounded="sm" persistent>
      <v-form ref="form" @submit.prevent="save">
        <v-card rounded class="px-4">
          <v-card-title>
            {{ isUpdate ? "Update Product" : "Add Product" }}
          </v-card-title>

          <!-- FIX: Removed trailing semicolons from class names -->
          <v-text-field
            v-model="addItems.brandName"
            label="Brand Name"
            prepend-inner-icon="mdi-cart"
            variant="outlined"
            placeholder="Enter the brand name"
            style="height: 20px; margin-bottom: 60px; padding: 20px"
            class="pa-2"
            :rules="[rules.required('You have to fill this field!')]"
          />

          <v-text-field
            v-model="addItems.productName"
            label="product Name"
            prepend-inner-icon="mdi-cart-outline"
            variant="outlined"
            placeholder="Enter the product name"
            style="height: 20px; margin-bottom: 60px; padding: 20px"
            class="pa-2"
            :rules="[rules.required('You have to fill this field!')]"
          />

          <v-text-field
            v-model="addItems.description"
            label="Description"
            prepend-inner-icon="mdi-basket"
            variant="outlined"
            placeholder="Enter the description"
            style="height: 20px; margin-bottom: 60px; padding: 20px"
            class="pa-2"
            :rules="[rules.required('You have to fill this field!')]"
          />

          <v-text-field
            v-model="addItems.price"
            label="Price"
            prepend-inner-icon="mdi-tag"
            variant="outlined"
            type="number"
            placeholder="Enter the product price"
            style="height: 20px; margin-bottom: 60px; padding: 20px"
            :rules="[rules.required('You have to fill this field!')]"
          />

          <v-img
            v-if="addItems.existingImage"
            :src="`http://localhost:3333/uploads/products/${addItems.existingImage}`"
            width="150"
            class="mb-4"
          />

          <v-file-input
            v-model="addItems.image"
            label="Product Image"
            prepend-inner-icon="mdi-camera"
            variant="outlined"
            accept="image/png, image/jpeg, image/jpg"
            placeholder="Choose an image"
          />
          <v-spacer />

          <v-card-actions class="justify-center">
            <!-- FIX: Changed color from invalid "danger" to valid "error" -->
            <v-btn variant="flat" color="error" class="px-24" type="submit">Save</v-btn>
            <v-btn variant="flat" color="secondary" @click="closePopup()">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
  </v-main>
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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.add-footer {
  justify-content: center;
}
</style>
