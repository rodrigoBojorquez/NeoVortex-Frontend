import '@/shared/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './core/router'
import type {PluginOptions} from "vue-toastification";
import Toast, {POSITION} from "vue-toastification";
import {VueQueryPlugin} from "@tanstack/vue-query";
import "vue-toastification/dist/index.css"

const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 1000
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, {
  enableDevtoolsV6Plugin: true
})
app.use(Toast, toastOptions)

app.mount('#app')
