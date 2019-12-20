<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      //this.$store.replaceState()替换 store 的根状态
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
};
</script>
<style lang="less">
@import "./style/common.less";
// #app { 路由跳转的翻页动画 供参考
//   overflow-x: hidden;
// }
// .v-enter {
//   opacity: 0;
//   transform: translateX(100%);
// }
// .v-leave-to {
//   opacity: 0;
//   transform: translateX(-100%);
//   position: absolute;
// }
// .v-enter-active,
// .v-leave-active {
//   transition: all 0.4s ease;
// }
</style>
