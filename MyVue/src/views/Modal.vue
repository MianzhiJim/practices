<template>
  <div class="modal">
    <div class="modal-content">
      <slot></slot>
      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script setup>
defineProps(['close']);
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
}
</style>
