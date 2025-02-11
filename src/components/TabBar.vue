<template>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/home">
      <span>{{ $t('_tabbar.home') }}</span>
    </van-tabbar-item>

    <van-tabbar-item icon="chat-o" to="/chat">
      <span>{{ $t('_tabbar.chat') }}</span>
    </van-tabbar-item>

    <van-tabbar-item icon="user-o" to="/me">
      <span>{{ $t('_tabbar.me') }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
