import i18n from '@i18n'
import store from '@pinia'
import router from '@router'
import { createApp } from 'vue'
import App from '@/App.vue'

export const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)

router.isReady().then(() => app.mount('#root'))
