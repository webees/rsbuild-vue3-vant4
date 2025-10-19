import Axios from 'axios'
import type { App } from 'vue'
import type { Composer } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import enUS from '@/i18n/en-US'
import { app } from '@/vue-pinia'

let i18n!: ReturnType<typeof createI18n>
const g = () => i18n.global as unknown as Composer

const setLang = (v: string) => {
  g().locale.value = v
  Axios.defaults.headers.common['Accept-Language'] = v
  document.documentElement.lang = v
  app().language = v
  return v
}

export const loadLang = async (v: string) =>
  g().availableLocales.includes(v)
    ? setLang(v)
    : import(/* webpackChunkName: "lang-[request]" */ `@/i18n/${v}`).then(m => {
        g().setLocaleMessage(v, m.default[v])
        return setLang(v)
      })

export default {
  install(a: App) {
    const l = app().language || navigator.language
    i18n = createI18n({
      legacy: false,
      locale: l,
      fallbackLocale: 'en-US',
      globalInjection: true,
      messages: enUS
    })
    a.use(i18n)
    loadLang(l)
  },
  t: (k: string) => g().t(k)
}
