import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface AccentColor {
  id: string
  name: string
  value: string
}

export const usePersonalizationStore = defineStore('personalization', () => {
  // Accent Colors
  const accentColors: AccentColor[] = [
    { id: 'blue', name: 'Blue', value: '#1a73e8' },
    { id: 'purple', name: 'Purple', value: '#9334ea' },
    { id: 'red', name: 'Red', value: '#ea4335' },
    { id: 'green', name: 'Green', value: '#34a853' },
    { id: 'orange', name: 'Orange', value: '#fa7b17' },
    { id: 'pink', name: 'Pink', value: '#e91e63' }
  ]

  const selectedAccentColor = ref(
    localStorage.getItem('accentColor') || accentColors[0].value
  )

  // Animation Settings
  const animationsEnabled = ref(
    localStorage.getItem('animationsEnabled') !== 'false'
  )

  const animationSpeed = ref(
    Number(localStorage.getItem('animationSpeed')) || 1
  )

  // Layout Settings
  const dockPosition = ref(
    localStorage.getItem('dockPosition') || 'bottom'
  )

  const cardStackLayout = ref(
    localStorage.getItem('cardStackLayout') || 'grid'
  )

  // Blur Effects
  const blurEffectsEnabled = ref(
    localStorage.getItem('blurEffectsEnabled') !== 'false'
  )

  // Font Settings
  const systemFont = ref(
    localStorage.getItem('systemFont') || 'system-ui'
  )

  const fontSize = ref(
    Number(localStorage.getItem('fontSize')) || 1
  )

  // Add dock settings
  const dockAutoHide = ref(
    localStorage.getItem('dockAutoHide') === 'true'
  )

  const dockHideDelay = ref(
    Number(localStorage.getItem('dockHideDelay')) || 0.5
  )

  // Add to the store:
  const initialized = ref(false)

  // Add to the store
  const deviceType = ref<'desktop' | 'mobile'>(
    localStorage.getItem('deviceType') as 'desktop' | 'mobile' || 'desktop'
  )

  const setDeviceType = (type: 'desktop' | 'mobile') => {
    deviceType.value = type
    localStorage.setItem('deviceType', type)
    document.documentElement.classList.toggle('mobile', type === 'mobile')
  }

  // Update functions
  const setAccentColor = (color: string) => {
    selectedAccentColor.value = color
    localStorage.setItem('accentColor', color)
    document.documentElement.style.setProperty('--primary-color', color)
  }

  const setAnimationsEnabled = (enabled: boolean) => {
    animationsEnabled.value = enabled
    localStorage.setItem('animationsEnabled', String(enabled))
    document.documentElement.classList.toggle('reduce-motion', !enabled)
  }

  const setAnimationSpeed = (speed: number) => {
    animationSpeed.value = speed
    localStorage.setItem('animationSpeed', String(speed))
    document.documentElement.style.setProperty('--animation-speed', `${speed}`)
  }

  const setDockPosition = (position: 'bottom' | 'left' | 'right') => {
    dockPosition.value = position
    localStorage.setItem('dockPosition', position)
  }

  const setCardStackLayout = (layout: 'grid' | 'stack' | 'cascade') => {
    cardStackLayout.value = layout
    localStorage.setItem('cardStackLayout', layout)
  }

  const setBlurEffects = (enabled: boolean) => {
    blurEffectsEnabled.value = enabled
    localStorage.setItem('blurEffectsEnabled', String(enabled))
    document.documentElement.classList.toggle('disable-blur', !enabled)
  }

  const setSystemFont = (font: string) => {
    systemFont.value = font
    localStorage.setItem('systemFont', font)
    document.documentElement.style.setProperty('--system-font', font)
  }

  const setFontSize = (size: number) => {
    fontSize.value = size
    localStorage.setItem('fontSize', String(size))
    document.documentElement.style.setProperty('--font-size-multiplier', String(size))
  }

  const setDockAutoHide = (enabled: boolean) => {
    dockAutoHide.value = enabled
    localStorage.setItem('dockAutoHide', String(enabled))
  }

  const setDockHideDelay = (delay: number) => {
    dockHideDelay.value = delay
    localStorage.setItem('dockHideDelay', String(delay))
  }

  // Initialize settings
  const initializeSettings = () => {
    if (initialized.value) return
    
    setAccentColor(selectedAccentColor.value)
    setAnimationsEnabled(animationsEnabled.value)
    setAnimationSpeed(animationSpeed.value)
    setBlurEffects(blurEffectsEnabled.value)
    setSystemFont(systemFont.value)
    setFontSize(fontSize.value)
    
    initialized.value = true
  }

  return {
    accentColors,
    selectedAccentColor,
    animationsEnabled,
    animationSpeed,
    dockPosition,
    cardStackLayout,
    blurEffectsEnabled,
    systemFont,
    fontSize,
    dockAutoHide,
    dockHideDelay,
    initialized,
    deviceType,
    setDeviceType,
    setAccentColor,
    setAnimationsEnabled,
    setAnimationSpeed,
    setDockPosition,
    setCardStackLayout,
    setBlurEffects,
    setSystemFont,
    setFontSize,
    setDockAutoHide,
    setDockHideDelay,
    initializeSettings
  }
}) 