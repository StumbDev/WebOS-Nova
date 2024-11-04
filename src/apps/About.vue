<template>
  <ScrollContainer custom-scrollbar>
    <div class="about-app">
      <div class="hero-section">
        <img src="/icons/launcher.svg" alt="WebOS Logo" class="logo" />
        <h1>Galaxy WebOS</h1>
        <p class="version">Version 0.0.1-beta.1</p>
      </div>

      <div class="info-sections">
        <div class="info-section">
          <h2>System Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Device Name</span>
              <span class="value">{{ deviceInfo.name }}</span>
            </div>
            <div class="info-item">
              <span class="label">Operating System</span>
              <span class="value">Galaxy WebOS {{ deviceInfo.version }}</span>
            </div>
            <div class="info-item">
              <span class="label">Build Number</span>
              <span class="value">{{ deviceInfo.build }}</span>
            </div>
            <div class="info-item">
              <span class="label">Web Runtime</span>
              <span class="value">{{ deviceInfo.runtime }}</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h2>Hardware</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Platform</span>
              <span class="value">{{ hardwareInfo.platform }}</span>
            </div>
            <div class="info-item">
              <span class="label">Memory</span>
              <span class="value">{{ hardwareInfo.memory }}</span>
            </div>
            <div class="info-item">
              <span class="label">Screen Resolution</span>
              <span class="value">{{ hardwareInfo.resolution }}</span>
            </div>
            <div class="info-item">
              <span class="label">GPU Renderer</span>
              <span class="value">{{ hardwareInfo.gpu }}</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h2>Storage</h2>
          <div class="storage-bars">
            <div class="storage-item">
              <div class="storage-header">
                <span>System Storage</span>
                <span>{{ storageInfo.system.used }} / {{ storageInfo.system.total }} GB</span>
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  :style="{ width: `${(storageInfo.system.used / storageInfo.system.total) * 100}%` }"
                />
              </div>
            </div>
            <div class="storage-item">
              <div class="storage-header">
                <span>User Storage</span>
                <span>{{ storageInfo.user.used }} / {{ storageInfo.user.total }} GB</span>
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  :style="{ width: `${(storageInfo.user.used / storageInfo.user.total) * 100}%` }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h2>Software</h2>
          <div class="tech-stack">
            <div class="tech-item" v-for="tech in techStack" :key="tech.name">
              <img :src="tech.icon" :alt="tech.name" />
              <span>{{ tech.name }}</span>
              <span class="version">{{ tech.version }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>© 2024 MigDev. All rights reserved.</p>
        <button class="update-check">Check for Updates</button>
      </div>
    </div>
  </ScrollContainer>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ScrollContainer from '@/components/common/ScrollContainer.vue'

const deviceInfo = ref({
  name: 'Galaxy WebOS Device',
  version: '0.0.1-beta.1',
  build: 'Build 2024.01',
  runtime: 'Chromium ' + navigator.userAgent.match(/Chrome\/([0-9.]+)/)?.[1]
})

const hardwareInfo = ref({
  platform: navigator.platform,
  memory: `${Math.round(navigator.deviceMemory || 8)} GB`,
  resolution: `${window.screen.width} × ${window.screen.height}`,
  gpu: 'WebGL ' + (document.createElement('canvas').getContext('webgl')?.getParameter(WebGLRenderingContext.VERSION) || 'Not Available')
})

const storageInfo = ref({
  system: {
    total: 64,
    used: 28.5
  },
  user: {
    total: 128,
    used: 45.2
  }
})

const techStack = ref([
  { name: 'Vue', version: '3.3.4', icon: '/icons/tech/vue.svg' },
  { name: 'TypeScript', version: '5.1.6', icon: '/icons/tech/typescript.svg' },
  { name: 'Vite', version: '4.4.9', icon: '/icons/tech/vite.svg' },
  { name: 'Pinia', version: '2.1.6', icon: '/icons/tech/pinia.svg' }
])
</script>

<style lang="scss" scoped>
.about-app {
  height: 100%;
  overflow-y: auto;
  padding: 40px;
  background: var(--background-color);
  color: var(--text-color);

  .hero-section {
    text-align: center;
    margin-bottom: 40px;

    .logo {
      width: 96px;
      height: 96px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 2.5em;
      margin: 0;
    }

    .version {
      color: var(--text-secondary);
      font-size: 1.2em;
    }
  }

  .info-sections {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .info-section {
    h2 {
      font-size: 1.5em;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border-color);
    }
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .info-item {
      padding: 15px;
      background: var(--surface-color);
      border-radius: 10px;
      border: 1px solid var(--border-color);

      .label {
        display: block;
        color: var(--text-secondary);
        margin-bottom: 5px;
        font-size: 0.9em;
      }

      .value {
        font-size: 1.1em;
      }
    }
  }

  .storage-bars {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .storage-item {
      .storage-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        color: var(--text-secondary);
      }

      .progress-bar {
        height: 8px;
        background: var(--hover-color);
        border-radius: 4px;
        overflow: hidden;

        .progress-fill {
          height: 100%;
          background: var(--primary-color);
          transition: width 0.3s ease;
        }
      }
    }
  }

  .tech-stack {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;

    .tech-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: var(--surface-color);
      border-radius: 10px;
      border: 1px solid var(--border-color);

      img {
        width: 48px;
        height: 48px;
        margin-bottom: 10px;
      }

      .version {
        color: var(--text-secondary);
        font-size: 0.9em;
        margin-top: 5px;
      }
    }
  }

  .footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-secondary);

    .update-check {
      padding: 8px 16px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style> 