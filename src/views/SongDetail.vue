<template>
  <div class="songdetail">
    <van-nav-bar title="标题" left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="content" v-if="playlist.id">
      <header>
        <div class="head-left">
          <img :src="playlist.coverImgUrl" alt="" />
          <span>
            <i class="iconfont icon-bofang"></i>
            {{ getplayCount(playlist.playCount) }}
          </span>
        </div>
        <div class="head-right">
          <h2>{{ playlist.name }}</h2>
          <div class="nickname" v-if="playlist?.creator">
            <img :src="playlist.creator.avatarUrl" alt="" />
            <span> {{ playlist.creator.nickname }} </span>
          </div>
          <div class="tags">
            <ul>
              <li
                v-for="(item, index) in playlist.creator.expertTags"
                :key="index"
              >
                {{ item }}
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="description" v-if="playlist.description">
          <span v-html="getdesc(playlist.description)"></span>
          <i class="iconfont icon-Right"></i>
        </div>
        <ul class="count">
          <li class="shareCount">
            <i class="iconfont icon-zhuanfa"></i>
            {{ getcount(playlist.shareCount) }}
          </li>
          <li class="commentCount">
            <i class="iconfont icon-pinglun"></i>
            {{ getcount(playlist.commentCount) }}
          </li>
          <li class="subscribedCount">
            <i class="iconfont icon-shoucang"></i>
            {{ getcount(playlist.subscribedCount) }}
          </li>
        </ul>
      </header>
      <div class="contail">
        <ul class="list">
          <li class="item" v-for="(item, index) in tracks" :key="item.id">
            <list-item :item="item" :index="index + 1"></list-item>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <van-loading
          type="spinner"
          color="#1989fa"
          v-if="isHandlingBottom && !nulldata"
        />
        <h2 v-if="nulldata">没有更多数据了</h2>
      </div>
    </div>
  </div>
</template>
<script>
import ListItem from "@/components/ListItem.vue";
import { debounce } from "lodash";
export default {
  props: ["id"],
  data() {
    return {
      playlist: {},
      tracks: [],
      isHandlingBottom: false,
      page: 1,
      nulldata: false,
    };
  },
  methods: {
    async getSongListCategories() {
      let res = await this.axios.get(`/playlist/detail?id=${this.id}`);
      this.playlist = res.data.playlist;
    },

    async getTrack(page = 0) {
      let res = await this.axios.get(
        `/playlist/track/all?id=${this.id}&limit=20&offset=${page * 20}`
      );
      this.tracks.push(...res.data.songs);
      if (res.data.songs.length < 20) {
        this.nulldata = true;
        window.removeEventListener("scroll", this.handleScroll);
      }
      this.isHandlingBottom = false;
    },

    getdesc(str) {
      return str.replace(/\n/g, "");
    },

    getplayCount(count) {
      return count > 10000 ? Math.floor(count / 10000) + "万" : count;
    },
    getcount(count) {
      return count > 100000 ? (count / 10000).toFixed(1) + "万" : count;
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      if (scrollTop + clientHeight >= scrollHeight && !this.isHandlingBottom) {
        this.isHandlingBottom = true;
        this.page++;
        this.getTrack(this.page);
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getSongListCategories();
      vm.getTrack();
      let debounceScript = debounce(vm.handleScroll, 300);
      window.addEventListener("scroll", debounceScript);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.playlist = {};
    this.tracks = [];
    this.isHandlingBottom = false;
    this.page = 1;
    this.nulldata = false;
    window.removeEventListener("scroll", this.handleScroll);
    next();
  },
  components: {
    ListItem,
  },
};
</script>
<style lang='less' scoped>
.content {
  header {
    padding-left: 20px;
    padding-top: 30px;
    display: flex;
    flex-flow: row wrap;
    background: rgba(255, 0, 0, 0.6);
    .head-left {
      position: relative;
      width: 100px;
      height: 100px;
      img {
        width: 100px;
        border-radius: 10px;
        height: 100px;
        box-sizing: border-box;
      }
      span {
        right: 5px;
        top: 5px;
        position: absolute;
        font-size: 13px;
        color: #fff;
      }
    }
    .head-right {
      margin-left: 5px;
      h2 {
        color: #fff;
        font-weight: bolder;
        font-size: 14px;
      }
      .nickname {
        margin-top: 20px;
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          margin-left: 10px;
          border-radius: 50%;
        }
        span {
          font-size: 12px;
          margin-left: 10px;
          color: #ccc;
        }
      }
      ul {
        display: flex;
        margin-left: 10px;
        margin-top: 10px;
        li {
          font-size: 12px;
          border-radius: 5px;
          padding: 5px;
          background: #aaa;
          text-align: center;
          color: #fff;
          margin-right: 10px;
        }
      }
    }
    .description {
      margin: 10px 0;
      color: #ccc;
      height: 16px;
      font-size: 12px;
      position: relative;
      span {
        overflow: hidden;
        white-space: nowrap;
        width: 80vw;
        display: inline-block;
        text-overflow: ellipsis;
      }
      .icon-Right {
        right: -30px;
        top: 0;
        font-size: 12px;
        position: absolute;
      }
    }
    .count {
      display: flex;
      margin-bottom: 20px;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        width: 100px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        margin-right: 10px;
        line-height: 40px;
        height: 40px;
        background: rgb(227, 117, 101);

        i {
          margin-right: 5px;
        }
      }
    }
  }
  .contail {
    margin-bottom: 30px;
  }
}
.bottom {
  height: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  h2 {
    color: #ccc;
  }
}
</style>
