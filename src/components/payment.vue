<script setup>
import { defineProps } from "vue";
import { useProductStore } from "@/stores/product";
import { useRouter } from "vue-router";

const props = defineProps({
  productPrice: Number,
  deliveryFee: Number,
  marketFee: Number,
});
const productStore = useProductStore();
const router =useRouter()
function CalculateBill() {
  return props.productPrice + props.deliveryFee + props.marketFee;
}
</script>

<template>
  <v-container>
    <v-card class="pa-6" v-if="props.productPrice !== 0">
      <v-card-title> Summary </v-card-title>
      <v-row>
        <v-col cols="6">Total Price</v-col>
        <v-col cols="6" class="text-right"> ₹{{ props.productPrice }} </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">Delivery Fee</v-col>
        <v-col cols="6" class="text-right"> ₹{{ props.deliveryFee }} </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">Market Fee</v-col>
        <v-col cols="6" class="text-right"> ₹{{ props.marketFee }} </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-row>
        <v-col cols="6"><strong>Total Bill</strong></v-col>
        <v-col cols="6" class="text-right">
          <strong>₹{{ CalculateBill() }}</strong>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="pa-6 text-center" v-else>
      <v-card-title>Cart is Empty</v-card-title>
      <v-card-text> Add some products to your cart to continue. </v-card-text>
      <v-btn color="primary" @click="router.push('/')">Home</v-btn>
    </v-card>
  </v-container>
</template>
