<template>
  <div class="list-item">
    <div class="left">
      {{ index }}
    </div>
    <div class="right">
      <h1>{{ item.name }}</h1>
      <div class="desc">
        <span v-if="item.sq">SQ</span>
        {{ item.ar[0].name }}
        {{ item.al.name }}
      </div>
      <i class="iconfont icon-bofang"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "index"],
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
.list-item {
  display: flex;
  margin: 15px 0;
  padding: 5px 0;
}
.list-item:hover {
  background: #ccc;
}
.left {
  color: gray;
  font-size: 20px;
  padding: 10px;
}
.right {
  font-size: 12px;
  flex: 1;
  position: relative;
  h1 {
    margin-bottom: 5px;
    font-size: 20px;
    width: 270px;
    white-space: nowrap; /* 禁止文本换行 */
    overflow: hidden; /* 隐藏溢出部分 */
    text-overflow: ellipsis; /* 使用省略号表示溢出 */
  }
  span {
    padding: 0 2px;
    box-sizing: border-box;
    border: 1px solid gray;
    color: red;
    border-radius: 2px;
  }
  .desc {
    margin-top: 5px;
    width: 270px;
    height: 20px;
    line-height: 20px;
    white-space: nowrap; /* 禁止文本换行 */
    overflow: hidden; /* 隐藏溢出部分 */
    text-overflow: ellipsis; /* 使用省略号表示溢出 */
    color: gray;
  }
  .icon-bofang {
    top: 50%;
    font-size: 20px;
    right: 50px;
    transform: translateY(-50%);
    position: absolute;
  }
}
</style>
