import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const batteryLevel = ref(100)
  const isCharging = ref(false)
  const wifiStrength = ref(100)
  const wifiConnected = ref(false)
  const mobileConnected = ref(false)
  const mobileType = ref<'3G' | '4G' | '5G' | 'LTE'>('4G')
  const mobileStrength = ref(4) // 0-4 bars
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
        updateConnectionInfo(connection)

        connection.addEventListener('change', () => {
          updateConnectionInfo(connection)
        })
      }
    } catch (error) {
      console.error('Error initializing system info:', error)
    }
  }

  const updateConnectionInfo = (connection: any) => {
    // Check connection type
    wifiConnected.value = connection.type === 'wifi'
    mobileConnected.value = ['cellular', '4g', '3g', '2g'].includes(connection.type)

    // Update wifi strength if connected
    if (wifiConnected.value) {
      wifiStrength.value = connection.downlink * 10 // Rough estimate based on speed
    }

    // Update mobile info if connected
    if (mobileConnected.value) {
      // Determine mobile connection type
      switch (connection.effectiveType) {
        case 'slow-2g':
        case '2g':
          mobileType.value = '3G'
          break
        case '3g':
          mobileType.value = '4G'
          break
        case '4g':
          mobileType.value = connection.type === 'cellular' ? '5G' : 'LTE'
          break
        default:
          mobileType.value = 'LTE'
      }

      // Calculate signal strength based on downlink speed
      const speed = connection.downlink || 0
      if (speed > 100) mobileStrength.value = 4
      else if (speed > 50) mobileStrength.value = 3
      else if (speed > 20) mobileStrength.value = 2
      else if (speed > 5) mobileStrength.value = 1
      else mobileStrength.value = 0
    }
  }

  return {
    batteryLevel,
    isCharging,
    wifiStrength,
    wifiConnected,
    mobileConnected,
    mobileType,
    mobileStrength,
    formattedTime,
    initSystemInfo
  }
}) 