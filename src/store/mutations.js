import * as types from "./mutationType";

export default {
  [types.SET_STORYURL](state, url) {
    state.storyUrl = url;
  },
  [types.SET_STORYURL_RATIO](state, urlRatio) {
    state.storyUrlRatio = urlRatio
  },
  [types.SET_TABBAR_SHOW](state, isShow) {
    state.isTabarShow = isShow;
  },
  [types.SET_CURRENT_POS_INDEX](state, curIdx) {
    state.currentIndex = curIdx
  },
  [types.SET_HAS_READ](state, { title, ratio }) {
    let data = Object.assign({}, state.hasRead, {
      [title]: ratio
    })
    state.hasRead = data
  },
  [types.SET_ALL_STORIES](state, stories) {
    state.hasRead = stories
  }
};