<template>
  <div class="status-bar">
    <div class="status-left">
      <span class="time">{{ systemStore.formattedTime }}</span>
    </div>
    
    <div class="status-right">
      <div class="connection-status">
        <template v-if="systemStore.wifiConnected">
          <SystemIcons 
            name="wifi" 
            :size="16"
          />
        </template>
        <template v-else-if="systemStore.mobileConnected">
          <span class="mobile-type">{{ systemStore.mobileType }}</span>
          <div class="signal-strength">
            <div 
              v-for="i in 4" 
              :key="i"
              class="bar"
              :class="{ active: i <= systemStore.mobileStrength }"
            />
          </div>
        </template>
        <template v-else>
          <SystemIcons 
            name="wifi-off" 
            :size="16"
          />
        </template>
      </div>
      
      <div class="battery-status">
        <div class="battery-icon">
          <div 
            class="battery-level" 
            :style="{ width: `${systemStore.batteryLevel}%` }"
            :class="{ 
              'low': systemStore.batteryLevel <= 20,
              'charging': systemStore.isCharging 
            }"
          />
          <SystemIcons 
            v-if="systemStore.isCharging"
            name="charging"
            :size="12"
            class="charging-icon"
          />
        </div>
        <span class="battery-percentage">{{ systemStore.batteryLevel }}%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useSystemStore } from '@/stores/system'
import SystemIcons from '@/components/icons/SystemIcons.vue'

const systemStore = useSystemStore()

onMounted(() => {
  systemStore.initSystemInfo()
})
</script>

<style lang="scss" scoped>
.status-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: var(--surface-color);
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  font-size: 12px;
  z-index: v-bind($z-dock + 1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);

  .status-left,
  .status-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .time {
    font-weight: 500;
  }

  .connection-status {
    display: flex;
    align-items: center;
    gap: 4px;

    .mobile-type {
      font-size: 11px;
      font-weight: 500;
    }

    .signal-strength {
      display: flex;
      gap: 1px;
      align-items: flex-end;
      height: 12px;

      .bar {
        width: 2px;
        background: var(--text-secondary);
        opacity: 0.3;
        border-radius: 1px;

        &:nth-child(1) { height: 4px; }
        &:nth-child(2) { height: 6px; }
        &:nth-child(3) { height: 8px; }
        &:nth-child(4) { height: 10px; }

        &.active {
          opacity: 1;
        }
      }
    }
  }

  .battery-status {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .battery-icon {
    width: 22px;
    height: 12px;
    border: 1px solid currentColor;
    border-radius: 2px;
    padding: 1px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 4px;
      background: currentColor;
      border-radius: 0 1px 1px 0;
    }

    .battery-level {
      height: 100%;
      background: currentColor;
      transition: width 0.3s ease;

      &.low {
        background: #f44336;
      }

      &.charging {
        background: #4caf50;
      }
    }

    .charging-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: var(--surface-color);
    }
  }

  .battery-percentage {
    min-width: 34px;
  }
}
</style> 