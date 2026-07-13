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
const addItems = reactive({ id: null, productName: "", price: null });
const isUpdate = ref(false);
const dialog = ref(false)
const form =ref(null)

function openPopup(product, updateMode) {
  isUpdate.value = updateMode;

  addItems.id = product.id; 
  addItems.productName = product.productName;
  addItems.price = product.price;
  addItems.brandName = product.brandName;
  addItems.description = product.description;

  showPopup.value = true;
}

function closePopup() {
  dialog.value = false;
}
async function save() {

  console.log("form :",form)
  

  const {valid} = await form.value.validate()
  console.log(valid)
  if(!valid){
    toast.error("empty data");
    return;
  }

  if (isUpdate.value) {
    productStore.updateProduct(addItems);
  } else {
    productStore.addProduct({productName :addItems.productName, price :addItems.price, brandName : addItems.brandName,description : addItems.description});
  }
  dialog.value = false;
}
onMounted(() =>{
  productStore.fetchProducts()
})
</script>

<template>
  <v-container>
    <Fancybutton @click="openPopup({ id: null, productName: '', price: null, brandName:'',description:'' },false) ; dialog = true">Add Product</Fancybutton>

    <v-card class="my-4 pa-4 hover-elevation-5" elevation-5  v-for="product in productStore.productsItems" :key="product.id">
      <displaycard :product="product" />

      <v-card-actions class=" border-primary">
        <Fancybutton class="mx-2" @click="openPopup(product,true); dialog= true"> Update</FancyButton>

        <Fancybutton  @click="productStore.deleteProduct(product)">delete</Fancybutton>
      </v-card-actions>
      
      </v-card>
    
  <v-dialog v-model="dialog" class="ma-5" height="900" width="700" rounded="sm" persistent>
    <v-form ref="form"  @submit.prevent="save">
    <v-card rounded class="px-4">
      <v-card-title>
        {{ isUpdate ? "Update Product" : "Add Product" }}
      </v-card-title > 
      <v-text-field v-model="addItems.brandName" 
                    label="Brand Name"
                    prepend-inner-icon="mdi-cart"
                    variant="outlined"
                    placeholder="Enter the brand name" 
                    style="height: 20px; margin-bottom: 60px; padding: 20px;" 
                    class="pa-2;"  
                    :rules="[rules.required('You have to fill this field!')]" />
      <v-text-field v-model="addItems.productName"
                     label="product Name"
                    prepend-inner-icon="mdi-cart-outline"
                    variant="outlined"
                    placeholder="Enter the product name" 
                    style="height: 20px; margin-bottom: 60px; padding: 20px;" 
                    class="pa-2;"  
                    :rules="[rules.required('You have to fill this field!')]" />
      <v-text-field v-model="addItems.description"
                    label="Description"
                    prepend-inner-icon="mdi-basket"
                    variant="outlined" 
                    placeholder="Enter the description" 
                    style="height: 20px; margin-bottom: 60px; padding: 20px;" class="pa-2;"  
                    :rules="[rules.required('You have to fill this field!')]" />
      <v-text-field v-model="addItems.price"
                    label="Price"
                    prepend-inner-icon="mdi-tag"
                    variant="outlined" 
                    type="number"   
                    placeholder="Enter the product price" 
                    style="height: 20px; margin-bottom: 60px; padding: 20px;"  
                    :rules="[rules.required('You have to fill this field!')]" />
      <v-spacer/>

      <v-card-actions  class=" justify-center" >
        <v-btn variant="flat" color="danger"  class="px-24" type="submit">Save</v-btn>

      <v-btn variant="flat" color="error" @click="closePopup()">Close</v-btn>
      </v-card-actions>
      
    </v-card>
    </v-form>

  </v-dialog>
</v-container>

<!--
  <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
    <div class="popup-box">
      <h2>{{ isUpdate ? "Update Product" : "Add Product" }}</h2>

      <input v-model="addItems.productName" placeholder="Enter the product name" />
      <input v-model="addItems.price" type="number" placeholder="Enter the product price" />

      <button @click="save">Save</button>
      <button @click="closePopup()">Close</button>
    </div>
  </div> 
-->  
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

 .add-footer{
  justify-content: center;
}
</style>
