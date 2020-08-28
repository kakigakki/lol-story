<template>
  <div class="listView" v-if="shownStoriesCard.length">
    <StoryItem
      v-for="(item, index) in shownStoriesList"
      :key="index"
      :title="item.title"
      :hero="item['featured-champions']"
      @click.native="toStoryPage(item['story-slug'], item.url)"
    ></StoryItem>
    <StoryCard
      v-for="(item, index) in shownStoriesCard"
      :key="index"
      :title="item.title"
      :hero="item['featured-champions']"
      :imgUrl="item.background.uri"
      @click.native="toStoryPage(item['story-slug'], item.url)"
    ></StoryCard>
  </div>
</template>

<script>
import StoryCard from "./child/StoryCard";
import StoryItem from "./child/StoryItem";
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
  props: {
    stories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    toStoryPage(name, url) {
      this.$router.push({
        path: `/list/${name}`,
      });
      this.setStoryUrl(url);
    },
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
</style>