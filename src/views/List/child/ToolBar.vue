<template>
  <div class="tool">
    <van-search
      v-model="value"
      shape="round"
      class="search"
      @blur="toggleSearchBar"
      :class="{showBar:seachBarCls}"
    >
      <template v-slot:left-icon>
        <van-icon name="search" class="icon search" size="25" @click="toggleSearchBar" />
      </template>
    </van-search>
    <van-icon name="exchange" class="icon exchange" size="25" @click="changeListView()" />
  </div>
</template>

<script>
import { Icon, Search } from "vant";
export default {
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
  },
  data() {
    return {
      value: "",
      seachBarCls: false,
    };
  },
  methods: {
    toggleSearchBar() {
      this.seachBarCls = !this.seachBarCls;
    },
    changeListView() {
      this.$emit("changeListView");
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.tool {
  position: relative;
  height: 44px;
  color: $color-text;
  font-size: 0;
  background-color: $color-card;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search {
    height: 100%;
    flex-basis: 5%;
    transition: 0.3s all;
    position: relative;

    &.showBar {
      flex-grow: 1;
      opacity: 1;
    }

    .van-cell {
      padding: 5px 2px 5px 0;
    }
  }

  .icon.exchange, .icon.search2 {
    padding: 0 20px;
    margin-bottom: 2px;
  }
}
</style>