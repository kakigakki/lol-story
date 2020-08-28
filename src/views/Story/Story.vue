<template>
  <transition name="slide" appear>
    <div class="story">
      <van-row class="head" :class="{active:isUIShow}" align="center">
        <van-col span="3">
          <van-icon
            class="icon"
            name="arrow-left"
            color="#0077B6"
            size="25"
            @click.native="backToList"
          />
        </van-col>
        <van-col class="title" span="18">{{chineseVer.title}}</van-col>
        <van-col class="title" span="3">
          <van-icon
            class="icon"
            name="setting-o"
            color="#0077B6"
            size="25"
            @click.native="showPopup"
          />
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
        <van-tab title="中文">
          <van-list>
            <Content :content="chineseVer" @click.native="showUI" />
          </van-list>
        </van-tab>
        <van-tab title="日本語">内容 2</van-tab>
        <van-tab title="English">内容 3</van-tab>
      </van-tabs>

      <van-popup
        v-model="isPopupShow"
        round
        position="bottom"
        :style="{ height: '30%' }"
        @closed="closePopup"
      >内容</van-popup>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { storyContent } from "api/story";
import { Icon, Row, Col, Tab, Tabs, List, Popup } from "vant";
import { StoryCon } from "common/js/story.js";
import Content from "./child/Content";

export default {
  data() {
    return {
      active: 0,
      chineseVer: {},
      isUIShow: false,
      isPopupShow: false,
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
    [Popup.name]: Popup,
    Content,
  },
  created() {
    if (this.storyUrl === "") {
      this.$router.back();
      return;
    }
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
    showUI() {
      this.isUIShow = !this.isUIShow;
    },
    showPopup() {
      this.toggleTabbar(false);
      setTimeout(() => {
        this.isPopupShow = true;
      }, 100);
    },
    closePopup() {
      this.toggleTabbar(true);
    },
    ...mapMutations({
      toggleTabbar: "SET_TABBAR_SHOW",
    }),
  },
  watch: {
    isUIShow(nVal) {
      if (nVal) {
        this.toggleTabbar(true);
      } else {
        this.toggleTabbar(false);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    //因为此时获取不到this，所以用from来拿到vuex中的数据
    from?.matched[0]?.instances?.default?.toggleTabbar(false);

    next();
  },
  beforeRouteLeave(to, from, next) {
    this.toggleTabbar(true);
    next();
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
    transform: translate3d(0, -44px, 0);
    transition: 0.3s all;
  }

  .head {
    position: fixed;
    top: 0;
    height: 44px;
    width: 100%;
    background-color: $color-card;
    transition: 0.3s all;
    transform: translate3d(0, -100%, 0);

    .van-col {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .title {
      font-size: 18px;
      line-height: 44px;
      no-wrap();
    }

    &.active {
      transform: translate3d(0, 0, 0);
    }

    &.active ~ .tabs {
      transform: translate3d(0, 44px, 0);
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