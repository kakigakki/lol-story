<template>
  <div class="list">
    <Scroll class="scrollWrapper" :data="stories" ref="scroll">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <StoryCard
          v-for="(item, index) in stories"
          :key="index"
          :title="item.title"
          :hero="item['featured-champions']"
          :imgUrl="item.background.uri"
        ></StoryCard>
      </van-list>
    </Scroll>
  </div>
</template>

<script>
import { storyContent, storyData } from "api/story";
import { List, Cell } from "vant";
import StoryCard from "./child/StoryCard";
import Scroll from "components/Scroll/Scroll";
export default {
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    StoryCard,
    Scroll,
  },
  data() {
    return {
      stories: [],
    };
  },
  created() {
    this._showAllStory();
    this._showStoryDetail();
  },
  methods: {
    _showAllStory() {
      storyData().then((res) => {
        this.stories = this._normalizeStoryList(res.modules);
        console.log(this.stories);
      });
    },
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
    _showStoryDetail() {
      storyContent().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="stylus">
.list {
  position: fixed;
  width: 100%;
  top: 50px;
  bottom: 50px;
}

.scrollWrapper {
  height: 100%;
  overflow: hidden;
}
</style>