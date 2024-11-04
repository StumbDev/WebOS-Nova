<template>
  <select 
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    class="select-control"
  >
    <option 
      v-for="option in options" 
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string
  options: Array<{ value: string, label: string }>
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style lang="scss" scoped>
.select-control {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--surface-color);
  color: var(--text-color);
  font-size: 1em;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}
</style> 