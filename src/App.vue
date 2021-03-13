<template>
  <div id="app">
    <label>名前</label>
    <input type="text" v-model="userName" />

    <label>メッセージ</label>
    <input type="text" v-model="message" />
    <button @click="sendMessage">送信</button>
    <ul>
      <li v-for="(value, key, index) in messageList" v-bind:key="index">
        {{ value.user_name }}
        <span style="margin-left:100px;">{{ value.message}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
let messageRef

export default {
  name: 'app',
  data() {
    return {
      messageList: [],
      userName: 'ユーザーA',
      message: 'テストメッセージです'
    };
  },
  created: function() {
    var firebaseConfig = {
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: process.env.VUE_APP_AUTH_DOMAIN,
      projectId: process.env.VUE_APP_PROJECT_ID,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_APP_ID,
      measurementId: process.env.VUE_APP_MEASUREMENT_ID,
    };

    console.log(firebaseConfig);
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore()
    messageRef = db.collection("chat_messages")

    let messageList = this.messageList
    messageRef.orderBy('created', 'desc').onSnapshot(function(qs) {
      messageList.length = 0;
      qs.forEach(result => {
        messageList.push(result.data())
      })
    });
  },
  methods: {
    sendMessage: function() {
      messageRef.add(
        {
          user_name: this.userName,
          message: this.message,
          created: new Date().getTime()
        }
      )
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
