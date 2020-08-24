import * as types from "./mutationType";

export default {
    [types.SET_STORYURL](state, url) {
        state.storyUrl = url;
    },
    [types.SET_TABBAR_SHOW](state, isShow) {
        state.isTabarShow = isShow;
    },
};