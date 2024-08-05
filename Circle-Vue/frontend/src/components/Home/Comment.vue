<script setup>
  import { ref } from 'vue';

  const props = defineProps(['visible']);
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <slot></slot>
      <button @click="$emit('visible')">Close</button>
    </div>
  </div>
</template>