<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import DemoTodo from './components/DemoTodo.vue'
</script>

<template>
<!--  <img alt="Vue logo" src="./assets/logo.png" />-->
<!--  <DemoTodo />-->
<!--  <router-link to="/">首页</router-link>-->
<!--  <router-link to="/add">新增</router-link>-->
  <router-view></router-view>
</template>

<style>
html, body {
  padding: 0;
  margin: 0;
}
ul,li {
  padding: 0;
  margin: 0;
  list-style: none;
}
p, h1, h2, h3, h4 {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
