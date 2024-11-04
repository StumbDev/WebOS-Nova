import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { usePersonalizationStore } from './stores/personalization'

// Import styles first
import './styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Initialize personalization settings
const personalizationStore = usePersonalizationStore(pinia)
personalizationStore.initializeSettings()

app.mount('#app') 