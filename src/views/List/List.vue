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
              :ratio="item.ratio"
              @click.native="
                toStoryPage(item['story-slug'], item.url, item.ratio)
              "
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
              @click.native="toStoryPage(item['story-slug'], item.url, null)"
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
import { mapMutations, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters({
      lolStories: "getHasRead",
    }),
  },
  created() {
    //获得本地阅读进度
    this.localStories = JSON.parse(localStorage.getItem("lolStories"));
    //将所有阅读进度放入vuex
    this.setAllStories(this.localStories);
    this._showAllStory();
  },
  methods: {
    //获取异步数据
    _showAllStory() {
      storyData().then((res) => {
        this.stories = this._normalizeStoryList(res.modules);
        //设置每个故事的本地阅读进度
        this._setAllReadRatio();
        //初始化卡片模式数据
        for (let i = 0; i < 5; i++) {
          this.shownStoriesCard.push(this.stories[i]);
        }
        //初始化列表模式数据
        for (let i = 0; i < 30; i++) {
          this.shownStoriesList.push(this.stories[i]);
        }
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
    toStoryPage(name, url, ratio) {
      this.$router.push({
        path: `/list/${name}`,
      });
      url = url.replace("/zh_cn", "");
      this.setStoryUrl(url); //将url保存到vuex,
      this.setStoryUrlRatio(ratio); //将url对应的阅读进度也保存到vuex
    },
    //设置故事url
    ...mapMutations({
      setStoryUrl: "SET_STORYURL",
      setStoryUrlRatio: "SET_STORYURL_RATIO",
      toggleTabbar: "SET_TABBAR_SHOW",
      setAllStories: "SET_ALL_STORIES",
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
    //获取每次回到List页面时,阅读进度的差异
    _diffObj(obj1, obj2) {
      const newKeys = Object.keys(obj1);
      const oldKeys = Object.keys(obj2);
      let targetStory = {};
      if (newKeys.length === oldKeys.length) {
        for (const key in obj1) {
          if (obj1[key] !== obj2[key]) {
            targetStory.title = key;
            targetStory.ratio = obj1[key];
          }
        }
      } else if (oldKeys.length !== 0) {
        for (const key in obj1) {
          if (!obj2[key]) {
            targetStory.title = key;
            targetStory.ratio = obj1[key];
          }
        }
      }
      return targetStory;
    },
    _setAllReadRatio() {
      //页面加载时,从localStorage将本地阅读进度加载
      if (this.lolStories) {
        const localStoryKeys = Object.keys(this.lolStories);
        for (let i = 0; i < this.stories.length; i++) {
          if (localStoryKeys.includes(this.stories[i].title)) {
            this.stories[i].ratio = this.lolStories[this.stories[i].title];
          }
        }
      }
    },
  },
  watch: {
    //当阅读进度发生变化时,更新对应视图
    lolStories(nVal, oVal) {
      if (!nVal) return;
      let ret = this._diffObj(nVal, oVal); //获取每次回到List页面时,阅读进度的差异
      //如果存在差异就进行List页面相应的视图更新
      if (Object.keys(ret).length) {
        for (let i = 0; i < this.shownStoriesList.length; i++) {
          if (this.shownStoriesList[i].title === ret.title) {
            if (this.shownStoriesList[i].ratio) {
              this.shownStoriesList[i].ratio = ret.ratio;
              //不知道为什么视图不会立即更新,所以加了此方法强制视图进行更新
              this.$forceUpdate();
            } else {
              this.$set(this.shownStoriesList[i], "ratio", ret.ratio);
            }

            return;
          }
        }
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