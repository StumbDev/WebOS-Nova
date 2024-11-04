<template>
  <button 
    class="toggle-control"
    :class="{ active: modelValue }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <div class="toggle-slider" />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style lang="scss" scoped>
.toggle-control {
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 2px;

  &.active {
    background: var(--primary-color);
    
    .toggle-slider {
      transform: translateX(24px);
    }
  }

  .toggle-slider {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
}
</style> 