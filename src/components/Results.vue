<script setup lang="ts">
const props = defineProps<{
  results: {
    mode: 'validate' | 'searchAnagram';
    data: any;
  } | null;
}>();
</script>

<template>
  <div id="results-wrapper" class="results bg-gray-800 text-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-100 mb-4">Results</h2>

    <!-- Handle validation mode -->
    <template v-if="results?.mode === 'validate'">
      <div 
        v-if="results.data.message === 'ΑΠΟΔΕΚΤΗ ΛΕΞΗ'" 
        class="bg-green-100 p-4 rounded-lg shadow-md border border-green-300"
      >
        <p class="text-green-700 font-semibold text-lg">{{ results.data.word }}: {{ results.data.message }}</p>

        <!-- Display extra details only if at least one field is meaningful -->
        <div 
          v-if="
            results.data.details && 
            (
              results.data.details.lemma !== '-' || 
              results.data.details.dictionary !== '-' || 
              results.data.details.comments !== '-'
            )" 
          class="mt-4"
        >
            <p class="text-gray-700">
                <strong>Λήμμα:</strong> {{ results.data.details.lemma }}
            </p>
            <p class="text-gray-700">
                <strong>Λεξικό:</strong> {{ results.data.details.dictionary }}
            </p>
            <p class="text-gray-700">
                <strong>Παρατήρηση:</strong> {{ results.data.details.comments }}
            </p>
        </div>

        <!-- Always display length and points if available -->
        <div v-if="results.data.details?.length || results.data.details?.points" class="mt-4">
          <p v-if="results.data.details.length" class="text-gray-700">
            <strong>Μήκος:</strong> {{ results.data.details.length }}
          </p>
          <p v-if="results.data.details.points" class="text-gray-700">
            <strong>Πόντοι:</strong> {{ results.data.details.points }}
          </p>
        </div>
      </div>

      <p v-else class="text-red-500 italic">{{ results.data.word }}: {{ results.data.message }}</p>
    </template>

    <!-- Handle searchAnagram mode -->
    <template v-else-if="results?.mode === 'searchAnagram'">
      <div v-if="Object.keys(results.data).length" class="mt-6">
        <ul v-for="(words, length) in results.data" :key="length" class="anagrams-list">
          <li :class="`anagrams-list-item ${length}`"
            class="bg-gray-100 p-4 rounded-md shadow-md border border-gray-300">
            <div class="words-length text-lg font-semibold text-gray-700 block mb-2">
              Length {{ String(length).replace('length_', '') }}:
            </div>
            <div 
              class="word-list flex flex-wrap gap-2">
              <span 
                v-for="word in words" 
                :key="word" 
                class="word bg-blue-100 text-blue-700 px-3 py-1 rounded-sm font-medium">
                {{ word }}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <p v-else class="text-red-500 italic">No results found.</p>
    </template>

    <p v-else class="text-gray-500 italic">No results to display.</p>
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
</style>

