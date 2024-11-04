<template>
  <div class="quick-settings">
    <div class="quick-settings-header">
      <h2>Quick Settings</h2>
      <button @click="$emit('close')">×</button>
    </div>
    
    <div class="settings-grid">
      <button 
        v-for="setting in quickSettings" 
        :key="setting.id"
        class="setting-tile"
        :class="{ active: setting.active }"
        @click="setting.toggle"
      >
        <i :class="setting.icon" />
        <span>{{ setting.label }}</span>
      </button>

      <!-- Theme Toggle -->
      <button 
        class="setting-tile"
        :class="{ active: themeStore.isDark }"
        @click="toggleTheme"
      >
        <SystemIcons name="theme" :size="24" />
        <span>{{ themeStore.isDark ? 'Dark' : 'Light' }}</span>
      </button>
    </div>

    <div class="sliders-section">
      <div class="slider-group">
        <label>
          <SystemIcons name="brightness" :size="20" />
          Brightness
        </label>
        <input 
          type="range" 
          v-model="brightness" 
          min="0" 
          max="100" 
        />
      </div>

      <div class="slider-group">
        <label>
          <SystemIcons name="volume" :size="20" />
          Volume
        </label>
        <input 
          type="range" 
          v-model="volume" 
          min="0" 
          max="100" 
        />
      </div>
    </div>

    <div class="theme-section">
      <h3>Theme</h3>
      <div class="theme-options">
        <button 
          v-for="option in themeOptions" 
          :key="option.value"
          class="theme-option"
          :class="{ active: themeStore.theme === option.value }"
          @click="themeStore.setTheme(option.value)"
        >
          <SystemIcons :name="option.icon" :size="24" />
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import SystemIcons from '@/components/icons/SystemIcons.vue'

defineEmits<{
  (e: 'close'): void
}>()

const themeStore = useThemeStore()
const brightness = ref(50)
const volume = ref(50)

const quickSettings = ref([
  {
    id: 'wifi',
    icon: 'wifi-icon',
    label: 'Wi-Fi',
    active: true,
    toggle: () => quickSettings.value[0].active = !quickSettings.value[0].active
  },
  {
    id: 'bluetooth',
    icon: 'bluetooth-icon',
    label: 'Bluetooth',
    active: false,
    toggle: () => quickSettings.value[1].active = !quickSettings.value[1].active
  }
])

const themeOptions = [
  { value: 'light', label: 'Light', icon: 'brightness' },
  { value: 'dark', label: 'Dark', icon: 'theme' },
  { value: 'system', label: 'System', icon: 'settings' }
] as const

const toggleTheme = () => {
  themeStore.setTheme(themeStore.isDark ? 'light' : 'dark')
}
</script>

<style lang="scss" scoped>
.quick-settings {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  background: var(--surface-color);
  backdrop-filter: blur(20px);
  height: 100vh;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: v-bind($z-quicksettings);
  color: var(--text-color);

  .quick-settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      font-size: 1.2em;
    }

    button {
      background: none;
      border: none;
      font-size: 1.5em;
      cursor: pointer;
      color: var(--text-color);
    }
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;

    .setting-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      background: var(--hover-color);
      border: none;
      border-radius: 10px;
      cursor: pointer;
      color: var(--text-color);
      transition: all 0.2s ease;

      &:hover {
        background: var(--active-color);
      }

      &.active {
        background: var(--primary-color);
        color: white;
      }

      i {
        font-size: 24px;
        margin-bottom: 5px;
      }
    }
  }

  .sliders-section {
    margin: 20px 0;

    .slider-group {
      margin-bottom: 15px;

      label {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        color: var(--text-secondary);
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
        }
      }
    }
  }

  .theme-section {
    border-top: 1px solid var(--border-color);
    padding-top: 20px;

    h3 {
      margin-bottom: 15px;
      color: var(--text-secondary);
      font-size: 0.9em;
    }

    .theme-options {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .theme-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: var(--hover-color);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        color: var(--text-color);
        transition: all 0.2s ease;

        &:hover {
          background: var(--active-color);
        }

        &.active {
          background: var(--primary-color);
          color: white;
        }
      }
    }
  }
}
</style> 