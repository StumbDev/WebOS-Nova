<template>
  <div class="launcher">
    <div class="launcher-search">
      <input
        type="text"
        placeholder="Just Type to search..."
        v-model="searchTerm"
        @input="filterApps"
        autofocus
      />
    </div>
    <ScrollContainer custom-scrollbar class="launcher-grid">
      <button 
        v-for="app in filteredApps" 
        :key="app.id" 
        class="app-icon"
        @click="launchApp(app)"
      >
        <img :src="app.icon" :alt="app.name" />
        <span>{{ app.name }}</span>
      </button>
    </ScrollContainer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import ScrollContainer from '@/components/common/ScrollContainer.vue'

interface AppIcon {
  id: string
  icon: string
  name: string
  launchApp: () => void
}

const props = defineProps<{
  apps: AppIcon[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const searchTerm = ref('')

const filteredApps = computed(() => 
  props.apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)

const launchApp = (app: AppIcon) => {
  app.launchApp()
  emit('close')
}
</script>

<style lang="scss" scoped>
.launcher {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  z-index: v-bind($z-launcher);
  display: flex;
  flex-direction: column;
  padding: 20px;

  .launcher-search {
    margin-bottom: 20px;
    
    input {
      width: 100%;
      padding: 15px;
      border-radius: 10px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1.2em;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  .launcher-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 20px;
    padding: 20px;
    overflow-y: auto;

    .app-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 10px;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }

      img {
        width: 64px;
        height: 64px;
        margin-bottom: 8px;
      }

      span {
        text-align: center;
        font-size: 0.9em;
      }
    }
  }
}
</style> 