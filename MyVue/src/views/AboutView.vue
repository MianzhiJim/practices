<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ScrollPanel
      class="container"
      ref="scrollPanel"
      style="padding: 20px; width: fit-content; height: 800px;"
      :dt="{
          bar: {
              background: '{primary.color}'
          }
      }">
      <div>
        <div v-for="product of products">
          <Card>
            <template #title>
              <img :src="product.thumbnail" alt="">
            </template>
            <template #content>
              <h3>{{ product.title }}</h3>
              <p>{{ product.description }}</p>
            </template>
          </Card>
          <Divider />
        </div>
        <div ref="el" class="el"></div>
      </div>
    </ScrollPanel>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    margin-top: 55px;
    display: block;
    align-items: center;
  }
}

.el {
  height: 1px;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import ScrollPanel from 'primevue/scrollpanel';
import { useInfiniteScroll } from '@vueuse/core'

const el = ref(null);
const scrollPanel = ref(null)
const products = ref([]);
const total = ref(0);

async function loadData() {
  if (products.value.length !== 0 && products.value.length >= total.value) return;
  const res = await fetch(
    `https://dummyjson.com/products/?limit=10&skip=${products.value.length}`
  );
  const data = await res.json();
  total.value = data.total;
  products.value = products.value.concat(data.products);
};

useInfiniteScroll(el, loadData, { distance: 5, container: scrollPanel });

// loadData();
</script>