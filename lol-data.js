const axios = require("axios");

module.exports = function before(app, server, compiler) {
    app.get("/api/storyList", (req, res) => {
        const url = "https://yz.lol.qq.com/v1/zh_cn/explore2/index.json";
        axios
            .get(url)
            .then((resp) => {
                res.json(resp.data);
            })
            .catch((e) => {
                console.log(e);
            });
    });

    app.get("/api/story/*", (req, res) => {
        const url =
            req.path.replace("/api/story/", "https://yz.lol.qq.com/v1/") +
            "/index.json";
        axios
            .get(url)
            .then((resp) => {
                res.json(resp.data);
            })
            .catch((e) => {
                console.log(e);
            });
    });
    app.get("/api/story2/*", (req, res) => {
        const url =
            req.path.replace("/api/story2/", "https://universe-meeps.leagueoflegends.com/v1/") +
            "/index.json";
        axios
            .get(url)
            .then((resp) => {
                res.json(resp.data);
            })
            .catch((e) => {
                console.log(e);
            });
    });
};