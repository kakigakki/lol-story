var express = require('express')
var compression = require('compression')
var axios = require('axios')
var cookieParser = require('cookie-parser')
var history = require('connect-history-api-fallback')


var port = process.env.PORT || 9234

var app = express()

app.use(cookieParser())
app.use(history())

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
        req.path.replace(
            "/api/story2/",
            "https://universe-meeps.leagueoflegends.com/v1/"
        ) + "/index.json";
    axios
        .get(url)
        .then((resp) => {
            res.json(resp.data);
        })
        .catch((e) => {
            console.log(e);
        });
});


app.get('/', function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    return next()
})

app.use(compression())

app.use(express.static('./dist'))

app.use(function(err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {
        return next()
    }

    // handle CSRF token errors here
    res.status(403)
    res.send('屏蔽')
})

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})