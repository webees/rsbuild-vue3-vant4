<template>
  <div>
    <router-view />
    <tab-bar v-show="$route.meta.tabbar" />
  </div>
</template>

<script lang="ts" setup>
import i18n from '@i18n'

const route = useRoute()
watch(
  () => route.meta.title,
  v => {
    if (v) {
      window.document.title = i18n.t(v as string)
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
