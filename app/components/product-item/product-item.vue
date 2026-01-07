<script lang="ts" setup>
import type { Product } from '#shared/interfaces/product.interface'

const { name, price, images, discount } = defineProps<Product>()
</script>

<template>
  <div class="product">
    <div class="product__card">
      <img :src="images[0]" alt="name" class="product__image">
      <div v-if="discount > 0" class="product__discount">- {{ discount }}%</div>
    </div>
    <h3 class="product__title">{{ name }}</h3>
    <div class="product__price">$ {{ price.toFixed(2) }}</div>
  </div>
</template>

<style scoped src="./product-item.css">

</style>
