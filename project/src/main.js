import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { install } from 'vue3-recaptcha-v2'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(install, {
  sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  cnDomains: false,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
