<template>
  <div class="index">
    <nav>
      <van-tabbar route v-model="active">
        <van-tabbar-item replace to="/home" class="iconfont icon-faxian"
          >发现</van-tabbar-item
        >
        <van-tabbar-item replace to="/podcast" class="iconfont icon-boke1-copy"
          >播客</van-tabbar-item
        >
        <van-tabbar-item replace to="/songlist" class="iconfont icon-gedan"
          >歌单</van-tabbar-item
        >
      </van-tabbar>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang='less' scoped>
.iconfont {
  font-size: 20px;
}
</style>
