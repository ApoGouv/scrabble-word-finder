<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue";
import PythonIcon from "@/icons/Python.vue";
import ViteIcon from "@/icons/Vite.vue";
import VuejsIcon from "@/icons/Vuejs.vue";
import TypescriptIcon from "@/icons/Typescript.vue";
import TailwindCSSIcon from "@/icons/TailwindCSS.vue";
import NpmIcon from "@/icons/Npm.vue";

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const onClose = () => emit("close");
</script>

<template>
  <ModalDialog :isVisible="isVisible" @close="onClose">
    <template #title> About This App </template>
    <template #content>
      <!-- About Section -->
      <section class="mb-6">
        <p class="text-gray-300">
          Scrabble Word Finder is an app designed to enhance your Greek Scrabble
          experience. It helps you:
        </p>
        <ul class="list-disc pl-5 mt-2 space-y-2 text-gray-300">
          <li>
            Validate words based on the Greek competitive Scrabble-approved
            dictionary.
          </li>
          <li>Find anagrams using your selected letters.</li>
        </ul>

        <p class="mt-4 text-gray-300">
          This app was developed by
          <span class="text-orange-500 font-semibold">Apostolos Gouvalas</span>
          as part of the final project for the
          <span class="text-orange-500 font-semibold">CS50x</span> course.
        </p>
      </section>

      <!-- Technologies Section -->
      <section class="mb-6">
        <h3 class="text-lg font-semibold text-gray-300">
          Technologies and Packages Used
        </h3>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-gray-300">
          <li class="flex items-center space-x-3">
            <PythonIcon customClass="w-8 h-8" />
            <a
              href="https://www.python.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="Python - Used for data extraction and preprocessing."
              >Python</a
            >
          </li>
          <li class="flex items-center space-x-3">
            <ViteIcon customClass="w-8 h-8" />
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="Vite - A fast build tool for modern web development."
              >Vite</a
            >
          </li>
          <li class="flex items-center space-x-3">
            <VuejsIcon customClass="w-8 h-8" />
            <a
              href="https://vuejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="Vue.js - JavaScript framework for building the app's UI."
              >Vue.js</a
            >
          </li>
          <li class="flex items-center space-x-3">
            <TypescriptIcon customClass="w-8 h-8" />
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="TypeScript - Enhances JavaScript with static typing."
              >TypeScript</a
            >
          </li>
          <li class="flex items-center space-x-3">
            <TailwindCSSIcon customClass="w-8 h-8" />
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="Tailwind CSS - Utility-first CSS framework for styling."
              >Tailwind CSS</a
            >
          </li>
        </ul>
      </section>

      <!-- NPM Packages Section -->
      <section class="mb-6">
        <h3 class="text-lg font-semibold text-gray-300">npm Packages</h3>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-gray-300">
          <li class="flex items-center space-x-3">
            <NpmIcon customClass="w-8 h-8" />
            <a
              href="https://github.com/Maronato/vue-toastification"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="vue-toastification - Used for toast notifications."
            >
              vue-toastification
            </a>
          </li>
          <li class="flex items-center space-x-3">
            <NpmIcon customClass="w-8 h-8" />
            <a
              href="https://github.com/tschaub/gh-pages"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="gh-pages - Deploys the app to GitHub Pages."
            >
              gh-pages
            </a>
          </li>
        </ul>
      </section>

      <!-- Credits Section -->
      <section class="mb-6">
        <h3 class="text-lg font-semibold text-gray-300">Credits</h3>
        <ul class="list-disc pl-5 mt-2 space-y-2 text-gray-300">
          <li>
            The word data follows the official Greek competitive Scrabble word
            acceptance rules as outlined by the
            <a
              href="http://greekscrabble.gr"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="Πανελλήνια Ένωση Σκραμπλ (Π.Ε.Σ.)"
            >
              Panhellenic Scrabble Union (PES) - www.greekscrabble.gr </a
            >.
          </li>
          <li>
            Dictionaries used in Python preprocessing:
            <ul class="list-disc pl-5 mt-2 text-gray-300">
              <li>
                <a
                  href="http://greekscrabble.gr/wp-content/uploads/2024/08/2-8-2024_09_01.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-orange-500 underline"
                >
                  Αποδεκτές Λέξεις 2-8 Γραμμάτων (1/9/2024)
                </a>
              </li>
              <li>
                <a
                  href="http://greekscrabble.gr/wp-content/uploads/2020/02/krymmenes30.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-orange-500 underline"
                >
                  Κρυμμένες Λέξεις, 30ή έκδοση, Φεβρουάριος 2020
                </a>
              </li>
            </ul>
          </li>
          <li>
            SVG icons sourced from
            <a
              href="https://icones.js.org/"
              target="_blank"
              class="text-orange-500 underline"
              >icones.js.org</a
            >
            with custom icon components.
          </li>
          <li>
            Special thanks to
            <span class="text-orange-500 font-semibold">ChatGPT</span> for being
            available 24/7, answering all development questions—even the weird
            ones!
          </li>
        </ul>
      </section>

      <!-- Trademark Section -->
      <section class="mb-6">
        <h3 class="text-lg font-semibold text-gray-300">Trademark Notice</h3>
        <p class="text-gray-300">
          Scrabble &trade; (σκραμπλ) is a product and registered trademark of
          <span class="text-orange-500 font-semibold">Mattel Inc.</span>,
          distributed in the Greek market by
          <span class="text-orange-500 font-semibold">Mattel ΑΕΒΕ</span>.
        </p>
      </section>
    </template>
  </ModalDialog>
</template>
