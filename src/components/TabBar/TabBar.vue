<template>
  <van-tabbar
    route
    active-color="#0077B6"
    inactive-color="#293241"
    v-model="active"
    class="tabbar"
  >
    <van-tabbar-item replace to="/" icon="bars">全部</van-tabbar-item>
    <van-tabbar-item replace to="/hero" icon="fire">英雄</van-tabbar-item>
    <van-tabbar-item replace to="/region" icon="map-marked"
      >地区</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
};
</script>

<style lang="stylus">
@import '~common/stylus/variable';

.tabbar {
  z-index: 100;
}
</style>
