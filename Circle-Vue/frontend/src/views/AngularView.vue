<template>
  <calendar-ele></calendar-ele>
</template>

<script setup>
  const script = document.createElement('script');
  script.type = "module";
  script.src = "src/assets/calendar.js";
  script.onload = () => {
    console.log("angular element loaded");
  };
  document.body.appendChild(script);
</script>