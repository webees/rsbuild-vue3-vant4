<template>
  <div>

    <van-radio-group v-model="locale">
      <van-radio name="zh-CN">zh-CN</van-radio>
      <van-radio name="en-US">en-US</van-radio>
      <van-radio name="ja-JP">ja-JP</van-radio>
    </van-radio-group>

    <van-button type="primary">{{ locale }} : {{ $t('home') }}</van-button>
  </div>
</template>

<script lang="ts" setup>
import { app } from '@/vue-pinia'
import { ref, watch } from 'vue'
import { loadLang } from '@i18n'

const locale = ref(app().language)

watch(locale, newValue => {
  loadLang(newValue)
})
</script>

<style></style>