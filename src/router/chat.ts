export default {
  path: '/chat',
  meta: {
    title: 'chat',
    navbar: false,
    tabbar: true
  },
  component: () => import(/* webpackChunkName: "chat" */ '@/views/Chat.vue'),
  children: []
}
