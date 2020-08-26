<template>
  <div class="content">
    <Scroll class="scrollWrapper" :data="content.story" ref="scroll" :pullup="true">
      <div class="scrollContent">
        <p class="title">{{ content.title }}</p>
        <div class="body">
          <div v-for="(item, index) in section" :key="index">
            <div v-for="(subItem, indey) in item['story-subsections']" :key="indey">
              <div class="bodyPart" v-html="subItem.content"></div>
            </div>
          </div>
        </div>
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
