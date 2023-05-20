<template>
  <div id="app">
    <index></index>
    <router-view />
  </div>
</template>
<script>
import Index from "@/components/Index.vue";
export default {
  data() {
    return {};
  },
  components: {
    Index,
  },
};
</script>
<style lang="less">
</style>
