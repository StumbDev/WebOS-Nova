<template>
  <div 
    class="dock"
    :class="{
      'auto-hide': personalizationStore?.dockAutoHide,
      'hidden': isHidden,
      [`position-${personalizationStore?.dockPosition || 'bottom'}`]: true
    }"
    @mouseenter="showDock"
    @mouseleave="hideDock"
  >
    <button 
      v-for="item in items" 
      :key="item.id" 
      class="dock-item"
      @click="item.onClick"
    >
      <img :src="item.icon" :alt="item.label" />
      <span class="dock-label">{{ item.label }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePersonalizationStore } from '@/stores/personalization'

interface DockItem {
  id: string
  icon: string
  label: string
  onClick: () => void
}

const props = defineProps<{
  items: DockItem[]
}>()

const personalizationStore = usePersonalizationStore()
const isHidden = ref(false)
let hideTimeout: number | null = null

const showDock = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  isHidden.value = false
}

const hideDock = () => {
  if (!personalizationStore.dockAutoHide) return
  
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
  
  hideTimeout = window.setTimeout(() => {
    isHidden.value = true
  }, (personalizationStore.dockHideDelay || 0.5) * 1000)
}

// Show dock when mouse is at screen edge
const handleMouseMove = (e: MouseEvent) => {
  if (!personalizationStore.dockAutoHide) return

  const threshold = 10
  const position = personalizationStore.dockPosition || 'bottom'

  if (
    (position === 'bottom' && window.innerHeight - e.clientY <= threshold) ||
    (position === 'left' && e.clientX <= threshold) ||
    (position === 'right' && window.innerWidth - e.clientX <= threshold)
  ) {
    showDock()
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  // Initialize personalization store if needed
  if (!personalizationStore.initialized) {
    personalizationStore.initializeSettings()
  }
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
})
</script>

<style lang="scss" scoped>
.dock {
  position: fixed;
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: v-bind($z-dock);

  &.position-bottom {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px 20px 0 0;

    &.hidden {
      transform: translate(-50%, 100%);
    }
  }

  &.position-left {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
    border-radius: 0 20px 20px 0;

    &.hidden {
      transform: translate(-100%, -50%);
    }

    .dock-item {
      flex-direction: row;
      gap: 10px;

      .dock-label {
        margin-top: 0;
      }
    }
  }

  &.position-right {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
    border-radius: 20px 0 0 20px;

    &.hidden {
      transform: translate(100%, -50%);
    }

    .dock-item {
      flex-direction: row;
      gap: 10px;

      .dock-label {
        margin-top: 0;
      }
    }
  }

  .dock-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }

    img {
      width: 48px;
      height: 48px;
    }

    .dock-label {
      font-size: 0.8em;
      margin-top: 4px;
      color: var(--text-color);
    }
  }

  &.dark {
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  }
}
</style> 