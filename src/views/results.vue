<template>
  <div class="results mountains-of-christmas-bold">
    <h1 class="header">Secret Santa Results</h1>
    <div class="card">
      <div class="input-group">
        <div>
          <input type="text" v-model="name" placeholder="Your name" required @keypress.enter="viewResult" />
        </div>
      </div>
      <button type="button" @click="viewResult" class="btn">View Results</button>
      <ul v-if="result && result.length === 1">
        <li>
          {{ result[0].assigner }} has to buy a gift for {{ result[0].assignee }}
        </li>
      </ul>
      <p v-else-if="result && result.length !== 1">No results found.</p>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';

export default {
  name: 'ResultsPage',
  data() {
    return {
      name: '',
      assignments: [],
      result: null,
    };
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "assignments"));
    const assignments = [];
    querySnapshot.forEach((doc) => {
      assignments.push(doc.data());
    });
    this.assignments = assignments;
  },
  methods: {
    viewResult() {
      const nameLowerCase = this.name.toLowerCase();
      const filteredResults = this.assignments.flatMap((assignment) =>
        Object.keys(assignment)
          .filter((key) => key.toLowerCase().includes(nameLowerCase))
          .map((key) => ({ assigner: key, assignee: assignment[key] }))
      );

      this.result = filteredResults.length === 1 ? filteredResults : null;
    },
  },
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
  font-size: 40px;
}

ul {
  padding: 0;
}

ul li {
  list-style: none;
}

.card {
  width: 250px;
  margin: 20px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 10px;
}

.input-group {
  margin-bottom: 10px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 10px 0 20px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #45a049;
}

@media (max-width: 600px) {
  .card {
    margin: 10px;
    padding: 20px;
  }

  ul {
    padding: 0;
  }

  .results {
    font-size: 14px;
  }
}
</style>
