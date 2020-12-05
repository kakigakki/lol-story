// vue.config.js
const path = require("path");
const before = require("./lol-data");

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("components", resolve("src/components"))
            .set("views", resolve("src/views"))
            .set("common", resolve("src/common"))
            .set("api", resolve("src/api"))
            .set("assets", resolve("src/assets"));
    },
    devServer: {
        before,
    },
    css: {
        loaderOptions: {
            less: {
                // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        // 直接覆盖变量
                    },
                },
            },
        },
    },
    publicPath: process.env.NODE_ENV === "production" ? "/lolStory" : "/"
};