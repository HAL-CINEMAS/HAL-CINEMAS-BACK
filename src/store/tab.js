import Cookie from 'js-cookie'
import VueRouter from 'vue-router'
// 组件封装思想  单独封装出控制左边菜单的js
export default {
  state: {
    isCollapse: false,
    menuList: [
      { path: '/', name: 'home', label: 'ホーム', icon: 's-home', url: 'Home/Home' }
    ],
    menudata: [],
  },
  mutations: {
    collaspeMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    menuListCreat(state, e) {

      if (e.name !== 'home') {
        const index = state.menuList.findIndex(item => item.name === e.name)

        if (index === -1) {
          state.menuList.push(e)
        }
      }
    },
    menuListRemove(state, e) {
      // console.log(e);
      // console.log(index);
      state.menuList.splice(e, 1)
    },
    menuListAllRemove(state, e) {
      state.menuList.splice(1, e)
    },
    menuChange(state, e) {
      state.menudata = e
      Cookie.set('menu', JSON.stringify(e))
      // console.log(state.menudata);
    },
    menuRouter(state, router) {
      if (!Cookie.get('menu')) return
      const menu = JSON.parse(Cookie.get('menu'))
      state.menudata = menu
      const menuArr = []
      // 添加component为了后面动态显示组件
      menu.forEach(item => {
        if (item.children) {
          const itemNew = item.children.map(item => {
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArr.push(...itemNew)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArr.push(item)
        }
      })

      // 获取原始路由数据
      var options = router.options

      // 用原始数据重新 new 一个路由
      var _VueRouter = new VueRouter(options)

      // 用新路由的 matcher 替换旧路由的 matcher
      router.matcher = _VueRouter.matcher

      menuArr.forEach(item => {
        // console.log(item);
        router.addRoute('main', item)
      })

    }
  }
}