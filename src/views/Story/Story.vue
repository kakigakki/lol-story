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
      <van-tabs
        v-model="active"
        animated
        swipeable
        sticky
        class="tabs"
        v-if="Object.keys(chineseVer).length"
      >
        <van-tab title="标签 1">
          <van-list>
            <Content :content="chineseVer" />
          </van-list>
        </van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
      </van-tabs>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { storyContent } from "api/story";
import { Icon, Row, Col, Tab, Tabs, List } from "vant";
import { StoryCon } from "common/js/story.js";
import Content from "./child/Content";

export default {
  data() {
    return {
      active: 0,
      chineseVer: {},
    };
  },
  computed: {
    ...mapGetters({
      storyUrl: "getStoryUrl",
    }),
  },
  components: {
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    Content,
  },
  created() {
    this._showStoryDetail(this.storyUrl);
  },
  methods: {
    _showStoryDetail(uri) {
      storyContent(uri).then((res) => {
        console.log(res);
        this.chineseVer = new StoryCon(
          res.story.title,
          res.story.subtitle,
          res.story["story-sections"]
        );
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

.story {
  position: fixed;
  z-index: 150;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .tabs {
    top: 44px;
  }

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
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>