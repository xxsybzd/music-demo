<template>
  <div class="home">
    <header>
      <van-search
        v-model="value"
        shape="round"
        background="skyblue"
        placeholder="请输入搜索关键词"
      />
    </header>
    <van-loading
      type="spinner"
      color="#1989fa"
      v-if="banners.length == 0"
      class="loading"
    />
    <div class="banner" v-else>
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        v-if="banners.length != 0"
      >
        <template v-for="item in banners">
          <van-swipe-item v-if="item && item.pic" :key="item.bannerId">
            <img :src="item.pic" />
          </van-swipe-item>
        </template>
      </van-swipe>
    </div>
    <div class="content">
      <div>
        <recommend-item
          :personalized="personalized"
          @reset="reset"
          uname="personalized"
          >推荐歌单</recommend-item
        >
      </div>
      <div>
        <recommend-item
          :personalized="newSongList"
          @reset="reset"
          uname="newSong"
          >推荐新音乐</recommend-item
        >
      </div>
      <div>
        <recommend-item :personalized="djlist" @reset="reset"
          >推荐电台</recommend-item
        >
      </div>
    </div>
  </div>
</template>
<script>
import RecommendItem from "@/components/RecommendItem.vue";
export default {
  data() {
    return {
      banners: [], //轮播图数据
      value: "",
      personalized: [],
      newSongList: [],
      djlist: [],
    };
  },
  mounted() {
    this.getBanner();
    this.getpersonalized();
    this.newSong();
    this.djprogram();
  },
  components: {
    RecommendItem,
  },
  methods: {
    //获取轮播图
    async getBanner() {
      let res = await this.axios.get("/banner?type=1");
      this.banners = res.data.banners;
    },
    //获取推荐歌单,一次6条
    async getpersonalized() {
      let date = +new Date();
      let res = await this.axios.get(`/personalized?limit=7&time=${date}`);
      this.personalized = res.data.result.slice(1);
    },
    //获取推荐歌单,一次6条
    async newSong() {
      let date = +new Date();
      let res = await this.axios.get(`/personalized/newsong&time=${date}`);
      this.newSongList = res.data.result.slice(1, 7);
    },
    async djprogram() {
      let res = await this.axios.get(`/personalized/djprogram`);
      this.djlist = res.data.result;
    },
    reset(value) {
      if (value == "personalized") {
        this.getpersonalized();
      } else if (value == "newSong") {
        this.newSong();
      }
    },
  },
};
</script>
<style lang='less' scoped>
.my-swipe {
  margin-top: 10px;
  img {
    display: block;
    margin: 0 auto;
    border-radius: 10px;
    width: 95vw;
    height: 150px;
  }
}
.content {
  margin-bottom: 100px;
  margin-top: 40px;
}
.loading {
  position: absolute;
  top: 10%;
  transform: translate(-50%);
  z-index: 3;
  left: 50%;
}
</style>
