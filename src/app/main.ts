import './global.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import { createApp } from 'vue'
import Layout from './layouts/Layout.vue'
import router from './providers/router'

const app = createApp(Layout)
app.use(router)
app.mount('#app')
