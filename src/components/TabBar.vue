<template>
  <van-tabbar
    route
    active-color="#07c160"
    inactive-color="#000"
    v-model="active"
  >
    <van-tabbar-item replace to="/" icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item replace to="/about" icon="search">标签</van-tabbar-item>
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

<style></style>
