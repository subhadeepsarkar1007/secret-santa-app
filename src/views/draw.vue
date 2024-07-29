<template>
  <div class="draw mountains-of-christmas-bold">
    <h1 class="main">Secret Santa Draw</h1>
    <big-button class="mountains-of-christmas-bold" @click="drawNames">Draw Names</big-button>
  </div>
</template>

<script>
import BigButton from '../components/big-button';
import { collection, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: 'DrawPage',
  data() {
    return {
      participants: [],
      assignments: null,
    };
  },
  mounted() {
    onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const tempUsers = [];
      querySnapshot.forEach((doc) => {
        const user = { id: doc.id, name: doc.data().name, email: doc.data().email }
        tempUsers.push(user)
      });
      this.participants = tempUsers
    });
  },
  components: { BigButton },
  methods: {
    drawNames() {
      if (this.participants.length < 2) {
        alert('At least 2 participants are required for a draw!');
        return;
      }

      const participantsCopy = [...this.participants];
      let shuffledParticipants = this.shuffleArray(participantsCopy);
      let assignments = {};

      for (let i = 0; i < shuffledParticipants.length; i++) {
        let assigner = shuffledParticipants[i];
        let assignee = shuffledParticipants[(i + 1) % shuffledParticipants.length];

        if (assigner.name === assignee.name) {
          shuffledParticipants = this.shuffleArray(participantsCopy);
          i = -1;
          assignments = {};
          continue;
        }

        assignments[assigner.name] = assignee.name;
      }

      this.assignments = assignments;
      this.storeAssignments()
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    storeAssignments() {
      setDoc(doc(db, "assignments", "G2hW0btcTZtOA4uqtY21"), this.assignments);
      this.$router.push({ name: 'results' });
    },
  },
};
</script>

<style scoped>
.draw {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  margin: 0;
}

.main {
  font-size: 50px;
  margin-bottom: 50px;
}

@media (max-width: 600px) {
  .main {
    font-size: 40px;
  }
}
</style>
