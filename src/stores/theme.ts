import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

type Theme = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(
    localStorage.getItem('theme') as Theme || 'system'
  )
  
  const systemDark = ref(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  
  const isDark = computed(() => 
    theme.value === 'system' ? systemDark.value : theme.value === 'dark'
  )

  // Watch for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    systemDark.value = e.matches
  })

  // Update theme
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    updateThemeClass()
  }

  // Update DOM theme class
  const updateThemeClass = () => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(isDark.value ? 'dark' : 'light')
  }

  // Initial setup
  watch(isDark, () => {
    updateThemeClass()
  }, { immediate: true })

  return {
    theme,
    isDark,
    setTheme
  }
}) 