import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// const originalPush: any = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location: any) {
//   return originalPush.call(this, location).catch((err: any) => err)
// }

const files = require.context('./router', true, /\.ts$/)
const modules: Array<RouteRecordRaw> = []

// path -> alias 的映射表
const pathAliasMap = new Map<string, string>()

// 把 "/me" 这种语义路径转为数字别名（如 "/3"），无则返回 null
export function aliasOf(path: string): string | undefined {
  return pathAliasMap.get(path)
}

files.keys().forEach((k, i) => {
  if (k === './index.ts') return
  const file = files(k) as { default: RouteRecordRaw }
  const route = file.default
  const alias = '/' + i++
  route.alias = alias
  pathAliasMap.set(route.path, alias) // 建立映射：/home -> /1
  modules.push(route)
})

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  ...modules
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    to || from
    if (savedPosition) return savedPosition
    return { left: 0, top: 0 }
  }
})

router.beforeEach((to, from) => {
  // 仅用于消除未使用变量警告
  to || from

  // ─────────────────────────────────────────────
  // ① 数字路径检测（例如 /1、/2、/1/3）
  // 如果路径是数字形式，先判断该路由是否存在
  // 存在则放行，否则跳转到首页
  // ─────────────────────────────────────────────
  if (/^\/\d+(?:\/\d+)*$/.test(to.path)) {
    const hasMatch = router.resolve(to.fullPath).matched.length > 0
    return hasMatch ? true : { path: '/' }
  }

  // ─────────────────────────────────────────────
  // ② 普通语义路径（例如 /home、/chat）
  // 在 modules 中查找对应的路由配置
  // 没有找到则重定向到首页
  // ─────────────────────────────────────────────
  const found = modules.find(r => r.path === to.path)
  if (!found) return { path: '/' }

  // ─────────────────────────────────────────────
  // ③ 获取该路由的数字别名（alias）
  // 每个模块在加载时都自动分配了一个别名，如 '/1' '/2'
  // ─────────────────────────────────────────────
  const alias = Array.isArray(found.alias) ? found.alias[0] : found.alias

  // ─────────────────────────────────────────────
  // ④ 若存在有效别名，则重定向到别名路径
  // 保留 query 和 hash 参数以避免状态丢失
  // 否则直接放行（理论上不会出现）
  // ─────────────────────────────────────────────
  return alias ? { path: alias, query: to.query, hash: to.hash } : true
})

router.afterEach(to => {
  to || 1
  window.scrollTo(0, 0)
})

export default router
