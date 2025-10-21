import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { VantResolver } from '@vant/auto-import-resolver'
import AutoImport from 'unplugin-auto-import/rspack'
import Components from 'unplugin-vue-components/rspack'

export default defineConfig({
  dev: {
    lazyCompilation: false
  },
  output: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'vue-i18n': 'VueI18n',
      axios: 'axios'
    }
  },
  html: {
    title: undefined,
    meta: undefined,
    template: 'public/index.html',
  },
  plugins: [pluginVue()],
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          resolvers: [VantResolver()],
          imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
          dts: 'src/types/auto-imports.d.ts'
        }),
        Components({
          resolvers: [VantResolver()],
          dts: 'src/types/components.d.ts'
        })
      ]
    }
  }
})
