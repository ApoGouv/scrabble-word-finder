<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue';
import Close from '@/icons/Close.vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'close'): void
}>();

const onClose = () => emit('close');

// Refs for DOM elements
const modal = ref<HTMLElement | null>(null);

// Function to handle keypress
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    onClose();
  }
};

// Focus management when modal opens
watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        modal.value?.focus();
      });
    }
  }
);

// Lifecycle Hooks to Add/Remove Event Listener
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <teleport to="body">
    <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200 transform"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
      <div
        ref="modal-backdrop"
        class="modal-backdrop fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-90"
        v-show="isVisible"
        @click="onClose"
      >
        <!-- Content Wrapper -->
        <transition
          enter-active-class="transition ease-out duration-300 transform "
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 scale-95"
        >
        <!-- max-w-6xl w-full -->
          <div
            class="modal-content-wrapper container bg-gray-900 rounded-lg text-left shadow-lg p-6 md:p-8 w-full max-w-[90vw] md:w-2/3 lg:w-1/2 relative"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="isVisible"
            aria-labelledby="modal-headline"
            tabindex="-1"
            @click.stop
          >
            <!-- Title Slot -->
            <header class="modal-title mb-4" id="modal-headline">
              <h2 class="text-2xl font-bold mb-4">
                <slot name="title"></slot>
              </h2>
            </header>

            <!-- Close Button -->
            <button
              @click="onClose"
              class="overlay-close absolute top-1 right-1 md:top-8 md:right-8 bg-red-600 text-white hover:bg-red-500 hover:text-white px-2 py-2 rounded-lg transition-all duration-200"
            >
              <Close />
            </button>

            <!-- Content Slot -->
            <div class="modal-content max-h-[75vh] overflow-y-auto px-2 md:px-4">
              <slot name="content"></slot>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>

</style>
