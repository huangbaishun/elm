<template>
  <div>
    <head-top :headTitle="cityName">
      <template v-slot:back>
        <span class="city-back mintui mintui-back" @click="back"></span>
      </template>
      <template v-slot:changecity>
        <span class="change-city" @click="changeCity">切换城市</span>
      </template>
    </head-top>
    <form class="search" v-on:submit.prevent>
      <input
        type="search"
        name="city"
        placeholder="输入学校、商务楼、地址"
        class="input-sreach"
        autocomplete="off"
        v-model="searchWord"
        required
      />
      <input
        type="submit"
        name="submit"
        class="city_submit"
        value="提交"
        @click="search"
      />
    </form>
    <div class="history">
      <p class="history-title" v-if="isHistoryList">搜索历史</p>
      <ul class="history-content">
        <li
          class="history-cur"
          v-for="(item, index) in dataList"
          :key="index"
          @click="goIndex(item)"
        >
          <p class="cur-title">{{ item.name }}</p>
          <p class="cur-detaile over-hidden">{{ item.address }}</p>
        </li>
      </ul>
      <mt-button
        v-if="isHistoryList"
        size="large"
        type="default"
        @click.native="clearAll"
        >清空搜索历史</mt-button
      >
    </div>
  </div>
</template>
<script>
import HeadTop from "@/components/head/HeadTop.vue";
import { currentcity, searchAddress } from "@/api/service";
import { setStore, getStore, removeStore } from "@/utils/utils";
export default {
  data() {
    return {
      cityName: "",
      searchWord: "",
      dataList: [],
      searchHistory: [],
      isHistoryList: true //判断是否是 搜索历史 模式下
    };
  },
  components: {
    HeadTop
  },
  created() {
    let cityId = this.$route.params.id;
    currentcity(cityId).then(data => {
      this.cityName = data.data.name;
      this.initHistory();
    });
  },
  mounted() {},
  methods: {
    initHistory() {
      this.dataList = this.searchHistory = getStore("searchHistory") || [];
    },
    back() {
      this.$router.go(-1);
    },
    changeCity() {
      this.$router.push("/home");
    },
    search() {
      if (this.searchWord.trim()) {
        let word = this.searchWord.trim();
        let params = {
          city_id: this.$route.params.id,
          keyword: word
        };
        searchAddress(params).then(data => {
          console.log(data);
          if (data.status === 200) {
            this.dataList = data.data;
            this.isHistoryList = false;
          }
        });
      }
    },
    goIndex(curItem) {
      let oldHistory = getStore("searchHistory");
      if (oldHistory) {
        // 判断历史记录是否有搜索的内容
        let flag = this.searchHistory.some(item => {
          return item.name === curItem.name;
        });
        !flag && this.searchHistory.push(curItem);
      } else {
        this.searchHistory.push(curItem);
      }
      let hash = curItem.geohash;
      setStore("searchHistory", this.searchHistory);
      this.$router.push({ path: "/indexElm", query: { hash } });
    },
    clearAll() {
      removeStore("searchHistory");
      this.dataList = this.searchHistory = [];
    },
    //过滤非法字符
    filterWord() {}
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
.change-city {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.2rem;
  color: #fff;
  font-size: 0.4rem;
}
.city-back {
  position: absolute;
  top: 50%;
  left: 0.2rem;
  transform: translateY(-50%);
  color: #fff;
  font-size: 0.4rem;
}
.search {
  padding-top: 0.7rem;
  .input-sreach {
    height: 0.6rem;
    width: 70%;
    border-radius: 6px;
    margin-right: 10px;
    text-align: left;
    padding: 0 0.1rem;
  }
  .city_submit {
    height: 0.6rem;
    color: #fff;
    background-color: #3190e8;
    padding: 0 0.2rem;
    border-radius: 4px;
  }
}
.history {
  .history-title {
    font-size: 0.28rem;
    background: #e4e4e4;
    color: #000;
    text-align: left;
    padding: 0.1rem 0.2rem;
    border-top: 1px solid #ccc;
  }
  .history-content {
    border-top: 1px solid #ccc;
  }
  .history-cur {
    border-bottom: 1px solid #999;
  }
  .history-cur:last-child {
    border-bottom: none;
  }
  .cur-title {
    font-size: 0.32rem;
    text-align: left;
    padding: 0.1rem 0.2rem;
    color: #444;
  }
  .cur-detaile {
    font-size: 0.28rem;
    color: #999;
    width: 90%;
    text-align: left;
    padding: 0.1rem 0.2rem;
  }
}
</style>
