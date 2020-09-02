import axios from "axios";

const debug = process.env.NODE_ENV !== "production";
export function storyData() {
    const url = debug ? "/api/storyList" : "http://localhost:5000/api/storyList";
    return axios.get(url).then((res) => res.data);
}

export function storyContent(uri) {
    const url = debug ?
        `/api/story${uri}` :
        `http://localhost:5000/api/story${uri}`;
    return axios.get(url).then((res) => res.data);
}

export function storyContent2(uri) {
    const url = debug ?
        `/api/story2${uri}` :
        `http://localhost:5000/api/story2${uri}`;
    return axios.get(url).then((res) => res.data);
}