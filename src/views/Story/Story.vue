<template>
  <transition name="slide" appear>
    <div class="story">
      <van-row class="head">
        <van-col span="1">
          <van-icon
            name="arrow-left"
            color="#0077B6"
            size="44"
            @click.native="backToList"
          />
        </van-col>
        <van-col class="title" offset="2">
          斩断
        </van-col>
      </van-row>
      <div>story</div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { storyContent } from "api/story";
import { Icon, Row, Col } from "vant";

export default {
  computed: {
    ...mapGetters({
      storyUrl: "getStoryUrl",
    }),
  },
  components: {
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  created() {
    this._showStoryDetail(this.storyUrl);
  },
  methods: {
    _showStoryDetail(uri) {
      storyContent(uri).then((res) => {
        console.log(res);
      });
    },
    backToList() {
      this.$router.back();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.head {
  position: fixed;
  top: 0;
  height: 44px;
  width: 100%;
  background-color: $color-card;

  .title {
    font-size: 20px;
    line-height: 44px;
    no-wrap();
  }
}

.story {
  position: fixed;
  z-index: 150;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>