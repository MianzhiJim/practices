<template>
  <div class="profile">
    <h1>This is profile</h1>
    <div v-for="user in users">
      <p>{{  user._id }}</p>
      <p>{{  user.userEmail }}</p>
      <p>{{  user.password }}</p>
      <p>{{  user.role }}</p>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';

  const apiUrl = 'http://localhost:4231/api/users';
  const users = ref([]);

  axios.get(`${apiUrl}/getAllUsers`)
  .then(res => {
    console.log(res.data);
    users.value = [...res.data];
  })

</script>

<style>

</style>
