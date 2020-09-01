import * as types from "./mutationType";

export default {
    [types.SET_STORYURL](state, url) {
        state.storyUrl = url;
    },
    [types.SET_TABBAR_SHOW](state, isShow) {
        state.isTabarShow = isShow;
    },
    [types.SET_CURRENT_POS_INDEX](state, curIdx) {
        state.currentIndex = curIdx
    }
};