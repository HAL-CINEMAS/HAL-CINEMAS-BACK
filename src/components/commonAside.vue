<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <h3 v-if="!isCollapse">{{ '管理システム'}}</h3>
    <h3 v-else><i class="el-icon-s-help" style="color:#409eff;font-size: 30px;"></i></h3>
    <el-menu-item @click="moveMenu(item)" v-for="item in nochildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in haschildren" :key="item.label" index="1">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
        <el-menu-item @click="moveMenu(subItem)" :index="subItem.name">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      // menudata: [
      //   { path: '/', name: 'home', label: '首页', icon: 's-home', url: 'Home/Home' },
      //   { path: '/mall', name: 'mall', label: '商品管理', icon: 'video-play', url: 'MallManage/MallManage' },
      //   { path: '/user', name: 'user', label: '用户管理', icon: 'user', url: 'userManage/UserManage' },
      //   {
      //     label: '其他', icon: 'location', children: [
      //       { path: '/page1', name: 'page1', label: '页面1', icon: 'setting', url: 'Other/PageOne' },
      //       { path: '/page2', name: 'page2', label: '页面2', icon: 'setting', url: 'Other/PageTwo' },
      //     ]
      //   },

      // ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    moveMenu(e) {
      // console.log(e);
      if (this.$route.path !== e.path && !(this.$route.path === '/home' && e.path === '/')) {
        this.$router.push(e.path)
      }

      this.$store.commit('menuListCreat', e)

    }
  },
  computed: {
    nochildren() {
      return this.menudata.filter(item => !item.children)
    },
    haschildren() {
      return this.menudata.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menudata() {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menudata
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;

}

.el-menu {
  border: none;
}

h3 {
  color: #fff;
  text-align: center;
  height: 27px;
  line-height: 27px;
  font-size: 16px;
  font-weight: 400;
}

.el-menu {
  height: 100vh;
  // height: 100vh;
}
</style>