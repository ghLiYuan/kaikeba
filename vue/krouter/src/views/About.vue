<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">{{ $store.state.counter }}</p>
    <ul>
      <li v-for="o in $store.getters.doneTodos" :key="o.id">{{ o.text }}</li>
    </ul>
  </div>
</template>
