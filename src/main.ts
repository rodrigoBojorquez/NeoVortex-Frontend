import '@/shared/assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import "vuetify/styles"

import { createVuetify} from "vuetify";
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './core/router'
import type {PluginOptions} from "vue-toastification";
import Toast, {POSITION} from "vue-toastification";
import {VueQueryPlugin} from "@tanstack/vue-query";
import "vue-toastification/dist/index.css"
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { VDateInput } from 'vuetify/labs/VDateInput'


const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  components: {
    VDateInput,
    ...components,
  },
  directives,
})

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
app.use(vuetify)
app.use(Toast, toastOptions)

app.mount('#app')
