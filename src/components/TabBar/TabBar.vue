<template>
  <van-tabbar
    route
    active-color="#0077B6"
    inactive-color="#293241"
    v-model="active"
    class="tabbar"
    :class="{'showTabbar':isShow}"
  >
    <van-tabbar-item replace to="/list" icon="bars">全部</van-tabbar-item>
    <van-tabbar-item replace to="/hero" icon="fire">英雄</van-tabbar-item>
    <van-tabbar-item replace to="/region" icon="map-marked">地区</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters({
      isShow: "getIsTabbarShow",
    }),
  },
};
</script>

<style lang="stylus">
@import '~common/stylus/variable';

.tabbar {
  transform: translate3d(0, 100%, 0);
  transition: 0.3s all;
}

.showTabbar {
  transform: translate3d(0, 0, 0);
}
</style>
