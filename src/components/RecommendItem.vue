<template>
  <div class="recommend">
    <van-loading type="spinner" color="#1989fa" v-if="flag" class="loading" />
    <div v-else>
      <header>
        <h1 class="title text-background-clip">
          <slot></slot>
        </h1>
        <div class="reset text-background-clip" @click="reset" v-if="uname">
          <span class="iconfont icon-huanyihuan"></span>
          换一换
        </div>
      </header>
      <ul class="personalized" v-if="personalized.length != 0">
        <li
          class="personalized-item"
          v-for="item in personalized"
          :key="item.id"
        >
          <div class="playcount">
            <span
              class="iconfont icon-bofang"
              v-if="item.playCount || item.program.adjustedPlayCount"
            ></span>
            {{ getCount(item.playCount || item.program.adjustedPlayCount) }}
          </div>
          <img :src="item.picUrl" alt="" />
          <div class="text text-background-clip">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "recommend",
  props: ["personalized", "uname"],
  data() {
    return {
      flag: false,
    };
  },
  methods: {
    getCount(count) {
      return count >= 10000 ? (count / 10000).toFixed(2) + "万" : count;
    },
    reset() {
      if (this.flag) return;
      this.flag = true;
      this.$emit("reset", this.uname);
      this.$nextTick(() => {
        let vm = this;
        setTimeout(() => {
          vm.flag = false;
        }, 1000);
      });
    },
  },
  watch: {},
};
</script>
<style lang='less' scoped>
.recommend {
  overflow: hidden;
  height: 200px;
  position: relative;
  width: 95vw;
  margin: 0 auto;
}
header {
  position: relative;
  h1 {
    font-size: 20px;
    font-weight: bolder;
    padding: 10px 0;
    background-image: linear-gradient(
      -225deg,
      #231557 0%,
      #44107a 29%,
      #ff1361 67%,
      #fff800 100%
    );
  }
  .reset {
    position: absolute;
    right: 20px;
    top: 10px;
    background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);
    font-size: 14px;
  }
}
.personalized {
  display: flex;
  width: 100%;

  overflow-x: scroll;
}
li {
  margin-right: 10px;
  width: 130px;
  height: 180px;
  padding-bottom: 20px;
  position: relative;
  .playcount {
    position: absolute;
    top: 0;
    z-index: 2;
    right: 10px;
    color: #fff;
  }
  .text {
    background-image: linear-gradient(
      -225deg,
      #231557 0%,
      #44107a 29%,
      #ff1361 67%,
      #fff800 100%
    );
    padding: 0 5px;
    box-sizing: border-box;
    line-height: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  font-size: 12px;
  img {
    width: 123px;
    filter: brightness(80%);
    height: 120px;
    border-radius: 10px;
  }
}
.loading {
  position: absolute;
  top: 50%;
  transform: translate(-50%);
  left: 50%;
}
</style>
