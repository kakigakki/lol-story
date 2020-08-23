<template>
  <div class="content">
    <Scroll
      class="scrollWrapper"
      :data="content.story"
      ref="scroll"
      :pullup="true"
    >
      <div class="scrollContent">
        <p class="title">{{ content.title }}</p>
        <div class="body">
          <div v-for="(item, index) in section" :key="index">
            <div
              v-for="(subItem, indey) in item['story-subsections']"
              :key="indey"
            >
              <div class="bodyPart" v-html="subItem.content"></div>
            </div>
          </div>
        </div>
        {{ content }}
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/Scroll/Scroll";
export default {
  components: {
    Scroll,
  },
  mounted() {
    console.log(this.content);
  },
  props: {
    content: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    section() {
      let section = [];
      for (let i = 0; i < this.content.story.length; i++) {
        section.push(this.content.story[i]);
      }
      return section;
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
    height: calc(100vh - 138px);
    overflow: hidden;

    .title {
      font-size: 28px;
      line-height: 40px;
      padding: 50px 20px 50px 20px;
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

      .bodyPart {
        font-size: 17px;
        line-height: 1.75em;

        hr {
          border: none;
          border-top: 1px solid rgba(91, 90, 86, 0.3);
          margin: 30px 0;
        }
      }
    }
  }
}
</style>