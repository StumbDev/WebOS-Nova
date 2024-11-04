<template>
  <div class="browser-app">
    <div class="browser-toolbar">
      <input 
        type="text" 
        v-model="url" 
        @keyup.enter="navigate"
        placeholder="Enter URL"
      />
    </div>
    <iframe 
      v-if="currentUrl" 
      :src="currentUrl" 
      class="browser-frame"
    ></iframe>
    <div v-else class="browser-home">
      <h2>Welcome to Galaxy Browser</h2>
      <p>Enter a URL to begin browsing</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const url = ref('')
const currentUrl = ref('')

const navigate = () => {
  if (!url.value.startsWith('http')) {
    url.value = 'https://' + url.value
  }
  currentUrl.value = url.value
}
</script>

<style lang="scss" scoped>
.browser-app {
  display: flex;
  flex-direction: column;
  height: 100%;

  .browser-toolbar {
    padding: 10px;
    
    input {
      width: 100%;
      padding: 8px;
      border-radius: 20px;
      border: 1px solid #ddd;
      outline: none;
      
      &:focus {
        border-color: $primary-color;
      }
    }
  }

  .browser-frame {
    flex: 1;
    border: none;
    width: 100%;
  }

  .browser-home {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
  }
}
</style> 