<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Login from './components/Home/Login.vue';

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
const visible = ref(false);
const close = (event) => {
  visible.value = event;
}
const isLogin = ref(false);
const handleLogin = (event) => {
  isLogin.value = event;
}
</script>

<template>
  <div class="container">
    <Menubar :model="items" style="width: 100%;">
      <template #start><b>Cricle</b></template>
      <template #end>
        <Button v-if="!isLogin" icon="pi pi-sign-in" label="Sign In" severity="secondary" @click="visible = !visible" text></Button>
        <Button v-else icon="pi pi-sign-out" label="Sign Out" severity="secondary" @click="isLogin = false" text></Button>
      </template>
    </Menubar>
  </div>
  <main>
    <RouterView class="router-view"/>
    <Login :visible="visible" @close-modal="close" @logined="handleLogin"></Login>
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
