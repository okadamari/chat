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
