<template>
  <div class="content">
    <Scroll
      class="scrollWrapper"
      :data="content.story"
      ref="scroll"
      :pullup="true"
      :listenScroll="true"
      @scroll="scroll"
      :probeType="2"
    >
      <div class="scrollContent" ref="scrollContent">
        <p class="title">{{ content.title }}</p>
        <div class="body" ref="body">
          <div v-for="(item, index) in section" :key="index">
            <div
              v-for="(subItem, indey) in item['story-subsections']"
              :key="indey"
            >
              <div class="bodyPart" v-html="subItem.content" ref="p"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="progressBar" ref="progressBar" v-show="isProgressShow"></div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/Scroll/Scroll";
import { mapGetters, mapMutations } from "vuex";
import { Dialog, Notify } from "vant";
//固定划分线HR的高度
const HR_HEIGHT = 61;
export default {
  components: {
    Scroll,
  },
  created() {
    this.touchInf = {};
  },
  data() {
    return {
      readRatio: 0, //进度条比例
      allP: [], //存储所有p元素和hr元素
      allHeight: [0], //p元素的前缀和数组
    };
  },
  props: {
    content: {
      type: Object,
      default() {
        return {};
      },
    },
    currentPos: {
      type: Number,
      default: 0,
    },
    fontSize: {
      type: Number,
      default: 17,
    },
    isProgressShow: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    //取得文章高度
    this.contentHeight = this.$refs.scrollContent.clientHeight;
    this.$refs.p.forEach((x) => this._getP(x));
    this._calcHeight(this.allP);

    this.$nextTick(() => {
      this.$emit("contentheight", this.allHeight);
      this._initPos();
    });

    //页面刷新或者关闭时,将当前阅读的位置存进vuex，并序列化进localStorage
    window.onbeforeunload = () => {
      //离开当前页面时，将阅读进度存入vuex,并将vuex的所有值存入本地存储
      this._save(this.content.title, this.readRatio.toFixed(0));
      localStorage.setItem("lolStories", JSON.stringify(this.hasRead));
    };
  },
  computed: {
    //大段落。一般一篇文章就一段
    section() {
      let section = [];
      for (let i = 0; i < this.content.story.length; i++) {
        section.push(this.content.story[i]);
      }
      return section;
    },
    ...mapGetters({
      currentPosIndex: "getCurrentIndex", //当前段落index
      hasRead: "getHasRead", //所有文章阅的读进度
      storyUrlRatio: "getStoryUrlRatio", //当前文章的阅读进度
    }),
  },
  methods: {
    //滚动获得y得高度，判断阅读得百分比
    scroll(pos) {
      let posY = -pos.y;
      //阅读百分比
      this.readRatio = ((posY + window.innerHeight) / this.contentHeight) * 100;
      if (this.readRatio > 100) {
        //阻止误差
        this.readRatio = 100;
      }
      this.$emit("scroll", posY);
    },
    //获取所有的p元素，包括hr元素
    _getP(arr) {
      if (arr.nodeName === "P" && arr.innerText !== "***") {
        //因为日文中有***作为引用符号，所有需要去掉，保证每个版本的高度一致
        arr.clientRect = arr.getBoundingClientRect();
        this.allP.push(arr);
        return;
      }
      if (arr.nodeName === "HR") {
        //固定划分线的高度
        arr.clientRect = {};
        arr.clientRect.height = HR_HEIGHT;
        this.allP.push(arr);
        return;
      }
      if (arr.children.length) arr.children.forEach((x) => this._getP(x));
    },
    //计算出所有p元素的前缀和，用于滚动时，求出当前在哪个p
    _calcHeight(allP) {
      for (let i = 0; i < allP.length; i++) {
        this.allHeight.push(this.allHeight[i] + allP[i].clientRect.height);
      }
    },
    //保存当村阅读进度给vuex中的hasRead(离开路由,或者刷新页面时调用)
    _save(title, ratio) {
      if (this.content.lang === "chinese") {
        let payload = {
          title: title,
          ratio: ratio,
        };
        this.setHasRead(payload);
      }
    },
    //打开页面时,如果存在本文章的阅读进度的话,自动跳转到阅读进度的位置(只设置中文,其他语言会跟着跳转)
    _initPos() {
      if (
        this.content.lang === "chinese" &&
        this.storyUrlRatio &&
        this.storyUrlRatio !== "0"
      ) {
        const scrollY = +(
          (this.storyUrlRatio / 100) * this.contentHeight -
          window.innerHeight
        ).toFixed(0);

        //跳出弹窗
        Dialog.confirm({
          theme: "round-button",
          lockScroll: false,
          confirmButtonColor: "#0077B6",
          cancelButtonColor: "#e25a5a",
          message: "是否跳转到上次阅读位置?",
        })
          .then(() => {
            this.$refs.scroll.scrollTo(0, -scrollY, 500);
            Notify({
              type: "success",
              message: "已跳转到上次阅读位置",
              duration: 800,
            });
          })
          .catch(() => {
            Notify({ type: "success", message: "从头开始阅读", duration: 800 });
          });
      }
    },
    ...mapMutations({
      setHasRead: "SET_HAS_READ",
    }),
  },
  watch: {
    currentPosIndex(nVal) {
      //根据当前其段落的索引,自动跳段,三个语言都是同样操作
      const posY = this.allHeight[nVal];
      this.$refs.scroll.scrollTo(0, -posY);
    },
    fontSize(nVal) {
      //修改字体大小
      this.$refs.body.style.fontSize = `${nVal}px`;
    },
    readRatio(nVal) {
      this.$refs.progressBar.style.height = `${nVal}vh`;
    },
  },
  beforeDestroy() {
    //离开当前页面时，将阅读进度存入vuex
    this._save(this.content.title, this.readRatio.toFixed(0));
  },
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.content {
  background-color: $color-background;

  .scrollWrapper {
    height: 100vh;
    overflow: hidden;

    .title {
      font-size: 28px;
      line-height: 40px;
      padding: 50px 20px 70px 20px;
    }

    .body {
      text-align: left;
      background-color: $color-card;
      position: relative;
      width: 95%;
      left: 2.5%;
      border-radius: 12px;
      padding: 20px;
      box-sizing: border-box;
      bottom: 20px;
      box-shadow: 0px -2px 9px 0px rgba(67, 74, 78, 0.62);
      font-size: 17px;
      line-height: 2em;

      .bodyPart {
        &>>>hr {
          border: none;
          border-top: 1px solid rgba(91, 90, 86, 0.3);
          margin: 30px 0;
        }
      }
    }

    .progressBar {
      position: fixed;
      top: 0;
      width: 2px;
      overflow: hidden;
      height: 0;
      background: $color-theme;
    }
  }
}
</style>
