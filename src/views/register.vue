<template>
  <div class="registration">
    <h2 class="header mountains-of-christmas-bold">Register Participants</h2>
    <div>
      <div class="input-group">
        <div>
          <input type="text" v-model="currentParticipant.name" @blur="validateParticipant('name')"
            placeholder="Enter participant name" required />
          <div v-show="errors?.name">{{ errors?.name }}</div>
        </div>
        <div>
          <input type="email" v-model="currentParticipant.email" @blur="validateParticipant('email')"
            placeholder="Enter participant email" required />
          <div v-show="errors?.email">{{ errors?.email }}</div>
        </div>
      </div>
      <button type="button" @click="addParticipant" :disabled="!canAddParticipant" class="btn">Add Participant</button>
      <div class="submit-container" v-if="!participants.length">
        <p>Add Participants</p>
      </div>
      <div v-else>
        <div v-for="(participant, index) in participants" :key="index" class="participant">
          <ul>
            <li>
              {{ participant.name }} ({{ participant.email }})
              <button class="remove-btn" type="button" @click="removeParticipant(participant.id)">x</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="submit-container">
        <big-button class="mountains-of-christmas-bold" :disabled="!canSubmit" @click="submit">Submit</big-button>
      </div>
    </div>
  </div>
</template>

<script>
import BigButton from '../components/big-button'
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: 'RegisterPage',
  data() {
    return {
      currentParticipant: { name: '', email: '' },
      participants: [],
      errors: {},
    };
  },
  components: { BigButton },
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
  computed: {
    canAddParticipant() {
      return this.currentParticipant.name.length >= 2 &&
        this.isAlphanumericWithSpaces(this.currentParticipant.name) &&
        this.validateEmail(this.currentParticipant.email);
    },
    canSubmit() {
      return this.participants.length;
    }
  },
  methods: {
    addParticipant() {
      if (this.canAddParticipant && !this.participantExists()) {
        addDoc(collection(db, "users"), {
          name: this.capitalizeWords(this.currentParticipant.name),
          email: this.currentParticipant.email.toLowerCase()
        });
        this.currentParticipant = { name: '', email: '' };
      }
    },
    participantExists() {
      const nameExists = this.participants.some(p => p.name.toLowerCase() === this.currentParticipant.name.toLowerCase());
      const emailExists = this.participants.some(p => p.email.toLowerCase() === this.currentParticipant.email.toLowerCase());

      if (nameExists) {
        this.errors.name = 'This name is already registered';
      }

      if (emailExists) {
        this.errors.email = 'This email is already registered';
      }

      return nameExists || emailExists;
    },
    capitalizeWords(str) {
      return str
        .split(' ')
        .map(word =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');
    },
    removeParticipant(id) {
      deleteDoc(doc(db, "users", id));
    },
    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    isAlphanumericWithSpaces(str) {
      const pattern = /^[a-zA-Z0-9 ]+$/;
      return pattern.test(str);
    },
    validateParticipant(val) {
      if (val === 'name') {
        if (this.currentParticipant.name.length < 2) {
          this.errors.name = 'Name must be at least 2 characters long';
        } else if (!this.isAlphanumericWithSpaces(this.currentParticipant.name)) {
          this.errors.name = 'Name can only contain letters, numbers, and spaces';
        } else {
          this.errors.name = '';
        }
      } else if (val === 'email') {
        if (!this.validateEmail(this.currentParticipant.email)) {
          this.errors.email = 'Please enter a valid email address';
        } else {
          this.errors.email = '';
        }
      }
    },
    submit() {
      this.$router.push({ name: 'draw' });
    },
  },
};
</script>


<style scoped>
.registration {
  max-width: 600px;
  margin: 70px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 10px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 5px;
  justify-content: center;
}

.participant {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  width: 100%
}

.input-group {
  display: flex;
  margin-bottom: 10px;
}

.input-group div {
  flex: 1;
  justify-content: space-between
}

.input-group input {
  width: 95%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

ul {
  margin: 0;
  margin-bottom: 10px;
  padding: 0px;
  width: 100%
}

ul li {
  list-style: none;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  margin: 0px;
}

li {
  display: flex;
  background: #edeef0;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
}

.input-group div {
  color: red;
  font-size: 0.8em;
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

.btn[disabled] {
  background-color: lightgray;
  cursor: not-allowed;
}

.remove-btn {
  border-radius: 50%;
  background-color: transparent;
  color: red;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
}

.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

@media (max-width: 600px) {
  .registration {
    margin: 70px 10px;
    padding: 20px;
  }

  .header {
    font-size: 1.2em;
  }

  .input-group {
    flex-direction: column;
  }

  .input-group div {
    margin: 5px 0;
  }

  .btn {
    width: 50%;
    display: flex;
    justify-content: center;
  }

  ul li {
    font-size: 16px;
    text-align: center;
    justify-content: center;
    width: 94%
  }

  .submit-container {
    margin-top: 10px;
  }
}
</style>
