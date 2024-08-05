<script setup>
  import axios from 'axios';
  import { ref } from 'vue';

  const visibleTop = ref(false);
  const content = ref('');
</script>

<template>
  <Button class="btn" icon="pi pi-arrow-down" @click="visibleTop = true"></Button>
  <div class="drawer">
    <Drawer v-model:visible="visibleTop" position="top" style="height: auto">
      <div class="input">
        <FloatLabel>
          <Textarea v-model="content" rows="20" cols="100" ></Textarea>
          <label>Post Here</label>
        </FloatLabel>
      </div>
      <template #footer>
        <Button label="Submit" icon="pi pi-upload" severity="success" text></Button>
      </template>
    </Drawer>
  </div>
</template>

<style scoped>
  .btn {
    position: fixed;
    z-index: 100;
    width: 100%;
  }

  .input {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>