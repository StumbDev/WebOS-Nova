<template>
  <div class="color-picker">
    <input 
      type="color"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span class="color-value">{{ modelValue }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style lang="scss" scoped>
.color-picker {
  display: flex;
  align-items: center;
  gap: 8px;

  input[type="color"] {
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    
    &::-webkit-color-swatch {
      border: none;
      border-radius: 8px;
    }
  }

  .color-value {
    font-family: monospace;
    color: var(--text-secondary);
  }
}
</style> 