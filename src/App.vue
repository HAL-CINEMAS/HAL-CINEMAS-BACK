<template>
  <div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRouterAlive: true  //控制视图是否显示
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  },
  provide() {
    //父组件通过provide来提供变量，在子组件中通过inject来注入变量                                       
    return {
      reload: this.reload
    }
  },
}
</script>

<style>
body.modal-open {
  padding-right: 0 !important;
}
</style>