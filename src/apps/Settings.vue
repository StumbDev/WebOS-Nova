<template>
  <div class="settings-app">
    <div class="settings-header">
      <h1>System Settings</h1>
      <div class="device-info">
        <span>{{ deviceInfo.model }}</span>
        <span>{{ deviceInfo.osVersion }}</span>
      </div>
    </div>

    <div class="settings-content">
      <ScrollContainer custom-scrollbar class="settings-nav">
        <div class="settings-nav">
          <button 
            v-for="section in sections" 
            :key="section.id"
            class="nav-item"
            :class="{ active: currentSection === section.id }"
            @click="currentSection = section.id"
          >
            <SystemIcons :name="section.icon" size="24" />
            <span>{{ section.title }}</span>
          </button>
        </div>
      </ScrollContainer>
      <ScrollContainer custom-scrollbar class="settings-main">
        <div 
          v-for="section in sections" 
          :key="section.id"
          v-show="currentSection === section.id"
          class="settings-section"
        >
          <h2>{{ section.title }}</h2>
          <div class="settings-items">
            <div 
              v-for="item in section.items" 
              :key="item.id"
              class="settings-item"
            >
              <div class="item-info">
                <span class="item-title">{{ item.title }}</span>
                <span class="item-description">{{ item.description }}</span>
              </div>
              <component 
                :is="item.control" 
                v-model="item.modelValue"
                v-bind="item.props"
                @update:modelValue="handleSettingChange(section.id, item.id, $event)"
              />
            </div>
          </div>
        </div>
      </ScrollContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useDeviceStore } from '@/stores/device'
import { usePersonalizationStore } from '@/stores/personalization'
import SystemIcons from '@/components/icons/SystemIcons.vue'
import Select from '@/components/form/Select.vue'
import Toggle from '@/components/form/Toggle.vue'
import ColorPicker from '@/components/form/ColorPicker.vue'
import ColorGrid from '@/components/form/ColorGrid.vue'
import Slider from '@/components/form/Slider.vue'
import ScrollContainer from '@/components/common/ScrollContainer.vue'

const themeStore = useThemeStore()
const deviceStore = useDeviceStore()
const personalizationStore = usePersonalizationStore()
const currentSection = ref('appearance')

const sections = ref([
  {
    id: 'appearance',
    title: 'Appearance',
    icon: 'theme',
    items: [
      {
        id: 'theme',
        title: 'Theme',
        description: 'Choose between light and dark theme',
        control: Select,
        modelValue: themeStore.theme,
        props: {
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' }
          ]
        }
      },
      {
        id: 'accent-color',
        title: 'Accent Color',
        description: 'Choose your preferred accent color',
        control: ColorGrid,
        modelValue: personalizationStore.selectedAccentColor,
        props: {
          colors: personalizationStore.accentColors
        }
      },
      {
        id: 'blur-effects',
        title: 'Blur Effects',
        description: 'Enable or disable background blur effects',
        control: Toggle,
        modelValue: personalizationStore.blurEffectsEnabled
      }
    ]
  },
  {
    id: 'personalization',
    title: 'Personalization',
    icon: 'customize',
    items: [
      {
        id: 'animations',
        title: 'Animations',
        description: 'Enable or disable system animations',
        control: Toggle,
        modelValue: personalizationStore.animationsEnabled
      },
      {
        id: 'animation-speed',
        title: 'Animation Speed',
        description: 'Adjust the speed of system animations',
        control: Slider,
        modelValue: personalizationStore.animationSpeed,
        props: {
          min: 0.5,
          max: 2,
          step: 0.1,
          labels: ['Slower', 'Normal', 'Faster']
        }
      },
      {
        id: 'dock-position',
        title: 'Dock Position',
        description: 'Choose where the dock appears',
        control: Select,
        modelValue: personalizationStore.dockPosition,
        props: {
          options: [
            { value: 'bottom', label: 'Bottom' },
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' }
          ]
        }
      },
      {
        id: 'card-layout',
        title: 'Window Layout',
        description: 'Choose how windows are arranged',
        control: Select,
        modelValue: personalizationStore.cardStackLayout,
        props: {
          options: [
            { value: 'grid', label: 'Grid' },
            { value: 'stack', label: 'Stack' },
            { value: 'cascade', label: 'Cascade' }
          ]
        }
      },
      {
        id: 'dock',
        title: 'Dock',
        description: 'Configure dock behavior',
        control: 'group',
        items: [
          {
            id: 'dock-autohide',
            title: 'Auto Hide',
            description: 'Automatically hide the dock when not in use',
            control: Toggle,
            modelValue: personalizationStore.dockAutoHide,
            onChange: (value: boolean) => personalizationStore.setDockAutoHide(value)
          },
          {
            id: 'dock-delay',
            title: 'Hide Delay',
            description: 'Delay before hiding the dock (seconds)',
            control: Slider,
            modelValue: personalizationStore.dockHideDelay,
            props: {
              min: 0,
              max: 2,
              step: 0.1,
              labels: ['Fast', 'Normal', 'Slow']
            },
            onChange: (value: number) => personalizationStore.setDockHideDelay(value)
          }
        ]
      }
    ]
  },
  {
    id: 'typography',
    title: 'Typography',
    icon: 'text',
    items: [
      {
        id: 'system-font',
        title: 'System Font',
        description: 'Choose the system-wide font',
        control: Select,
        modelValue: personalizationStore.systemFont,
        props: {
          options: [
            { value: 'system-ui', label: 'System Default' },
            { value: 'Roboto', label: 'Roboto' },
            { value: 'Inter', label: 'Inter' },
            { value: 'Open Sans', label: 'Open Sans' }
          ]
        }
      },
      {
        id: 'font-size',
        title: 'Font Size',
        description: 'Adjust the system-wide font size',
        control: Slider,
        modelValue: personalizationStore.fontSize,
        props: {
          min: 0.8,
          max: 1.4,
          step: 0.1,
          labels: ['Smaller', 'Normal', 'Larger']
        }
      }
    ]
  }
  // ... other sections
])

