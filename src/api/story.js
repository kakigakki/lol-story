import axios from "axios";

const debug = process.env.NODE_ENV !== "production";
export function storyData() {
    const url = debug ? "/api/storyList" : "http://106.55.149.238/lolStory/api/storyList";
    return axios.get(url).then((res) => res.data);
}

export function storyContent(uri) {
    const url = debug ?
        `/api/story${uri}` :
        `http://106.55.149.238/lolStory/api/story${uri}`;
    return axios.get(url).then((res) => res.data);
}

export function storyContent2(uri) {
    const url = debug ?
        `/api/story2${uri}` :
        `http://106.55.149.238/lolStory/api/story2${uri}`;
    return axios.get(url).then((res) => res.data);
}