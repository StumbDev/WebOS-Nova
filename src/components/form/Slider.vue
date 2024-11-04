<template>
  <div class="slider-control">
    <div class="slider-labels" v-if="labels">
      <span 
        v-for="(label, index) in labels" 
        :key="index"
        :style="{ left: `${(index / (labels.length - 1)) * 100}%` }"
      >
        {{ label }}
      </span>
    </div>
    <input 
      type="range"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: number
  min: number
  max: number
  step: number
  labels?: string[]
}>()

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<style lang="scss" scoped>
.slider-control {
  width: 100%;
  padding: 16px 0;

  .slider-labels {
    position: relative;
    height: 20px;
    margin-bottom: 8px;

    span {
      position: absolute;
      transform: translateX(-50%);
      font-size: 12px;
      color: var(--text-secondary);
    }
  }

  input[type="range"] {
    width: 100%;
    height: 4px;
    background: var(--hover-color);
    border-radius: 2px;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      background: var(--primary-color);
      border-radius: 50%;
      cursor: pointer;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style> 