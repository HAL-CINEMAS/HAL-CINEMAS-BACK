import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'
import store from './store/index.js'
import './api/mock.js'

Vue.config.productionTip = false
import locale from 'element-ui/lib/locale/lang/ja';
Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('menuRouter', router)
  }
}).$mount('#app')
