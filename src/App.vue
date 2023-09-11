<template>
  <div id="app">
    <router-link to="/">Account</router-link> |
    <router-link to="/subject">Subject</router-link> |
    <router-link to="/user">User</router-link>
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Subject from './components/SubjectComp.vue'
import {Cookie} from "@/cookie";
import {Account} from "@/account";
export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Subject
  },
  mounted() {
    if(Cookie.getCookie("uid")!=null&&Cookie.getCookie("uid").trim()!=""){
      Account._uid=Cookie.getCookie("uid");
      console.log(Account._uid);
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
  margin-top: 30px;
}
</style>
