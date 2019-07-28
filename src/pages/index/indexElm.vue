<template>
  <div>
    <head-top sing-up="true" :headTitle="currentAdrress">
      <template v-slot:headLogo>
        <span class="mintui mintui-back head_logo_more"></span>
        <router-link to="/home" class="head_logo_city">
          {{ currentAdrressName }}
        </router-link>
      </template>
    </head-top>
    <div class="container">
      <!--TabCotainer-->
      <mt-tab-container v-model="tab">
        <mt-tab-container-item id="a">
          <hot-tab></hot-tab>
          <near-shop-list :hash="gohash"></near-shop-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="b">
          搜索
        </mt-tab-container-item>
        <mt-tab-container-item id="c">
          订单
        </mt-tab-container-item>
        <mt-tab-container-item id="d">
          我的
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="footer">
      <mt-tabbar v-model="tab">
        <mt-tab-item id="a">
          外卖
        </mt-tab-item>
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
  </div>
</template>
<script>
import HeadTop from "@/components/head/HeadTop.vue";
import HotTab from "@/pages/index/HotTab.vue";
import NearShopList from "@/pages/index/NearShopList.vue";
import { geoHash } from "@/api/service.js";
export default {
  data() {
    return {
      tab: "a",
      currentAdrress: "",
      currentAdrressName: "",
      gohash: ""
    };
  },
  components: {
    HeadTop,
    HotTab,
    NearShopList
  },
  created() {
    this.getCity();
  },
  mounted() {},
  methods: {
    async getCity() {
      let hash = this.$route.query.hash;
      let cur = await geoHash(hash);
      this.gohash = cur.data.geohash;
      this.currentAdrress = cur.data.name;
      this.currentAdrressName = cur.data.city;
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less">
.footer .mint-tab-item-label {
  line-height: 40px;
  height: 40px;
}
.footer {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
.container {
  padding-top: 1rem;
}
.head_logo_city {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.6rem;
  font-weight: 400;
  font-size: 0.4rem;
  color: #fff;
  font-size: 0.32rem;
}
.head_logo_more {
  position: absolute;
  top: 50%;
  left: 0.2rem;
  font-weight: 400;
  font-size: 0.4rem;
  color: #fff;
  transform: translateY(-50%) rotate(-90deg);
}
</style>
