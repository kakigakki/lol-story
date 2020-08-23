<template>
  <div class="list" v-if="shownStories.length">
    <Scroll
      class="scrollWrapper"
      :data="shownStories"
      ref="scroll"
      :pullup="true"
      @scrollToEnd="pullupLoading"
    >
      <div class="scrollContent">
        <StoryCard
          v-for="(item, index) in shownStories"
          :key="index"
          :title="item.title"
          :hero="item['featured-champions']"
          :imgUrl="item.background.uri"
          @imgLoaded="imgLoad"
          @click.native="toStoryPage(item['story-slug'], item.url)"
        ></StoryCard>
        <van-loading color="#0077B6" v-if="isLoading" />
        <p v-if="isFinished" class="finishedText">
          没有更多了
        </p>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { storyData } from "api/story";
import { List, Cell, Loading } from "vant";
import StoryCard from "./child/StoryCard";
import Scroll from "components/Scroll/Scroll";
import { mapMutations } from "vuex";
export default {
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Loading.name]: Loading,
    StoryCard,
    Scroll,
  },
  data() {
    return {
      stories: [],
      shownStories: [],
      isLoading: false,
      isFinished: false,
    };
  },
  created() {
    this._showAllStory();
  },
  methods: {
    //获取异步数据
    _showAllStory() {
      storyData().then((res) => {
        this.stories = this._normalizeStoryList(res.modules);
        for (let i = 0; i < 5; i++) {
          this.shownStories.push(this.stories.shift());
        }
        console.log(this.stories);
        console.log(this.shownStories);
      });
    },
    //整理异步数据为想要的数据
    _normalizeStoryList(resModules) {
      resModules = resModules
        .filter((x) => {
          return x.type == "story-preview" && x["release-date"];
        })
        .sort((a, b) => {
          return (
            new Date(b["release-date"]).getTime() -
            new Date(a["release-date"]).getTime()
          );
        });
      return resModules;
    },
    //图片加载时,刷新scroll
    imgLoad() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    },
    toStoryPage(name, url) {
      this.$router.push({
        path: `/list/${name}`,
      });
      this.setStoryUrl(url);
    },
    //获取故事url
    ...mapMutations({
      setStoryUrl: "SET_STORYURL",
    }),
    //上拉刷新事件
    pullupLoading() {
      //显示加载图片
      if (this.stories.length) {
        this.isLoading = true;
        for (let i = 0; i < 5; i++) {
          if (!this.stories.length) {
            break;
          }
          this.shownStories.push(this.stories.shift());
        }
        this.$refs.scroll.finishPullUp();
      } else {
        //没有更多的结果时,设置为加载图片隐藏
        this.isLoading = false;
        this.isFinished = true;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.list {
  position: fixed;
  width: 100%;
  top: 44px;
  bottom: 50px;

  .finishedText {
    font-size: 18px;
    line-height: 50px;
    text-align: center;
  }
}

.scrollWrapper {
  height: calc(100vh - 94px);
  overflow: hidden;
}
</style>