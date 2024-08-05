<script setup>
  import Post from '../components/Home/Post.vue';
  import News from '../components/Home/News.vue';
</script>

<template>
  <header>
    <Post />
  </header>
  <main>
    <Suspense>
      <News />
      <template #fallback>
        <ProgressSpinner class="spinner" stroke-width="4"/>
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
  header {
    padding-bottom: 50px;
  }

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
  }
</style>
