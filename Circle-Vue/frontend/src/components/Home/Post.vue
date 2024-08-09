<script setup>
  import axios from 'axios';
  import { ref } from 'vue';

  const apiUrl = 'http://localhost:4231/api/news';

  const visibleTop = ref(false);
  const content = ref('');

  function onClick() {
    console.log(content.value)
    const body = {
      publisherName: 'Jim',
      content : {
        image: 'dummy.jpg',
        video: 'dummy.mp4',
        text: content.value
      },
      comment: [],
      likedIdList: []
    };
    axios.post(apiUrl, body)
    .then(res => {
      // console.log(res)
      content.value = '';
      visibleTop.value = !visibleTop.value;
    })
  }
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
        <Button @click="onClick" label="Submit" icon="pi pi-upload" severity="success" text></Button>
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