<template>
  <div class="footers">
    <mt-tabbar v-model="tab">
      <router-link :to="'/home'">
        <mt-tab-item id="a">
          外卖
        </mt-tab-item>
      </router-link>
      <mt-tab-item id="b">
        搜索
      </mt-tab-item>
      <mt-tab-item id="c">
        订单
      </mt-tab-item>
      <mt-tab-item id="d">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: "a"
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style lang="less">
.mint-tabbar .mint-tab-item-label {
  line-height: 40px;
}
.footers {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
</style>
