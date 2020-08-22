<template>
  <div class="wrapper">
    <van-row type="flex" justify="center">
      <van-col class="title" span="22">{{ title }}</van-col>
    </van-row>

    <van-row type="flex" justify="center">
      <van-col
        class="card"
        span="22"
        :style="{
          'background-image': 'url(' + imgUrl + ')',
        }"
      >
        <van-row class="name">
          <van-col
            class="heroName"
            v-for="(item, index) in hero"
            :key="index"
            >{{ item.name }}</van-col
          >
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Col, Row } from "vant";
export default {
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
  },
  data() {
    return {
      HeroColor: ["#247ba0", "#50514f", "f25f5c", "ffe066", "#70c1b3"],
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
    imgUrl: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl';

.wrapper {
  margin-top: 15px;
}

.card {
  position: relative;
  box-sizing: border-box;
  padding: 30px 5px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background-size: cover;
  background-position-y: -10px;
  background-repeat: no-repeat;
}

.title {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: $color-card;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  font-weight: 700;
}

.name {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
}

.heroName {
  padding: 0 4px;
  margin: 0 0 2px 2px;
  background-color: $color-theme;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  color: $color-card;
}
</style>