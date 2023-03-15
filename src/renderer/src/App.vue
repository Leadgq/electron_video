<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['video']">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts"></script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
