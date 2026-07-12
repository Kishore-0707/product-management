<script setup>
import payment from '@/components/payment.vue';
import { useProductStore } from '@/stores/product';
import { ref } from 'vue';

const deliveryFee = ref(50);
const marketFee = ref(0);
const productStore = useProductStore();

</script>
<template>
    <payment :productPrice = "productStore.calculatePrice()"
                :deliveryFee
                :marketFee/>
</template>