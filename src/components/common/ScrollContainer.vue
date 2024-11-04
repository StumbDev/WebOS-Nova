<template>
  <div 
    class="scroll-container"
    :class="{
      'custom-scrollbar': customScrollbar,
      'hide-scrollbar': hideScrollbar,
      'smooth-scroll': smoothScroll
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  customScrollbar?: boolean
  hideScrollbar?: boolean
  smoothScroll?: boolean
}>()
</script>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &.smooth-scroll {
    scroll-behavior: smooth;
  }

  &.hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: var(--scrollbar-track);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb);
      border-radius: 4px;
      
      &:hover {
        background: var(--scrollbar-thumb-hover);
      }
    }
  }
}
</style> 