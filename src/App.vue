<template>
  <div class="app">
    <StatusBar />
    <div class="app-content">
      <CardStack ref="cardStackRef" />
      
      <Transition name="fade">
        <Launcher 
          v-if="isLauncherOpen" 
          :apps="apps" 
          @close="isLauncherOpen = false"
        />
      </Transition>
      
      <Transition name="slide">
        <QuickSettings 
          v-if="isQuickSettingsOpen" 
          @close="isQuickSettingsOpen = false"
        />
      </Transition>
      
      <Dock :items="dockItems" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, defineComponent, h } from 'vue'
import type { Component } from 'vue'
import CardStack from './components/Card/CardStack.vue'
import Dock from './components/Dock/Dock.vue'
import Launcher from './components/Launcher/Launcher.vue'
import QuickSettings from './components/SystemUI/QuickSettings.vue'
import StatusBar from '@/components/SystemUI/StatusBar.vue'

const cardStackRef = ref()
const isLauncherOpen = ref(false)
const isQuickSettingsOpen = ref(false)

interface AppData {
  id: string
  icon: string
  name: string
  component: Component
  launchApp: () => void
}

const apps = ref<AppData[]>([
  {
    id: 'browser',
    icon: '/icons/browser.svg',
    name: 'Browser',
    component: defineAsyncComponent(() => import('./apps/Browser.vue')),
    launchApp: () => cardStackRef.value?.addCard({
      id: 'browser-' + Date.now(),
      title: 'Browser',
      component: defineAsyncComponent(() => import('./apps/Browser.vue'))
    })
  },
  {
    id: 'notes',
    icon: '/icons/notes.svg',
    name: 'Notes',
    component: defineAsyncComponent(() => import('./apps/Notes.vue')),
    launchApp: () => cardStackRef.value?.addCard({
      id: 'notes-' + Date.now(),
      title: 'Notes',
      component: defineAsyncComponent(() => import('./apps/Notes.vue'))
    })
  },
  {
    id: 'calculator',
    icon: '/icons/calculator.svg',
    name: 'Calculator',
    component: defineAsyncComponent(() => import('./apps/Calculator.vue')),
    launchApp: () => cardStackRef.value?.addCard({
      id: 'calculator-' + Date.now(),
      title: 'Calculator',
      component: defineAsyncComponent(() => import('./apps/Calculator.vue'))
    })
  },
  {
    id: 'filemanager',
    icon: '/icons/files.svg',
    name: 'Files',
    component: defineAsyncComponent(() => import('./apps/FileManager.vue')),
    launchApp: () => cardStackRef.value?.addCard({
      id: 'filemanager-' + Date.now(),
      title: 'Files',
      component: defineAsyncComponent(() => import('./apps/FileManager.vue'))
    })
  },
  {
    id: 'terminal',
    icon: '/icons/terminal.svg',
    name: 'Terminal',
    component: defineAsyncComponent(() => import('./apps/Terminal.vue')),
    launchApp: () => cardStackRef.value?.addCard({
      id: 'terminal-' + Date.now(),
      title: 'Terminal',
      component: defineAsyncComponent(() => import('./apps/Terminal.vue'))
    })
  },
  {
    id: 'settings',
    icon: '/icons/settings.svg',
    name: 'Settings',
    component: defineAsyncComponent(() => import('./apps/Settings.vue')),
    launchApp: () => isQuickSettingsOpen.value = true
  },
  {
    id: 'about',
    icon: '/icons/about.svg',
    name: 'About',
    component: defineAsyncComponent(() => import('./apps/About.vue')),
    launchApp: () => cardStackRef.value?.addCard({
      id: 'about-' + Date.now(),
      title: 'About Galaxy WebOS',
      component: defineAsyncComponent(() => import('./apps/About.vue'))
    })
  },
  {
    id: 'messages',
    icon: '/icons/messages.svg',
    name: 'Messages',
    component: defineAsyncComponent(() => import('./apps/Messages.vue')),
    launchApp: () => cardStackRef.value?.addCard({
      id: 'messages-' + Date.now(),
      title: 'Messages',
      component: defineAsyncComponent(() => import('./apps/Messages.vue'))
    })
  }
])

const dockItems = [
  {
    id: 'launcher',
    icon: '/icons/launcher.svg',
    label: 'Launcher',
    onClick: () => isLauncherOpen.value = true
  },
  {
    id: 'settings',
    icon: '/icons/settings.svg',
    label: 'Settings',
    onClick: () => isQuickSettingsOpen.value = true
  }
]
</script>

<style lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  padding-top: 24px;
  overflow: hidden;
  background: $background-color;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style> 