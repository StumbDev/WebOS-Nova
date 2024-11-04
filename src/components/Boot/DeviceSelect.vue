<template>
  <div class="device-select">
    <h1>Choose Your Device</h1>
    <div class="devices">
      <button 
        class="device-option"
        :class="{ active: selectedDevice === 'desktop' }"
        @click="selectDevice('desktop')"
      >
        <div class="device-icon desktop">
          <svg viewBox="0 0 24 24">
            <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/>
          </svg>
        </div>
        <span>Desktop</span>
        <div class="check">
          <svg viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        </div>
      </button>

      <button 
        class="device-option"
        :class="{ active: selectedDevice === 'mobile' }"
        @click="selectDevice('mobile')"
      >
        <div class="device-icon mobile">
          <svg viewBox="0 0 24 24">
            <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
          </svg>
        </div>
        <span>Mobile</span>
        <div class="check">
          <svg viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        </div>
      </button>
    </div>

    <button 
      class="continue-btn"
      :disabled="!selectedDevice"
      @click="continueToOS"
    >
      Continue
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usePersonalizationStore } from '@/stores/personalization'

const personalizationStore = usePersonalizationStore()
const selectedDevice = ref<'desktop' | 'mobile' | null>(null)

const emit = defineEmits<{
  (e: 'complete'): void
}>()

const selectDevice = (device: 'desktop' | 'mobile') => {
  selectedDevice.value = device
}

const continueToOS = () => {
  if (selectedDevice.value) {
    personalizationStore.setDeviceType(selectedDevice.value)
    emit('complete')
  }
}
</script>

<style lang="scss" scoped>
.device-select {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;

  h1 {
    font-size: 32px;
    margin-bottom: 40px;
    color: var(--text-color);
  }

  .devices {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;

    .device-option {
      width: 200px;
      height: 200px;
      border: 2px solid var(--border-color);
      border-radius: 20px;
      background: var(--surface-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      &.active {
        border-color: var(--primary-color);
        background: var(--hover-color);

        .check {
          opacity: 1;
        }
      }

      .device-icon {
        width: 64px;
        height: 64px;
        color: var(--text-color);

        svg {
          width: 100%;
          height: 100%;
          fill: currentColor;
        }
      }

      span {
        font-size: 18px;
        color: var(--text-color);
      }

      .check {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 24px;
        height: 24px;
        color: var(--primary-color);
        opacity: 0;
        transition: opacity 0.3s ease;

        svg {
          width: 100%;
          height: 100%;
          fill: currentColor;
        }
      }
    }
  }

  .continue-btn {
    padding: 12px 40px;
    border-radius: 30px;
    border: none;
    background: var(--primary-color);
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      opacity: 0.9;
    }
  }
}
</style> 