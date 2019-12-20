<template>
  <form
    v-if="type==='form'"
    class="el-button"
    style="border:0;padding:0;"
    :action="url"
    :method="method"
  >
    <input v-for="(value,key) in query" :key="key" :name="key" :value="value" disabled hidden />
    <el-button native-type="submit">
      <slot>导出</slot>
    </el-button>
  </form>
  <el-button v-else @click="getFile">
    <slot>导出</slot>
  </el-button>
</template>
<script>
export default {
  props: {
    query: {
      type: Object,
      default: function() {
        return {};
      }
    },
    action: String,
    method: {
      type: String,
      default: "get"
    },
    type: String,
    fileName: {
      type: String,
      default: `导出数据.xlsx`
    }
  },
  computed: {
    url: function() {
      let action = this.action;
      if (action && action[0] !== "/") action = `/${action}`;
      //return `http://10.64.152.126:8086${action}`;
      return process.env.VUE_APP_BASEURL + ":8086" + action;
    }
  },
  methods: {
    getFile: function() {
      let query = this.query;
      this.request({
        url: this.action,
        method: this.method,
        data: query,
        params: query,
        responseType: "blob"
      }).then(res => {
        if (res.type === "application/json") {
          this.handleError(res);
        } else {
          this.downloadFile(res);
        }
      });
    },
    handleError: function(blob) {
      let reader = new FileReader();
      let that=this;
      reader.onload = function() {
        let msg = JSON.parse(reader.result);
        that.$message({
          type: "error",
          showClose: true,
          message:msg.msg
        });
      };
      reader.readAsText(blob);
    },
    downloadFile: function(blob) {
      let downloadUrl = URL.createObjectURL(blob);
      let a = document.createElement("a");
      let names=this.fileName.split('.');
      a.href = downloadUrl;
      a.download = `${names[0]}_${new Date().toLocaleDateString().replace(/\//g,'-')}.${names[names.length-1]}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    }
  }
};
</script>


兼容IE

<template>
  <a 
  class="el-button el-button--default" :class="disabled?'is-disabled':''" 
  :href="url" :download="name">
    <slot>{{ btnName }}</slot>
  </a>
</template>
<script>
export default {
  props: {
    query: {
      type: Object,
      default: function() {
        return {};
      }
    },
    action: String,
    method: {
      type: String,
      default: "get"
    },
    type: String,
    fileName: {
      type: String,
      default: `导出数据.xlsx`
    },
    disabled: Boolean,
    btnName: {
      type: String,
      default: '导出'
    },
  },
  computed: {
    url: function() {
      let action = this.action;
      let query = this.query;
      let cache = [];
      Object.keys(query).map(function(item) {
        if (query[item] != undefined) {
          cache.push(
            `${encodeURIComponent(item)}=${encodeURIComponent(query[item])}`
          );
        }
      });
      if (action && action[0] !== "/") action = `/${action}`;
      // return process.env.VUE_APP_BASEURL + ":8086" + action+'?'+cache.join('&');
      return action + "?" + cache.join("&");
    },
    name: function() {
      let names = this.fileName.split(".");
      return `${names[0]}_${new Date()
        .toLocaleDateString()
        .replace(/\//g, "-")}.${names[names.length - 1]}`;
    }
  },
  methods: {
    getFile: function() {
      let query = this.query;
      this.request({
        url: this.action,
        method: this.method,
        data: query,
        params: query,
        responseType: "blob"
      }).then(res => {
        if (res.type === "application/json") {
          this.handleError(res);
        } else {
          this.downloadFile(res);
        }
      });
    },
    handleError: function(blob) {
      let reader = new FileReader();
      let that = this;
      reader.onload = function() {
        let msg = JSON.parse(reader.result);
        that.$message({
          type: "error",
          showClose: true,
          message: msg.msg
        });
      };
      reader.readAsText(blob);
    },
    downloadFile: function(blob) {
      let downloadUrl = URL.createObjectURL(blob);
      let a = document.createElement("a");
      let names = this.fileName.split(".");
      a.href = downloadUrl;
      a.download = `${names[0]}_${new Date()
        .toLocaleDateString()
        .replace(/\//g, "-")}.${names[names.length - 1]}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    }
  }
};
</script>
<style scoped>
.is-disabled {
  pointer-events: none;
}
</style>
