<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue";
import PythonIcon from "@/icons/Python.vue";
import ViteIcon from "@/icons/Vite.vue";
import VuejsIcon from "@/icons/Vuejs.vue";
import TypescriptIcon from "@/icons/Typescript.vue";
import TailwindCSSIcon from "@/icons/TailwindCSS.vue";
import NpmIcon from "@/icons/Npm.vue";
import IndexedDBIcon from "@/icons/IndexedDB.vue";
import GithubIcon from "@/icons/Github.vue";
import OpenAIChatGPTIcon from "@/icons/OpenAIChatGPT.vue";


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

      <!-- Technologies and Tools Section -->
      <section class="mb-6">
        <h3 class="text-lg font-semibold text-gray-300">
          Technologies and Tools
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
          <li class="flex items-center space-x-3">
            <IndexedDBIcon customClass="w-8 h-8" />
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="IndexedDB - For storing JSON data locally after the first request."
              >IndexedDB</a
            >
          </li>
          <!-- NPM Packages -->
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

          <!-- GitHub Repository -->
          <li class="flex items-center space-x-3">
            <GithubIcon customClass="w-8 h-8" />
            <a
              href="https://github.com/tholman/github-corners"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="GitHub Corners - Used for the 'Fork me on GitHub' corner graphic, providing a modern and lightweight SVG solution."
            >
              GitHub Corners
            </a>
          </li>

          <!-- OpenAI ChatGPT -->
          <li class="flex items-center space-x-3">
            <OpenAIChatGPTIcon customClass="w-8 h-8" />
            <a
              href="https://openai.com/chatgpt"
              target="_blank"
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="ChatGPT by OpenAI - For providing after-hours support with helpful insights and suggestions during the development of this app. Although it required corrections and guidance at times, its contributions were invaluable to the process."
            >
              ChatGPT
            </a>
          </li>
        </ul>
      </section>

      <!-- Resources Section -->
      <section class="mb-6">
        <h3 class="text-lg font-semibold text-gray-300">Resources</h3>
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
                  title="Αποδεκτές Λέξεις 2-8 Γραμμάτων (1/9/2024)"
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
                  title="Κρυμμένες Λέξεις, 30ή έκδοση, Φεβρουάριος 2020"
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
              rel="noopener noreferrer"
              class="text-orange-500 underline"
              title="Icônes, an Icon Explorer with Instant searching built by @antfu, powered by Iconify"
            >
              Icônes
            </a>
             with custom icon components.
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

      <!-- Contact or Feedback Section -->
      <section class="mb-6">
        <h3 class="text-lg font-semibold text-gray-300">Contact or Feedback</h3>
        <p class="text-gray-300">
          Your fedback is valuable! Visit our 
          <a
            href="https://github.com/ApoGouv/scrabble-word-finder"
            target="_blank"
            rel="noopener noreferrer"
            class="text-orange-500 underline"
            title="Scrabble Word Finder GitHub Repository"
          >
            GitHub repository
          </a> 
          to submit feedback or report issues.
        </p>
      </section>
    </template>
  </ModalDialog>
</template>
