<template>
  <div 
    class="card"
    :class="{ dragging }"
    draggable
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="card-header">
      <h3>{{ title }}</h3>
      <button @click="$emit('close')" class="close-btn">×</button>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
  appId: string
  title: string
}>()

defineEmits<{
  (e: 'close'): void
}>()

const dragging = ref(false)

const handleDragStart = () => {
  dragging.value = true
}

const handleDragEnd = (e: DragEvent) => {
  dragging.value = false
  if (e.clientY > window.innerHeight * 0.8) {
    emit('close')
  }
}
</script>

<style lang="scss" scoped>
// Same CSS as before
</style> 