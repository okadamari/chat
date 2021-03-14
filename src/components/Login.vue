<template>
  <div class="signin">
    <table>
        <tr>
          <th>メールアドレス：</th>
        </tr>
        <tr>
          <td><input type="email" v-model="mailaddress"/></td>
        </tr>
        <tr>
          <th>パスワード：</th>
        </tr>
        <tr>
          <td><input type="password" v-model="password"/></td>
        </tr>
      </table>
      <button @click="login">ログイン</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.mailaddress, this.password)
        .then(() => {
          // Signed in
          this.$router.replace(this.$route.query.redirect || '/chat')
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert('ログインに失敗しました')
          console.log( errorCode)
          console.log( errorMessage)
        });
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
