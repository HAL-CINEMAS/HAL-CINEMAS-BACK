<template>
  <div class="header-container">
    <div class="l-content">
      <el-button @click="isCollapseChange" icon="el-icon-menu" size="mini" style="margin-right:20px"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="menuList" v-for="item in getMenuList" :key="item.name" :to="{ path: item.path }">
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img v-if="this.form.account_img" class="user-image"
            :src="require(`../server/public/img/${this.form.account_img}.png`)" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="b"><i class="el-icon-s-check" style="color:#409eff"></i>マイページ</el-dropdown-item>
          <!-- <el-dropdown-item command="c"><i class="el-icon-s-shop" style="color:#409eff"></i>自動販売機</el-dropdown-item> -->
          <el-dropdown-item command="a"><i class="el-icon-switch-button"
              style="color:#409eff"></i>ログアウト</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { getAccountData } from '../api/index1'
export default {

  data() {
    return {
      token: '',
      form: {
        account_id: '',
        account_img: '',
        account_name: '',
        account_position: '',
        account_user: '',
        account_sex: '',
        account_age: '',

      },
    }
  },
  methods: {
    isCollapseChange() {
      this.$store.commit('collaspeMenu')
      // console.log(this.getMenuList.length - 1);

    },
    handleCommand(command) {
      if (command === 'a') {
        Cookie.remove('token')
        Cookie.remove('menu')
        this.$store.commit('menuListAllRemove', this.getMenuList.length - 1)
        this.$router.push({
          name: 'login'
        })
        // location.reload()
      } else if (command === 'b') {
        this.$router.push({
          name: 'page1'
        }, () => { })
      } else if (command === 'c') {
        let routeUrl = this.$router.resolve({
          path: "/vending",
          query: {
            id: '1'
          }
        })
        window.open(routeUrl.href, '_blank')
      }
    },
    getUserList() {
      getAccountData().then(({ data }) => {

        const token = Cookie.get('token')
        this.token = token

        if (token === 'admin') {
          this.form = data[0]
          // console.log(this.form);
        } else {
          this.form = data[1]
        }

        // this.form = data[0]
        // console.log(this.form);


      })
    }
  },

  computed: {
    getMenuList() {
      return this.$store.state.tab.menuList
    }
  },
  created() {

    this.getUserList()

    const token = Cookie.get('token')
    this.token = token
  }

}
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .text {
    font-size: 16px;
    color: #fff;
    margin-left: 16px;

  }

  .user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-image:hover {
    cursor: pointer;
  }

  .l-content {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb__item {

      .el-breadcrumb__inner {
        font-weight: 400;
        color: #fff;
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
          cursor: pointer;
        }
      }
    }

  }
}
</style>