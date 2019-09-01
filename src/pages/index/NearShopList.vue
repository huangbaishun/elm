<template>
  <div class="container-shop-list">
    <p class="title">附近商家</p>
    <!-- <p class="title">{{ name }}</p> -->
    <!-- <p class="title">{{ id }}</p> -->
    <!-- <p class="title">{{ this.$store.getters.versionName }}</p>
    <button @click="handle">修改name</button> -->
    <ul>
      <li class="item" v-for="item in shopList" :key="item.id">
        <div class="left">
          <img :src="imgBaseUrl + item.image_path" alt="" class="img" />
        </div>
        <div class="right">
          <div class="item-msg">
            <p
              :class="item.is_premium ? 'premium' : ''"
              class="shopmsg over-hidden"
            >
              {{ item.name }}
            </p>
            <p class="icon-list">
              <span class="icon" v-for="msg in item.supports" :key="msg.id">
                {{ msg.icon_name }}
              </span>
            </p>
          </div>
          <div class="item-msg">
            <p class="color rate">
              <van-rate v-model="rate" size="0.24rem" />
              <span style="color: #ffd21e; margin-left: 10px;">{{ item.rating }}</span>&nbsp;&nbsp;月售{{ item.recent_order_num }}单
            </p>
            <p class="icon-list">
              <span
                class="delivery_style delivery_left"
                v-if="item.delivery_mode"
                >{{ item.delivery_mode.text }}</span
              ><span
                class="delivery_style delivery_right"
                v-if="zhunshi(item.supports)"
                >准时达</span
              >
            </p>
          </div>
          <div class="item-msg">
            <p class="color">
              ¥{{ item.float_minimum_order_amount }}起送
              <span class="segmentation">/</span>
              {{ item.piecewise_agent_fee.tips }}
            </p>
            <p class="color">
              <span v-if="Number(item.distance)" class=""
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
// import { Rate } from "vant";
// import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      shopList: [],
      imgBaseUrl: "//elm.cangdu.org/img/",
      rate: 3
    };
  },
  components: {},
  created() {},
  mounted() {
    // this.initData();
  },
  methods: {
    // ...mapMutations(["changeName"]),
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
    },
    zhunshi(supports) {
      let zhunStatus;
      if (supports instanceof Array && supports.length) {
        supports.forEach(item => {
          if (item.icon_name === "准") {
            zhunStatus = true;
          }
        });
      } else {
        zhunStatus = false;
      }
      return zhunStatus;
    },
    handle() {
      // this.$store.commit("changeName", "xxx");
      // this.changeName("xxxs");
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
    // hash: {
    //   handler(newValue) {
    //     console.log(newValue);
    //     this.initData(newValue);
    //   },
    //   immediate: true
    // }
  },
  computed: {
    // ...mapState(["name", "id"])
    // ...mapState({
    //   name: state => state.name,
    //   id: state => state.id
    // })
  }
};
</script>
<style lang="less" scoped>
.container-shop-list {
  margin-top: 0.2rem;
  padding-bottom: 0.88rem;
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
    border: 1px solid #eee;
    padding-top: 0.1rem;
    .left {
      width: 20%;
      padding: 0.12rem;
      .img {
        display: block;
        width: 100%;
      }
    }
    .right {
      flex: 1;
      padding: 0.12rem;
      .item-msg {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.2rem;
        .rate {
          display: flex;
          flex-wrap: nowrap;
        }
        .premium::before {
          content: "品牌";
          display: inline-block;
          font-size: 0.24rem;
          color: #333;
          background-color: #ffd930;
          padding: 0 0.1rem;
          border-radius: 0.1rem;
          margin-right: 0.2rem;
        }
        .shopmsg {
          font-size: 0.28rem;
          max-width: 60%;
          font-weight: 700;
          text-align: left;
        }
        p {
          font-size: 0.28rem;
        }
        span {
          font-size: 0.24rem;
        }
        .icon-list {
          display: flex;
          transform: scale(0.8);
          flex-wrap: wrap;
        }
        .icon {
          color: #999;
          font-size: 0.24rem;
          border: 1px solid #f1f1f1;
          padding: 0 0.04rem;
          border-radius: 0.08rem;
          margin-right: 0.05rem;
        }
        .delivery_style {
          padding: 0.01rem 0;
          font-size: 0.24rem;
          transform: scale(0.8);
        }
        .delivery_left {
          background-color: #3190e8;
          border: 1px solid #3190e8;
          color: #fff;
        }
        .delivery_right {
          border: 1px solid #3190e8;
          color: #3190e8;
        }
        .color {
          color: #666;
          font-size: 0.24rem;
        }
      }
    }
  }
}
</style>
