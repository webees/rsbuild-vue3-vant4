<template>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" :to="aliasOf('/home')">
      <span>{{ $t('_tabbar.home') }}</span>
    </van-tabbar-item>

    <van-tabbar-item icon="chat-o" :to="aliasOf('/chat')">
      <span>{{ $t('_tabbar.chat') }}</span>
    </van-tabbar-item>

    <van-tabbar-item icon="user-o" :to="aliasOf('/me')">
      <span>{{ $t('_tabbar.me') }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { aliasOf } from '@/vue-router';
</script>

<style lang="less" scoped></style>
