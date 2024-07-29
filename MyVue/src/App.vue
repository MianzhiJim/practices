<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
import { ref } from 'vue';

const router = useRouter();
const barItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => { router.push('/') }
  },
  {
    label: 'About',
    icon: 'pi pi-about',
    command: () => { router.push('/about') }
  },
]);
const input = ref('');
const suggestions = ref([]);
const albums = ref([]);

const autoComplete = async () => {
  await fetch(`https://itunes.apple.com/search?term=${input.value}&media=music&entity=album&attribute=artistTerm&limit=50`)
  .then(res => res.json())
  .then(data => {
    const nameList = [];
    data.results.forEach(ele => {
      nameList.push(ele.artistName);
    });
    suggestions.value = [...nameList];
    // console.log(suggestions.value);
  });
}

const search = async () => {
  // console.log(input.value)
  await fetch(`https://itunes.apple.com/search?term=${input.value}&media=music&entity=album&attribute=artistTerm&limit=50`)
  .then(res => res.json())
  .then(data => {
    albums.value = [...data.results];
    // console.log(albums.value);
  });
}

</script>

<template>
  <div class="wrapper">
    <Menubar :model="barItems">
      <template #end>
        <div class="card flex justify-center">
          <AutoComplete class="search" placeholder="Search" v-model="input" :suggestions="suggestions" @complete="autoComplete" />
          <Button type="button" label="Search" @click="search"></Button>
        </div>
      </template>
    </Menubar>
  </div>

  <RouterView :albums="albums" />
</template>

<style scoped>

  .wrapper {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .search {
    margin-right: 10px;
  }
</style>