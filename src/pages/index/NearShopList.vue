<template>
  <div class="container-shop-list">
    <p class="title">附近商家</p>
    <ul>
      <li class="item" v-for="item in shopList" :key="item.id">
        <div class="left">
          <img :src="imgBaseUrl + item.image_path" alt="" class="img" />
        </div>
        <div class="right">
          <div class="item-msg">
            <p class="shopmsg">{{ item.name }}</p>
            <p>
              <span v-for="msg in item.supports" :key="msg.id">
                {{ msg.icon_name }}
              </span>
            </p>
          </div>
          <div class="item-msg">
            <p>{{ item.rating }} 月售{{ item.recent_order_num }}单</p>
            <p>w</p>
          </div>
          <div class="item-msg">
            <p>
              ¥{{ item.float_minimum_order_amount }}起送
              <span class="segmentation">/</span>
              {{ item.piecewise_agent_fee.tips }}
            </p>
            <p>
              <span v-if="Number(item.distance)"
                >{{
                  item.distance > 1000
                    ? (item.distance / 1000).toFixed(2) + "km"
                    : item.distance + "m"
                }}
                <span class="segmentation">/</span>
              </span>
              <span v-else>{{ item.distance }}</span>
              <span class="segmentation">/</span>
              <span class="order_time">{{ item.order_lead_time }}</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { nearshop } from "@/api/service.js";
export default {
  data() {
    return {
      shopList: [],
      imgBaseUrl: "//elm.cangdu.org/img/"
    };
  },
  components: {},
  created() {},
  mounted() {
    // this.initData();
  },
  methods: {
    initData(newValue) {
      // let str = this.$route.query.hash;
      // let [latitude, longitude] = str.split(",");
      let [latitude, longitude] = newValue.split(",") || [];
      let params = {
        latitude,
        longitude
      };
      nearshop(params).then(res => {
        console.log(res);
        this.shopList = res.data;
      });
    }
  },
  props: {
    hash: {
      type: String
    }
  },
  watch: {
    hash(newValue) {
      this.initData(newValue);
    }
  },
  computed: {}
};
</script>
<style lang="less" scoped>
.container-shop-list {
  margin-top: 0.2rem;
  background-color: #fff;
  border-top: 1px solid #e4e4e4;
  .title {
    text-align: left;
    font-size: 0.28rem;
    color: #999;
    padding-left: 0.2rem;
  }
  .item {
    display: flex;
    .left {
      width: 20%;
      .img {
        display: block;
        width: 100%;
      }
    }
    .right {
      flex: 1;
      .item-msg {
        display: flex;
        justify-content: space-between;
        .shopmsg {
          font-size: 0.32rem;
        }
        p {
          font-size: 0.28rem;
        }
        span {
          font-size: 0.24rem;
        }
      }
    }
  }
}
</style>
