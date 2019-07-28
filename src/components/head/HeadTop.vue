<template>
  <header class="head-top">
    <slot name="headLogo"></slot>
    <slot name="back"></slot>
    <slot></slot>
    <router-link
      :to="userInfo ? '/profile' : '/login'"
      v-if="singUp"
      class="head-login"
    >
      <span v-if="userInfo"></span>
      <span class="login-span" v-else>登录|注册</span></router-link
    >
    <span class="head-title over-hidden">{{ headTitle }}</span>
    <slot name="changecity"></slot>
  </header>
</template>
<script>
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  props: {
    singUp: String,
    headTitle: {
      type: String
    }
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
@import "../../style/base.less";
.head-top {
  background-color: @blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 1rem;
  .head-login {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.2rem;
    color: #fff;
    font-size: 0.4rem;
  }
  .login-span {
    color: #fff;
  }
  .head-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 0.4rem;
    max-width: 3.6rem;
  }
}
</style>
