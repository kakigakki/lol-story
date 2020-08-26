<template>
  <div class="item">
    <van-row type="flex" justify="center" align="center" class="wrapper">
      <van-col span="2" offset="1">
        <van-circle v-model="currentRate" size="30" class="circle" />
      </van-col>
      <van-col class="title" span="22">{{ title }}</van-col>
      <van-row class="name">
        <van-col
          class="heroName"
          v-for="(item, index) in hero"
          :key="index"
          :style="{ backgroundColor: HeroColor[index] }"
        >{{ item.name }}</van-col>
      </van-row>
    </van-row>
  </div>
</template>

<script>
import { Col, Row, Circle } from "vant";
export default {
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Circle.name]: Circle,
  },
  data() {
    return {
      HeroColor: ["#247ba0", "#f25f5c", "#50514f", "#43aa8b", "#00171f"],
      currentRate: 50,
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    hero: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.item {
  position: relative;
  top: 10px;

  .wrapper {
    position: relative;
    background-color: $color-card;
    box-sizing: border-box;
    margin-top: 10px;

    .title {
      height: 100%;
      position: relative;
      background-color: $color-card;
      font-size: 15px;
      line-height: 50px;
      text-align: left;
      font-weight: 700;
      padding-left: 10px;
    }

    .name {
      position: absolute;
      z-index: 10;
      top: 0;
      right: 0;
      font-size: 9px;
      text-align: center;
      line-height: 1.6em;

      .heroName {
        padding: 0 4px;
        margin: 0 0 2px 2px;
        background-color: $color-theme;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        color: $color-card;
      }
    }
  }
}
</style>