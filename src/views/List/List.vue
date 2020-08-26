<template>
  <div class="list" v-if="shownStoriesCard.length">
    <ToolBar @changeListView="changeListView"></ToolBar>
    <Scroll
      class="scrollWrapper"
      :data="shownStoriesCard"
      ref="scroll"
      :pullup="true"
      @scrollToEnd="pullupLoading"
    >
      <div class="scrollContent">
        <transition name="slide">
          <div class="storyItem" v-if="isList" :key="1">
            <StoryItem
              v-for="(item, index) in shownStoriesList"
              :key="index"
              :title="item.title"
              :hero="item['featured-champions']"
              @click.native="toStoryPage(item['story-slug'], item.url)"
            ></StoryItem>
          </div>
          <div class="storyCard" v-else :key="2">
            <StoryCard
              v-for="(item, index) in shownStoriesCard"
              :key="index"
              :title="item.title"
              :hero="item['featured-champions']"
              :imgUrl="item.background.uri"
              @click.native="toStoryPage(item['story-slug'], item.url)"
            ></StoryCard>
          </div>
        </transition>
        <van-loading color="#0077B6" v-if="isLoading" class="loadingImg" />
        <p v-if="isFinished" class="finishedText">没有更多了</p>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { storyData } from "api/story";
import { List, Cell, Loading } from "vant";
import StoryCard from "./child/StoryCard";
import StoryItem from "./child/StoryItem";
import ToolBar from "./child/ToolBar";
import Scroll from "components/Scroll/Scroll";
import { mapMutations } from "vuex";
export default {
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Loading.name]: Loading,
    StoryCard,
    Scroll,
    StoryItem,
    ToolBar,
  },
  data() {
    return {
      stories: [],
      shownStoriesCard: [],
      shownStoriesList: [],
      isLoading: false,
      isFinished: false,
      isList: false,
    };
  },
  created() {
    //列表模式中已经展示的数量
    this.shownListNum = 0;
    //卡片模式中已经展示的数量
    this.shownCardNum = 0;
    this._showAllStory();
  },
  methods: {
    //获取异步数据
    _showAllStory() {
      storyData().then((res) => {
        this.stories = this._normalizeStoryList(res.modules);
        //初始化卡片模式数据
        for (let i = 0; i < 5; i++) {
          this.shownStoriesCard.push(this.stories[i]);
        }
        //初始化列表模式数据
        for (let i = 0; i < 30; i++) {
          this.shownStoriesList.push(this.stories[i]);
        }
        console.log(this.stories);
        console.log(this.shownStoriesCard);
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
    //设置故事url
    ...mapMutations({
      setStoryUrl: "SET_STORYURL",
      toggleTabbar: "SET_TABBAR_SHOW",
    }),
    //上拉刷新事件
    pullupLoading() {
      if (this.isList) {
        //列表模式加载，一次30条
        if (this.stories.length != this.shownStoriesList.length) {
          this.isLoading = true;
          this.isFinished = false;
          const shownLen = this.shownStoriesList.length;
          for (let i = shownLen; i < shownLen + 30; i++) {
            if (this.stories.length === this.shownStoriesList.length) {
              break;
            }
            this.shownStoriesList.push(this.stories[i]);
          }
          this.$refs.scroll.finishPullUp();
        } else {
          //没有更多的结果时,设置为加载图片隐藏
          this.isLoading = false;
          this.isFinished = true;
        }
      } else {
        //卡片模式加载，一次5条
        if (this.stories.length != this.shownStoriesCard.length) {
          this.isLoading = true;
          this.isFinished = false;
          const shownLen = this.shownStoriesCard.length;
          for (let i = shownLen; i < shownLen + 5; i++) {
            if (this.stories.length === this.shownStoriesCard.length) {
              break;
            }
            this.shownStoriesCard.push(this.stories[i]);
          }
          this.$refs.scroll.finishPullUp();
        } else {
          //没有更多的结果时,设置为加载图片隐藏
          this.isLoading = false;
          this.isFinished = true;
        }
      }
      this.$refs.scroll.refresh();
    },
    changeListView() {
      this.isList = !this.isList;
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

  .scrollWrapper {
    height: calc(100vh - 138px);
    overflow: hidden;
  }

  .loadingImg {
    padding: 20px;
  }

  .finishedText {
    padding: 12px;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
  }
}

.slide-enter-active, .slide-leave-active {
  transition: 2s all;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(-100%, 0, 0);
}
</style>