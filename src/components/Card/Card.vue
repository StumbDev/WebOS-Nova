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
.card {
  background: var(--surface-color);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px); // Account for padding and StatusBar
  
  &.dragging {
    opacity: 0.8;
  }

  .card-header {
    padding: 15px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    
    h3 {
      margin: 0;
      font-size: 1.1em;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5em;
      cursor: pointer;
      opacity: 0.7;
      
      &:hover {
        opacity: 1;
      }
    }
  }

  .card-content {
    flex: 1;
    overflow: hidden;
    position: relative;
  }
}

// Responsive adjustments
@media (max-width: $mobile) {
  .card {
    height: calc(100vh - 120px);
  }
}
</style> 