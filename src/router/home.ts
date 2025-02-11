export default {
  path: '/home',
  meta: {
    title: 'home',
    navbar: false,
    tabbar: true
  },
  component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  children: []
}
