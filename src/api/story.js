import axios from "axios";

const debug = process.env.NODE_ENV !== "production";
export function storyData() {
    const url = debug ?
        "/api/storyList" :
        "http://ustbhuangyi.com/music/api/getSingerList";
    return axios.get(url).then((res) => res.data);
}

export function storyContent(uri) {
    const url = debug ?
        `/api/story${uri}` :
        "http://ustbhuangyi.com/music/api/getSingerList";
    return axios.get(url).then((res) => res.data);
}

export function storyContent2(uri) {
    const url = debug ?
        `/api/story2${uri}` :
        "http://ustbhuangyi.com/music/api/getSingerList";
    return axios.get(url).then((res) => res.data);
}