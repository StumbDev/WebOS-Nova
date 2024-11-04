<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :aria-labelledby="iconName"
    role="presentation"
    :class="['icon', `icon-${name}`]"
  >
    <title :id="iconName">{{ iconName }}</title>
    <slot />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  name: string
  size?: number
}>()

const iconName = computed(() => `icon-${props.name}`)
</script>

<style lang="scss" scoped>
.icon {
  fill: currentColor;
  transition: all 0.3s ease;
}
</style> 