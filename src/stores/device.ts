import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Device } from '@nativescript/core'

interface StorageInfo {
  total: number
  used: number
  free: number
  percentage: number
}

interface MemoryInfo {
  total: number
  used: number
  free: number
  percentage: number
}

export const useDeviceStore = defineStore('device', () => {
  const model = ref('')
  const osVersion = ref('')
  const manufacturer = ref('')
  const language = ref('')
  const region = ref('')
  const storageInfo = ref<StorageInfo>({
    total: 0,
    used: 0,
    free: 0,
    percentage: 0
  })
  const memoryInfo = ref<MemoryInfo>({
    total: 0,
    used: 0,
    free: 0,
    percentage: 0
  })

  const initializeDeviceInfo = async () => {
    try {
      // Get basic device info
      model.value = Device.model
      osVersion.value = Device.osVersion
      manufacturer.value = Device.manufacturer
      language.value = Device.language
      region.value = Device.region

      // Get storage info
      const storage = await Device.getStorageInfo()
      storageInfo.value = {
        total: Math.round(storage.totalSpace / 1024 / 1024 / 1024), // Convert to GB
        used: Math.round((storage.totalSpace - storage.freeSpace) / 1024 / 1024 / 1024),
        free: Math.round(storage.freeSpace / 1024 / 1024 / 1024),
        percentage: Math.round(((storage.totalSpace - storage.freeSpace) / storage.totalSpace) * 100)
      }

      // Get memory info
      const memory = await Device.getMemoryInfo()
      memoryInfo.value = {
        total: Math.round(memory.totalMemory / 1024 / 1024), // Convert to GB
        used: Math.round((memory.totalMemory - memory.availableMemory) / 1024 / 1024),
        free: Math.round(memory.availableMemory / 1024 / 1024),
        percentage: Math.round(((memory.totalMemory - memory.availableMemory) / memory.totalMemory) * 100)
      }
    } catch (error) {
      console.error('Error getting device info:', error)
    }
  }

  return {
    model,
    osVersion,
    manufacturer,
    language,
    region,
    storageInfo,
    memoryInfo,
    initializeDeviceInfo
  }
}) 