<template>
  <div>
    <el-card class="box-card" body-style="padding:20px">
      <h1>この管理システムの評価</h1>
      <el-rate v-model="value" :icon-classes="iconClasses" void-icon-class="icon-rate-face-off"
        :colors="['#99A9BF', '#F7BA2A', '#99FF33']" class="pingfen">
      </el-rate>
      <el-button type="primary" round @click="up">確認</el-button>
    </el-card>
  </div>
</template>

<script>
import '@/assets/fonts/style.css'
export default {
  data() {
    return {
      value: 0,
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'] // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
    }
  },
  methods: {
    up() {
      if (this.value === 0) return
      this.value = 0
      this.$message({
        type: 'success',
        message: 'ありがとうございました'
      })
      // alert('ありがとうございました')
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 500px;
}

h1 {
  text-align: center;
}

.pingfen {
  margin-left: 135px;
  width: 205px;
  height: 36px;
}

/deep/ .el-rate__icon {
  font-size: 35px;
}

button {
  margin-left: 197px;
  margin-top: 20px;
}
</style>