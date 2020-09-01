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
        <div class="body">
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
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/Scroll/Scroll";
import { mapGetters } from "vuex";
//固定划分线HR的高度
const HR_HEIGHT = 61;
export default {
  components: {
    Scroll,
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
  },
  mounted() {
    //取得文章高度
    this.contentHeight = this.$refs.scrollContent.clientHeight;
    this.$refs.p.forEach((x) => this._getP(x));
    this._calcHeight(this.allP);
    this.$nextTick(() => {
      this.$emit("contentheight", this.allHeight);
    });
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
      currentPosIndex: "getCurrentIndex",
    }),
  },
  methods: {
    //滚动获得y得高度，判断阅读得百分比
    scroll(pos) {
      let posY = -pos.y;
      //阅读百分比
      this.readRatio = (posY + window.innerHeight) / this.contentHeight;
      if (this.readRatio > 1) {
        //阻止误差
        this.readRatio = 1;
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
  },
  watch: {
    currentPosIndex(nVal) {
      const posY = this.allHeight[nVal];
      this.$refs.scroll.scrollTo(0, -posY);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.content {
  background-color: $color-background;
  border-radius: 12px;

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

      .bodyPart {
        font-size: 17px;
        line-height: 2em;

        &>>>hr {
          border: none;
          border-top: 1px solid rgba(91, 90, 86, 0.3);
          margin: 30px 0;
        }
      }
    }
  }
}
</style>
