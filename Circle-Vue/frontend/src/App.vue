<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter();
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => { router.push('/') }
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => { router.push('/profile') }
  },
  {
    label: 'Admin',
    icon: 'pi pi-spin pi-cog',
    command: () => { router.push('/admin') }
  }
])
</script>

<template>
  <div class="container">
    <Menubar :model="items" style="width: 100%;">
      <template #start><b>Cricle</b></template>
    </Menubar>
  </div>
  <main>
    <RouterView class="router-view"/>
  </main>
</template>

<style scoped>
  h1 {
    font-family: Arial, Helvetica, sans-serif;
  }
  .container {
    position: fixed;
    top: 0;
    z-index: 200;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Inter;
  }

  main {
    margin-top: 50px;
  }
</style>
