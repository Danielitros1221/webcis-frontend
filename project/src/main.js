import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { install as installRecaptcha } from 'vue3-recaptcha-v2'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

app.use(pinia)
await useAuthStore(pinia).refreshSession()
app.use(router)
app.use(installRecaptcha, recaptchaSiteKey ? { sitekey: recaptchaSiteKey } : {})

app.mount('#app')
