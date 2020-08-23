<template>
  <div class="wrapper">
    <van-row type="flex" justify="center">
      <van-col class="title" span="24">{{ title }}</van-col>
    </van-row>

    <van-row type="flex" justify="center">
      <van-col class="card" span="24">
        <div class="image">
          <img v-lazy="imgUrl" @load="imgLoad" />
        </div>
        <van-row class="name">
          <van-col
            class="heroName"
            v-for="(item, index) in hero"
            :key="index"
            :style="{ backgroundColor: HeroColor[index] }"
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
  methods: {
    imgLoad() {
      this.$emit("imgLoaded");
    },
  },
  data() {
    return {
      HeroColor: ["#247ba0", "#f25f5c", "#50514f", "#43aa8b", "#00171f"],
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

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.wrapper {
  margin-left: 2.5%;
  margin-right: 2.5%;
  position: relative;
  margin-top: 10px;
  top: 10px;
  margin-bottom: 10px;
  box-shadow: 2px -2px 6px 0px #434a4e9e;
  border-radius: 12px;
}

.card {
  position: relative;
  box-sizing: border-box;
  font-size: 0;
}

.image {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 12rem;

  img {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
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
  font-size: 14px;
  text-align: center;
  line-height: 24px;
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