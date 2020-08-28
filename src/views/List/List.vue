<template>
  <div class="list" v-if="shownStoriesCard.length">
    <ToolBar @changeListView="changeListView"></ToolBar>
    <Scroll
      class="scrollWrapper"
      :data="shownStoriesCard"
      ref="scroll"
      :pullup="true"
      @scrollToEnd="pullupLoading"
      :probeType="3"
    >
      <div class="scrollContent">
        <transition name="slide" appear mode="out-in">
          <div v-if="isList" class="storyItem" key="1">
            <StoryItem
              v-for="(item, index) in shownStoriesList"
              :key="index"
              :title="item.title"
              :hero="item['featured-champions']"
              @click.native="toStoryPage(item['story-slug'], item.url)"
            ></StoryItem>
            <van-loading color="#0077B6" v-if="isLoading" class="loadingImg" />
            <p v-if="isFinished" class="finishedText">没有更多了</p>
          </div>
          <div v-else class="storyCard" key="2">
            <StoryCard
              v-for="(item, index) in shownStoriesCard"
              :key="index"
              :title="item.title"
              :hero="item['featured-champions']"
              :imgUrl="item.background.uri"
              @click.native="toStoryPage(item['story-slug'], item.url)"
            ></StoryCard>
            <van-loading color="#0077B6" v-if="isLoading" class="loadingImg" />
            <p v-if="isFinished" class="finishedText">没有更多了</p>
          </div>
        </transition>
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
      isList: true,
    };
  },
  created() {
    //let localStories = JSON.parse(localStorage.getItem("stories"));
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
    //跳转到阅读界面
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
        this._pullupLoadData(this.shownStoriesList, 30);
      } else {
        //卡片模式加载，一次5条
        this._pullupLoadData(this.shownStoriesCard, 5);
      }
      this.$refs.scroll.refresh();
    },
    //改变模式
    changeListView() {
      this.isList = !this.isList;
    },
    //上拉加载
    _pullupLoadData(list, nums) {
      if (this.stories.length != list.length) {
        this.isLoading = true;
        this.isFinished = false;
        const shownLen = list.length;
        for (let i = shownLen; i < shownLen + nums; i++) {
          if (this.stories.length === list.length) {
            break;
          }
          list.push(this.stories[i]);
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

.slide-leave-to, .slide-enter {
  transform: translate3d(-100%, 0, 0);
}

.slide-enter-active, .slide-leave-active {
  transition: 0.2s all;
}
</style>