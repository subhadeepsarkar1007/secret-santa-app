<template>
  <div class="results mountains-of-christmas-bold">
    <h1 class="header">Secret Santa Results</h1>
    <div class="card">
      <ul>
        <li v-for="(assignee, assigner) in assignments" :key="assigner">
          {{ assigner }} has to buy a gift for {{ assignee }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';

export default {
  name: 'ResultsPage',
  data() { return { assignments: null } },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "assignments"));
    querySnapshot.forEach((doc) => {
      this.assignments = doc.data()
    });
  }
};
</script>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 20px;
  text-align: center;
  padding: 0 20px;
}

.header {
  font-size: 40px
}

ul {
  padding: 0
}

ul li {
  list-style: none;
}

.card {
  max-width: 600px;
  margin: 20px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .card {
    margin: 10px;
    padding: 20px;
  }

  ul {
    padding: 0
  }

  .results {
    font-size: 14px;

  }
}
</style>
