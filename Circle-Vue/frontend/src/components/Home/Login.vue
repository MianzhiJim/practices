<template>
  <Dialog v-if="!toSignup" v-model:visible="props.visible" modal header="Login" :closable="false">
    <div class="container">
      <div class="email">
        <label for="email" class="email-label">Email</label>
        <InputText id="email" v-model="email" autocomplete="off" />
      </div>
      <div class="password">
        <label for="password" class="password-label">Password</label>
        <InputText id="password" type="password" v-model="pwd" autocomplete="off" />
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
        <InputText id="username" v-model="username" :invalid="existName" autocomplete="off" />
        <small v-if="existName">Username already exists</small>
      </div>
      <div class="email">
        <label for="email" class="email-label">Email</label>
        <InputText id="email" v-model="email" :invalid="existEmail" autocomplete="off" />
        <small v-if="existEmail">Email already exists</small>
      </div>
      <div class="password">
        <label for="password" class="password-label">Password</label>
        <InputText id="password" type="password" v-model="pwd" autocomplete="off" />
      </div>
      <div class="c-password">
        <label for="c-password" class="c-password-label">Confirm Password</label>
        <InputText id="c-password" type="password" :invalid="notSame" v-model="c_pwd" autocomplete="off" />
        <small v-if="notSame">Password not correct</small>
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
  // const emptyName = ref(false);
  // const emptyEmail = ref(false);
  // const emptyPwd = ref(false);
  // const emptyCpwd = ref(false);
  const existName = ref(false);
  const existEmail = ref(false);
  const notSame = ref(false);

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
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        // console.log(localStorage.getItem('userInfo'))
      }
    });

    email.value = '';
    pwd.value = '';
    emit('close-modal', false);
  }

  async function onSignUp() {
    // axios.get(`${apiUrl}/checkExistByUsername/${username.value}`)
    // .then(res => console.log(res))

    if (username.value !== '') {
      const checkName = await axios.get(`${apiUrl}/register/checkExistByUsername/${username.value}`);
      if (checkName.data) {
        existName.value = true;
      }
      else {
        existName.value = false;
      }
    }
    if (email.value !== '') {
      const checkEmail = await axios.get(`${apiUrl}/register/checkExistByEmail/${email.value}`);
      // console.log(checkEmail.data)
      if (checkEmail.data) {
        existEmail.value = true;
      }
      else {
        existEmail.value = false;
      }
    }

    if (pwd.value !== c_pwd.value) {
      notSame.value = true;
    }
    else {
      notSame.value = false;
    }

    if (!existName.value && !existEmail.value && !notSame.value && username.value && email.value && pwd.value) {
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
  }

  function onSwitch() {
    toSignup.value = !toSignup.value;
    username.value = '';
    email.value = '';
    pwd.value = '';
    c_pwd.value = '';
  }
</script>

<style scoped>
  .username, .email, .password, .c-password {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    margin-bottom: 10px;
  }

  small {
    color: red;
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