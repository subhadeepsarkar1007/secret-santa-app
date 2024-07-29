<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&family=Mountains+of+Christmas:wght@400;700&family=Yesteryear&display=swap');

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #edf4f3;
  background: url('@/assets/snow.png') no-repeat center center fixed;
  background-size: cover
}

.mountains-of-christmas-bold {
  font-family: "Mountains of Christmas", serif;
  font-weight: 700;
  font-style: normal;
}

@media (max-width: 600px) {
  body {
    background: url('@/assets/tree.png') no-repeat bottom center fixed;
    background-size: cover
  }
}
</style>
