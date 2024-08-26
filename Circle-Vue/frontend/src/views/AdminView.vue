<template>
  <div class="admin">
    <DataTable :value="users" removableSort paginator :rows="30" stripedRows>
      <Column field="_id" sortable header="ID"></Column>
      <Column field="userName" sortable header="Username"></Column>
      <Column field="userEmail" sortable header="Email"></Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="phone" header="PhoneNum"></Column>
      <Column>
        <template #body="slotProps">
          <Button type="button" label="Remove" severity="danger" icon="pi pi-trash" iconPos="right" text></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';

  const apiUrl = 'http://localhost:4231/api/users';
  const users = ref([]);

  axios.get(`${apiUrl}/getAllUsers`)
  .then(res => {
    // console.log(res.data);
    users.value = [...res.data];
  })

</script>

<style scoped>
  .admin {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>