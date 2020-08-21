import axios from "axios";

const debug = process.env.NODE_ENV !== "production";
export function storyData() {
    const url = debug ?
        "/api/storyList" :
        "http://ustbhuangyi.com/music/api/getSingerList";
    return axios.get(url).then((res) => res.data);
}

export function storyContent() {
    const url = debug ?
        `/api/story/zh_cn/story/yone-color-story` :
        "http://ustbhuangyi.com/music/api/getSingerList";
    return axios.get(url).then((res) => res.data);
}