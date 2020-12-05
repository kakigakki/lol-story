<template>
  <transition name="slide" appear>
    <div class="story">
      <van-row class="head" :class="{ active: isUIShow }" align="center">
        <van-col span="3">
          <van-icon
            class="icon"
            name="arrow-left"
            color="#0077B6"
            size="25"
            @click.native="backToList"
          />
        </van-col>
        <van-col class="title" span="18">{{ chineseVer.title }}</van-col>
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
        :lazy-render="false"
      >
        <van-tab title="中文">
          <Content
            @scroll="chineseScroll"
            @contentheight="chineseHeight"
            :content="chineseVer"
            @click.native="showUI"
            :font-size="fontSize"
            :isProgressShow="isProgressShow"
          />
        </van-tab>
        <van-tab title="日本語" v-if="Object.keys(japaneseVer).length">
          <Content
            @scroll="japaneseScroll"
            @contentheight="japaneseHeight"
            :content="japaneseVer"
            @click.native="showUI"
            :font-size="fontSize"
            :isProgressShow="isProgressShow"
          />
        </van-tab>
        <van-tab title="English" v-if="Object.keys(englishVer).length">
          <Content
            @scroll="englishScroll"
            @contentheight="englishHeight"
            :content="englishVer"
            @click.native="showUI"
            :font-size="fontSize"
            :isProgressShow="isProgressShow"
          />
        </van-tab>
      </van-tabs>

      <van-popup
        v-model="isPopupShow"
        round
        position="bottom"
        :style="{ height: '35%' }"
        @closed="closePopup"
        class="popup"
      >
        <div>
          <p class="settingOpt">字体</p>
          <van-slider
            v-model="fontSize"
            active-color="#0077B6"
            bar-height="3px"
            max="25"
            min="12"
          >
            <template #button>
              <div class="custom-button">
                {{ fontSize }}
              </div>
            </template>
          </van-slider>
        </div>
        <div>
          <p class="settingOpt">字间距</p>
          <van-slider
            v-model="lineHeight"
            active-color="#0077B6"
            bar-height="3px"
            :disabled="true"
          >
            <template #button>
              <div class="custom-button">
                {{ lineHeight }}
              </div>
            </template>
          </van-slider>
        </div>
        <div class="switch">
          <p class="settingOpt">阅读进度</p>
          <van-switch
            v-model="isProgressShow"
            active-color="#0077B6"
            class="vanSwitch"
            size="25px"
          />
        </div>
      </van-popup>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { storyContent, storyContent2 } from "api/story";


import { Icon, Row, Col, Tab, Tabs, List, Popup, Slider, Switch } from "vant";

import { StoryCon } from "common/js/story.js";
import Content from "./child/Content";

const CH = 0;
const JA = 1;
const EN = 2;

export default {
  data() {
    return {
      active: 0,
      chineseVer: {},
      isUIShow: false,
      isPopupShow: false,
      japaneseVer: {},
      englishVer: {},
      storyHeight: {
        chinese: null,
        japanese: null,
        english: null,
      },

      fontSize: 17,
      isProgressShow: true,
    };
  },
  computed: {
    ...mapGetters({
      storyUrl: "getStoryUrl",
    }),
    lineHeight() {
      return this.fontSize * 2;
    },
  },
  components: {
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Popup.name]: Popup,


    [Slider.name]: Slider,
    [Switch.name]: Switch,

    Content,
  },
  created() {
    this.currentPos = {
      chinese: 0,
      japanese: 0,
      english: 0,
    };
    this.currentPosIndex = 0;
    if (this.storyUrl === "") {
      this.$router.back();
      return;
    }
    this._showStoryDetail(this.storyUrl);
  },
  methods: {
    _showStoryDetail(uri) {
      //中文版本
      let sendUri = "";
      sendUri = `/zh_cn${uri}`;
      storyContent(sendUri).then((res) => {
        this.chineseVer = new StoryCon(
          res.story.title,
          res.story.subtitle,
          res.story["story-sections"],
          "chinese"
        );
      });
      //日文版本
      sendUri = `/ja_jp${uri}`;
      storyContent2(sendUri).then((res) => {
        this.japaneseVer = new StoryCon(
          res.story.title,
          res.story.subtitle,
          res.story["story-sections"],
          "japanese"
        );
      });

      //英文版本
      sendUri = `/en_us${uri}`;
      storyContent2(sendUri).then((res) => {
        this.englishVer = new StoryCon(
          res.story.title,
          res.story.subtitle,
          res.story["story-sections"],
          "english"
        );
      });
    },
    _getCurrentPosIndex(heights, currentPos) {
      for (let i = 0; i < heights.length - 1; i++) {
        if (currentPos >= heights[i] && currentPos < heights[i + 1]) {
          return i;
        }
      }
      return heights.length - 1;
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
    chineseScroll(posY) {
      //获取中文版滚动距离
      this.currentPos.chinese = posY;
    },
    japaneseScroll(posY) {
      //获取日文版滚动距离
      this.currentPos.japanese = posY;
    },
    englishScroll(posY) {
      //获取英文版滚动距离
      this.currentPos.english = posY;
    },
    chineseHeight(height) {
      //获取中文版内容高度前缀和
      this.storyHeight.chinese = height;
    },
    japaneseHeight(height) {
      //获取日文版内容高度前缀和
      this.storyHeight.japanese = height;
    },
    englishHeight(height) {
      //获取英文版内容高度前缀和
      this.storyHeight.english = height;
    },
    ...mapMutations({
      toggleTabbar: "SET_TABBAR_SHOW",
      setCurrentPosIndex: "SET_CURRENT_POS_INDEX",
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
    active(nVal, oVal) {
      switch (oVal) {
        case CH:
          this.currentPosIndex = this._getCurrentPosIndex(
            this.storyHeight.chinese,
            this.currentPos.chinese
          );
          break;
        case JA:
          this.currentPosIndex = this._getCurrentPosIndex(
            this.storyHeight.japanese,
            this.currentPos.japanese
          );
          break;
        case EN:
          this.currentPosIndex = this._getCurrentPosIndex(
            this.storyHeight.english,
            this.currentPos.english
          );
          break;
        default:
          break;
      }
      //将旧的标签滚到的index存进vuex中，然后在新的标签中调用
      this.setCurrentPosIndex(this.currentPosIndex);
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

  .popup {
    padding: 10px 10px 30px 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .settingOpt {
        font-size: 16px;
        text-align: center;
        padding: 20px 0;
        align-self: start;
      }

      .custom-button {
        width: 26px;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        background-color: #0077B6;
        border-radius: 100px;
      }

      .vanSwitch {
        align-self: start;
      }
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