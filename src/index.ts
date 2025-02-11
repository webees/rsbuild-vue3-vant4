import { createApp } from 'vue';

import App from '@/App.vue';
import router from '@router'
import store from '@pinia'
import i18n from '@i18n'

export const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)

router.isReady().then(() => app.mount('#root'))
