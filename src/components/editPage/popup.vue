<script setup>
import { useProductStore } from '@/stores/product';
import { defineEmits } from 'vue';

const productStore = useProductStore()

const props = defineProps({
  showPopup: Boolean,
  selectedProduct: Object,
});

const emit = defineEmits(["close"]);


</script>
<template>
    
</template>
<style>
</style>