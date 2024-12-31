<script setup lang="ts">
const props = defineProps<{
  results: {
    mode: 'validate' | 'searchAnagram';
    data: any;
  } | null;
}>();
</script>

<template>
  <div class="results">
    <h2>Results</h2>

    <!-- Handle validation mode -->
    <template v-if="results?.mode === 'validate'">
      <div v-if="results.data.message === 'ΑΠΟΔΕΚΤΗ ΛΕΞΗ'">
        <p>{{ results.data.message }}</p>
        <p v-if="results.data.details">
          Λήμμα: {{ results.data.details.lemma }}<br />
          Λεξικό: {{ results.data.details.dictionary }}<br />
          Παρατήρηση: {{ results.data.details.comments }}
        </p>
        <p>
          Μήκος: {{ results.data.details.length }}<br />
          Πόντοι: {{ results.data.details.points }}
        </p>
      </div>
      <p v-else>{{ results.data.message }}</p>
    </template>

    <!-- Handle searchAnagram mode -->
    <template v-else-if="results?.mode === 'searchAnagram'">
      <div v-if="Object.keys(results.data).length">
        <ul v-for="(words, length) in results.data" :key="length">
          <li>
            <strong>Length {{ length }}:</strong>
            <span v-for="word in words" :key="word" class="word">{{ word }}</span>
          </li>
        </ul>
      </div>
      <p v-else>No results found.</p>
    </template>

    <p v-else>No results to display.</p>
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
  margin: 10px 0;
}
.word {
  display: inline-block;
  margin-right: 10px;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 4px;
}
</style>

