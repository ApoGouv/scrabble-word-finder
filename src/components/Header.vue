<script setup lang="ts">
  import HelpIcon from '@/icons/Help.vue';
</script>

<template>
  <!-- ====== Navbar Section Start -->
  <nav class="bg-teal-600 text-white shadow-md sticky top-0 w-full z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between lg:min-h-80">
      <!-- App Title -->
      <a href="#" class="text-lg font-bold text-white tracking-wide hover:text-teal-200">
        Scrabble Word Finder
      </a>
      
      <!-- How to Use Button -->
      <button
        @click="$emit('show-how-to-use-modal', true)"
        class="text-sm font-medium bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-md transition duration-200 shadow-sm"
      >
        <HelpIcon class="w-5 h-5 inline-block mr-1" />
        <span class="hidden md:inline">
          How to Use
        </span>
      </button>

      <!-- Horizontal Line for larger screens -->
      <hr class="hidden lg:block border-l border-teal-500 opacity-20 h-6 mx-3" />
    </div>
  </nav>
</template>