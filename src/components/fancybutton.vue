<script setup></script>
<template>
    
      <v-btn color="primary" rounded="lg"  size="large"  class="custom-btn"  width="20%">
        <slot>Click me</slot>
    </v-btn>
    
    </template>
<style>


.custom-btn {
  border: 2px solid black;
  padding: 20px;
  width: 50px  ;
  margin-right: 20px;
}

</style>
