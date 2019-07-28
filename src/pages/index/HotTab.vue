<template>
  <div>
    <ul class="container-class">
      <router-link
        to="/home"
        tag="li"
        class="cell"
        v-for="item in classList"
        :key="item.id"
      >
        <img :src="imgBaseUrl + item.image_url" alt="" />
        <p>{{ item.title }}</p>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { classify } from "@/api/service.js";
export default {
  data() {
    return {
      classList: [],
      imgBaseUrl: "https://fuss10.elemecdn.com" //图片域名地址
    };
  },
  components: {},
  created() {
    this.getClass();
  },
  mounted() {},
  methods: {
    async getClass() {
      let data = await classify();
      this.classList = data.data.slice(0, 8);
      console.log(this.classList);
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
.container-class {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  .cell {
    width: 25%;
    margin-bottom: 0.2rem;
    img {
      display: block;
      height: 1rem;
      margin: 0 auto;
      padding: 0.1rem 0;
    }
    p {
      font-size: 0.32rem;
      color: #999;
    }
  }
}
</style>
