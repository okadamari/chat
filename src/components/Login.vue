<template>
  <h1>ログイン</h1>
  <form class="signin" onsubmit="return false">
    <table>
        <tr>
          <th><label for="email">メールアドレス</label></th>
        </tr>
        <tr>
          <td><input type="email" id="email" name="email" autocomplete="email" v-model="mailaddress" /></td>
        </tr>
        <tr>
          <th><label for="password">パスワード</label></th>
        </tr>
        <tr>
          <td><input type="password" id="password" name="password" autocomplete="current-password" v-model="password" /></td>
        </tr>
      </table>
      <button @click="login">ログイン</button>
  </form>
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