const handleSettingChange = (sectionId: string, itemId: string, value: any) => {
  if (sectionId === 'appearance') {
    switch (itemId) {
      case 'theme':
        themeStore.setTheme(value)
        break
      case 'accent-color':
        personalizationStore.setAccentColor(value)
        break
      case 'blur-effects':
        personalizationStore.setBlurEffects(value)
        break
    }
  } else if (sectionId === 'personalization') {
    switch (itemId) {
      case 'animations':
        personalizationStore.setAnimationsEnabled(value)
        break
      case 'animation-speed':
        personalizationStore.setAnimationSpeed(value)
        break
      case 'dock-position':
        personalizationStore.setDockPosition(value)
        break
      case 'card-layout':
        personalizationStore.setCardStackLayout(value)
        break
    }
  } else if (sectionId === 'typography') {
    switch (itemId) {
      case 'system-font':
        personalizationStore.setSystemFont(value)
        break
      case 'font-size':
        personalizationStore.setFontSize(value)
        break
    }
  }
}

onMounted(() => {
  personalizationStore.initializeSettings()
})
</script>

<style lang="scss" scoped>
.settings-app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  z-index: 1000;

  .settings-header {
    padding: 20px;
    background: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
    
    h1 {
      margin: 0;
      font-size: 24px;
    }

    .device-info {
      margin-top: 8px;
      font-size: 14px;
      color: var(--text-secondary);
      
      span {
        margin-right: 16px;
      }
    }
  }

  .settings-content {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .settings-nav {
    width: 250px;
    padding: 20px;
    border-right: 1px solid var(--border-color);
    background: var(--surface-color);
    overflow-y: auto;

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px;
      border: none;
      background: none;
      color: var(--text-color);
      cursor: pointer;
      border-radius: 8px;
      
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
      
      &.active {
        background: var(--primary-color);
        color: white;
      }
    }
  }

  .settings-main {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }

  .settings-section {
    max-width: 800px;
    margin: 0 auto;

    h2 {
      font-size: 20px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border-color);
    }
  }

  .settings-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: var(--surface-color);
    border-radius: 12px;
    border: 1px solid var(--border-color);

    .item-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .item-title {
      font-weight: 500;
    }

    .item-description {
      font-size: 14px;
      color: var(--text-secondary);
    }
  }
}
</style> 