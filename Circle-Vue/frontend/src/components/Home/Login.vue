<template>
  <Dialog v-if="!toSignup" v-model:visible="props.visible" modal header="Login" :closable="false">
    <div class="container">
      <div class="email">
        <label for="email" class="email-label">Email</label>
        <InputText id="email" v-model="email" autocomplete="off" />
      </div>
      <div class="password">
        <label for="password" class="password-label">Password</label>
        <InputText id="password" v-model="pwd" autocomplete="off" />
      </div>
      <div class="btns">
        <Button type="button" class="btn1" label="Cancel" severity="secondary" @click="onClick"></Button>
        <Button type="button" label="Login" @click="onSubmit"></Button>
        <Button type="button" class="btn3" label="Sign up" @click="onSwitch" text></Button>
      </div>
    </div>
  </Dialog>
  <Dialog v-else v-model:visible="props.visible" modal header="Sign up" :closable="false">
    <div class="container">
      <div class="username">
        <label for="username" class="username-label">Username</label>
        <InputText id="username" v-model="username" autocomplete="off" />
      </div>
      <div class="email">
        <label for="email" class="email-label">Email</label>
        <InputText id="email" v-model="email" autocomplete="off" />
      </div>
      <div class="password">
        <label for="password" class="password-label">Password</label>
        <InputText id="password" v-model="pwd" autocomplete="off" />
      </div>
      <div class="c-password">
        <label for="c-password" class="c-password-label">Confirm Password</label>
        <InputText id="c-password" v-model="c_pwd" autocomplete="off" />
      </div>
      <div class="btns">
        <Button type="button" class="btn1" label="Cancel" severity="secondary" @click="onClick"></Button>
        <Button type="button" label="Sign up" @click="onSignUp"></Button>
        <Button type="button" class="btn3" label="Login" @click="onSwitch" text></Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';

  const apiUrl = 'http://localhost:4231/api';
  const props = defineProps(['visible']);
  const emit = defineEmits(['close-modal', 'logined']);
  const username = ref('');
  const email = ref('');
  const pwd = ref('');
  const c_pwd = ref('');
  const toSignup = ref(false);

  function onClick() {
    emit('close-modal', false);
  }

  function onSubmit() {
    const body = {
      userEmail: email.value,
      password: pwd.value
    }
    axios.post(`${apiUrl}/login`, body)
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        emit('logined', true);
      }
    });

    email.value = '';
    pwd.value = '';
    emit('close-modal', false);
  }

  function onSignUp() {
    // axios.get(`${apiUrl}/checkExistByUsername/${username.value}`)
    // .then(res => console.log(res))

    const body = {
      name: username.value,
      userName: username.value,
      userEmail: email.value,
      password: pwd.value,
      userRole: 'user',
      age: 18,
      gender: 'male',
      phone: '1111111111',
    }
    axios.post(`${apiUrl}/register/createNewAccount`, body)
    .then(res => console.log(res));

    username.value = '';
    email.value = '';
    pwd.value = '';
    c_pwd.value = '';
    toSignup.value = !toSignup.value;
  }

  function onSwitch() {
    toSignup.value = !toSignup.value;
  }
</script>

<style scoped>
  .username, .email, .password, .c-password {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  .username-label, .email-label, .password-label, .c-password-label {
    margin-right: 10px;
  }

  .btn1 {
    margin-right: 10px;
  }

  .btn3 {
    margin-left: 100px;
  }
</style>