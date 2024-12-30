<script setup lang="ts">
const props = defineProps<{
  results: string[];
}>();
</script>

<template>
  <div class="results">
    <h2>Results</h2>
    <ul v-if="results.length">
      <li v-for="(result, index) in results" :key="index">
        {{ result }}
      </li>
    </ul>
    <p v-else>No results found.</p>
  </div>
</template>

<style scoped>
.results {
  margin-top: 20px;
}
h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 5px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
