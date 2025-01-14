<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue";
import InfoIcon from '@/icons/Info.vue';
import GithubIcon from "@/icons/Github.vue";
import EdXIcon from "@/icons/EdX.vue";
import LocationIcon from "@/icons/Location.vue";
import CalendarIcon from "@/icons/Calendar.vue";
import DeveloperIcon from "@/icons/Developer.vue";

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
    <template #title>
      <InfoIcon class="w-5 h-5 inline-block mr-1"/>
      <span class="text-orange-400 font-semibold text-lg">
        Project Information
      </span>
    </template>
    <template #content>
      <section class="space-y-6">
        <!-- Project Title -->
        <div class="flex items-center gap-4">
          <img
            src="/swf-icon.png"
            alt="Project Icon"
            class="w-10 h-10"
          />
          <div>
            <p class="text-gray-100 font-semibold text-lg">Scrabble Word Finder</p>
          </div>
        </div>

        <!-- Developer Info -->
        <div class="space-y-4">
          <!-- Developer -->
          <div class="flex items-center gap-3">
            <DeveloperIcon class="w-6 h-6 text-gray-400" />
            <p class="text-gray-100 font-medium">
              <span class="font-bold">Developed by</span> Apostolos Gouvalas
            </p>
          </div>

          <!-- Usernames -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- GitHub Username -->
            <div class="flex items-center gap-3">
              <GithubIcon class="w-6 h-6 text-gray-400" />
              <p class="text-gray-400">
                <span class="text-gray-100 font-medium">GitHub:</span> ApoGouv
              </p>
            </div>

            <!-- edX Username -->
            <div class="flex items-center gap-3">
              <EdXIcon class="w-6 h-6 text-blue-400" />
              <p class="text-gray-400">
                <span class="text-gray-100 font-medium">edX:</span> ApoGouv
              </p>
            </div>
          </div>
        </div>

        <!-- Location and Date -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <!-- Location -->
          <div class="flex items-center gap-3">
            <LocationIcon class="w-6 h-6 text-red-400" />
            <p class="text-gray-400">
              <span class="text-gray-100 font-medium">Location:</span> Thessaloniki, Greece
            </p>
          </div>

          <!-- Date -->
          <div class="flex items-center gap-3">
            <CalendarIcon class="w-6 h-6 text-yellow-400" />
            <p class="text-gray-400">
              <span class="text-gray-100 font-medium">Date:</span> 2025-01-13
            </p>
          </div>
        </div>

        <!-- Footer -->
        <p class="text-center text-gray-400 text-sm mt-8">
          This is my CS50x final project submission.
        </p>
      </section>
    </template>
  </ModalDialog>
</template>
