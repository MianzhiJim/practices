<template>
  <div class="profile">
    <div v-if="!props.isLogin">
      <h1>You have not sign in yet</h1>
    </div>
    <div v-else class="container">
      <Tabs value="0">
        <TabList>
          <Tab value="0">Account</Tab>
          <Tab value="1">Posts</Tab>
          <Tab value="2">Likes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <p>Username: {{ userInfo.name }}</p>
            <p>Email: {{ userInfo.email }}</p>
          </TabPanel>
          <TabPanel value="1">

          </TabPanel>
          <TabPanel value="2">

        </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';

  const apiUrl = 'http://localhost:4231/api/users/getProfile';
  const props = defineProps(['isLogin']);
  const userName = ref('');
  const userInfo = ref({
    name: '',
    email: '',
    role: '',
  })

  // Not log in
  console.log(localStorage.getItem('userInfo'))
  if (localStorage.getItem('userInfo')) {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    userName.value = user.userName;
    userInfo.value.name = user.userName;
    userInfo.value.email = user.userEmail;

    // axios.get(`${apiUrl}/${userName.value}`)
    // .then(res => {
    //   console.log(res.data)
    //   const data = res.data;
    //   userInfo.value.id = data._id;
    //   userInfo.value.name = data.userName;
    //   userInfo.value.email = data.userEmail;
    //   userInfo.value.role = data.userRole;
    //   console.log(userInfo.value)
    // });
  }

</script>

<style scoped>
  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
  }
</style>
