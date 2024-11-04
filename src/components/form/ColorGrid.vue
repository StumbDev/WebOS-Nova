<template>
  <div class="color-grid">
    <button
      v-for="color in colors"
      :key="color.id"
      class="color-option"
      :class="{ active: modelValue === color.value }"
      :style="{ '--color': color.value }"
      @click="$emit('update:modelValue', color.value)"
    >
      <span class="color-preview" />
      <span class="color-name">{{ color.name }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
interface ColorOption {
  id: string
  name: string
  value: string
}

defineProps<{
  modelValue: string
  colors: ColorOption[]
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style lang="scss" scoped>
.color-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  
  .color-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    border: 2px solid transparent;
    border-radius: 8px;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--hover-color);
    }

    &.active {
      border-color: var(--color);
    }

    .color-preview {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      background: var(--color);
    }

    .color-name {
      font-size: 12px;
      color: var(--text-color);
    }
  }
}
</style> 