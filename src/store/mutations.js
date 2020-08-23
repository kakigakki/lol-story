import * as types from "./mutationType";

export default {
  [types.SET_STORYURL](state, url) {
    state.storyUrl = url;
  },
};