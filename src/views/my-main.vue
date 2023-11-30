<template>
  <div>
    <el-container>
      <el-aside width="auto" style="background:rgb(84, 92, 100)">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tags></common-tags>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import commonAside from '../components/commonAside.vue'
import commonHeader from '../components/commonHeader.vue'
import commonTags from '../components/commonTags.vue'
export default {
  name: 'MyApp',
  components: {
    commonAside,
    commonHeader,
    commonTags
  },

}
</script>

<style lang="less">
html,
body,
.el-header,
p {
  margin: 0;
  padding: 0;
}
</style>