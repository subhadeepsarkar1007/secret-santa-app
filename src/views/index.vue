<template>
  <div class="landing">
    <h1 class="mountains-of-christmas-bold">Welcome to</h1>
    <h1 class="main mountains-of-christmas-bold">Secret Santa!</h1>
    <big-button class="mountains-of-christmas-bold" @click="goToRegister">Register Participants</big-button>
  </div>
</template>

<script>
import BigButton from '../components/big-button'

export default {
  name: 'LandingPage',
  components: { BigButton },
  methods: {
    goToRegister() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;
}

h1 {
  margin: 0;
}

.main {
  font-size: 70px;
  margin-bottom: 50px;
}

@media (max-width: 600px) {
  .main {
    font-size: 60px;
  }
}
</style>
