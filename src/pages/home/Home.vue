<template>
  <div class="home">
    <head-top sing-up="true">
      <template v-slot:headLogo>
        <span class="head_logo" @click="reload">elm</span>
      </template>
    </head-top>
    <!-- 当前定位城市 -->
    <div class="city-nav">
      <div class="city-tip clear">
        <span>当前定位城市：</span>
        <span>定位不准时，点击下方选择详情</span>
      </div>
      <router-link :to="'/city/' + guessCity.id" class="current-city">
        <span class="current-show over-hidden">{{ guessCity.name }}</span>
        <span class="arrow mintui mintui-back"></span>
      </router-link>
    </div>
    <div class="hot-city">
      <div class="title">热门城市</div>
      <div class="list">
        <ul class="all-hot">
          <router-link
            tag="li"
            v-for="item in hostCity"
            :to="'/city/' + item.id"
            :key="item.id"
            class="cur-hot"
            >{{ item.name }}</router-link
          >
        </ul>
      </div>
    </div>
    <div
      class="group-city"
      v-for="(val, key, index) in sortGroupCity"
      :key="key"
    >
      <div class="title">
        {{ key }}
        <span style="color: #999; font-size: 0.3rem">{{
          index === 0 ? "(按字母顺序排列)" : ""
        }}</span>
      </div>
      <div class="list">
        <ul class="group-hots">
          <router-link
            tag="li"
            v-for="item in val"
            :to="'/city/' + item.id"
            :key="item.id"
            class="group-hot over-hidden"
            >{{ item.name }}</router-link
          >
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import HeadTop from "@/components/head/HeadTop.vue";
import { currentCity, hostCity, groupCity } from "@/api/service";
export default {
  data() {
    return {
      guessCity: {},
      hostCity: [],
      groupCity: {}
    };
  },
  components: {
    HeadTop
  },
  created() {
    currentCity.then(data => {
      this.guessCity = data && data.data;
    });
    hostCity.then(data => {
      this.hostCity = data.data;
    });
    groupCity.then(data => {
      this.groupCity = data.data;
    });
  },
  mounted() {},
  methods: {
    reload() {
      // 清除缓存
      if (window.location.href.indexOf("?time") === -1) {
        window.location.href = location.href + "?time=" + new Date().getTime();
      } else {
        let i = window.location.href.indexOf("?time");
        let href = window.location.href.substring(0, i);
        window.location.href = href + "?time=" + new Date().getTime();
      }
      window.location.reload();
    }
  },
  computed: {
    sortGroupCity() {
      let sortObj = {};
      let A = "A".charCodeAt(0);
      let Z = "Z".charCodeAt(0);
      for (var i = A; i <= Z; i++) {
        if (this.groupCity[String.fromCharCode(i)]) {
          sortObj[String.fromCharCode(i)] = this.groupCity[
            String.fromCharCode(i)
          ];
        }
      }
      return sortObj;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  font-size: 0.4rem;
}
.head_logo {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.2rem;
  font-weight: 400;
  font-size: 0.4rem;
  color: #fff;
}
.city-nav {
  padding-top: 1.2rem;
  .city-tip {
    padding: 0 0.2rem;
    span:nth-of-type(1) {
      font-size: 0.35rem;
      color: #666;
      float: left;
    }
    span:nth-of-type(2) {
      font-size: 0.24rem;
      color: #999;
      float: right;
      font-weight: 900;
    }
  }
  .current-city {
    padding: 0.1rem 0.2rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e4e4e4;
    border-bottom: 2px solid #e4e4e4;
    .current-show {
      color: #3190e8;
    }
    .arrow {
      color: #999;
    }
  }
}
.hot-city {
  margin-top: 0.2rem;
  .title {
    text-align: left;
    padding: 0 0.2rem;
    color: #666;
  }
  .list {
    .all-hot {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      border-top: 1px solid #e4e4e4;
      .cur-hot {
        font-size: 0.32rem;
        width: 25%;
        color: #3190e8;
        line-height: 1rem;
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
      }
    }
  }
}
.group-city {
  .title {
    padding: 0 0.2rem;
    line-height: 1rem;
    border-bottom: 1px solid #e4e4e4;
    text-align: left;
  }
  .group-hots {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .group-hot {
      width: 25%;
      line-height: 1rem;
      color: #666;
      border-right: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      border-top: 1px solid transparent;
      border-left: 1px solid transparent;
    }
  }
}
</style>
