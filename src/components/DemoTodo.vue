<template>
<div class="outer">
  <h2 class="title">{{ title }}</h2>
  <input type="text" @keydown.enter="addTodo" v-model="title">
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <input type="checkbox" v-model="todo.done">
      <span :class="todo.done ? 'done': ''">{{todo.title}}</span>
    </li>
  </ul>
  <div>
    {{ active }} / {{ all }}
  </div>
</div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

let title = ref('');
let todos = ref([{ title: '吃饭', done: false }, { title: '睡觉', done: true }])

function addTodo() {
  todos.value.push({
    title: title.value,
    done: false,
  })
  title.value = ''
}

const all = computed(() => todos.value.length);
const active = computed(() => {
  return todos.value.filter(v => !v.done).length;
})

</script>

<style scoped>
</style>
