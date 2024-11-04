import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const batteryLevel = ref(100)
  const isCharging = ref(false)
  const wifiStrength = ref(100)
  const wifiConnected = ref(true)
  const currentTime = ref(new Date())

  // Format time as HH:mm
  const formattedTime = computed(() => {
    return currentTime.value.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  })

  // Update time every minute
  setInterval(() => {
    currentTime.value = new Date()
  }, 60000)

  // Initialize system info using Web APIs
  const initSystemInfo = async () => {
    try {
      // Battery API
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery()
        batteryLevel.value = Math.round(battery.level * 100)
        isCharging.value = battery.charging

        battery.addEventListener('levelchange', () => {
          batteryLevel.value = Math.round(battery.level * 100)
        })

        battery.addEventListener('chargingchange', () => {
          isCharging.value = battery.charging
        })
      }

      // Network API
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        wifiConnected.value = connection.type === 'wifi'
        wifiStrength.value = connection.downlink * 10 // Rough estimate based on speed

        connection.addEventListener('change', () => {
          wifiConnected.value = connection.type === 'wifi'
          wifiStrength.value = connection.downlink * 10
        })
      }
    } catch (error) {
      console.error('Error initializing system info:', error)
    }
  }

  return {
    batteryLevel,
    isCharging,
    wifiStrength,
    wifiConnected,
    formattedTime,
    initSystemInfo
  }
}) 