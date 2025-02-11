export default {
  path: '/me',
  meta: {
    title: 'me',
    navbar: false,
    tabbar: true
  },
  component: () => import(/* webpackChunkName: "me" */ '@/views/Me.vue'),
  children: []
}
