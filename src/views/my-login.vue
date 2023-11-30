<template>
  <div class="body">
    <el-form :model="loginData" :rules="rules" ref="form" class="demo-form-inline" label-width="60px">
      <h3>管理システム
      </h3>
      <el-form-item label="" prop="username">
        <i class="el-icon-user" style="font-size: 25px;margin-right: 10px;"></i>
        <el-input v-model="loginData.username" placeholder="ユーザー名" style="width:65%"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <i class="el-icon-lock" style="font-size: 25px;margin-right: 10px;"></i>
        <el-input v-model="loginData.password" type="password" placeholder="パスワード" style="width:65%"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login" style="margin-left:65px">ログイン</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api/index.js'
export default {
  name: 'myLogin',
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'ユーザー名を入力してください', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'パスワードを入力してください', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.loginData).then((data) => {
            if (data.data.code === 20000) {
              // console.log(data);
              const token = data.data.data.token
              Cookie.set('token', token)
              this.$router.push({
                name: 'home'
              }, () => { })
              this.$store.commit('menuChange', data.data.data.menu)
              this.$store.commit('menuRouter', this.$router)
              // console.log(this.$router);
            } else {
              this.$message({
                showClose: true,
                message: data.data.data.message,
                type: 'error'
              })
            }
          })
        }
      })

    }
  }
}
</script>

<style lang="less" scoped>
.body {
  height: 100vh;
  --text-color: hsl(0 95% 60%);
  --bg-color: hsl(0 0% 100%);
  --bg-size: 200px;

  display: grid;
  place-items: center;
  place-content: center;
  grid-template-areas: "body";
  overflow: hidden;
  font-family: "Dela Gothic One", sans-serif;
  background-color: var(--bg-color);
  // overflow: hidden;
}

.body::before {
  --size: 150vmax;

  grid-area: body;
  content: "";
  inline-size: var(--size);
  block-size: var(--size);
  background-image: url("https://www.jq22.com/newjs/foot-pattern.svg");
  background-size: var(--bg-size);
  background-repeat: repeat;
  transform: rotate(45deg);
  opacity: 0.25;
  animation: bg 6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  body::before {
    animation-duration: 0s;
  }
}

@keyframes bg {
  to {
    background-position: 0 calc(var(--bg-size) * -1);
  }
}

.demo-form-inline {
  position: absolute;
  top: 0;
  border: 1px solid #eaeaea;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;

  h3 {
    text-align: center;
  }



  /deep/.el-form-item__error {
    margin-left: 35px;
  }
}
</style>