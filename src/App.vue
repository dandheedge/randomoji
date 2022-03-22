<script setup>
import Home from "./components/Home.vue";
</script>

<!-- Parent.vue -->
<template>
  <Suspense>
    <template #default>
      <Home />
    </template>
    <template #fallback>
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full shadow-md bg-gray-400 h-16 w-16"></div>
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-gray-400 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-400 rounded"></div>
            <div class="h-4 bg-gray-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </template>
  </Suspense>
</template>


<style>
html,
body {
  font-family: "Rubik", sans-serif;
}
* {
  margin: 0;
  padding: 0;
  border: 0;
}

html,
body {
  height: 100%;
}
body {
  background-color: rgb(244 244 245);
}
</style>

