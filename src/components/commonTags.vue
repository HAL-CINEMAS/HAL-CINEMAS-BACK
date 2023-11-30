<template>
  <div class="tags">
    <el-tag v-for="(item, index) in getTags" :key="item.path" :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'" @click="selectMenu(item)" @close="removeMenu(item, index)">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    getTags() {
      return this.$store.state.tab.menuList
    }
  },
  methods: {
    selectMenu(e) {
      // console.log(this.getTags.length);

      if (this.$route.name === e.name) return
      this.$router.push({
        name: e.name
      })
      // console.log(this.$route.name);
    },
    removeMenu(e, index) {
      // console.log(this.getTags);
      // console.log(index);
      this.$store.commit('menuListRemove', index)
      if (e.name !== this.$route.name) return
      if (index === this.getTags.length) {
        this.$router.push({
          name: this.getTags[index - 1].name
        })
      } else {
        this.$router.push({
          name: this.getTags[index].name
        })
      }
    }
  }

}
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;

  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>