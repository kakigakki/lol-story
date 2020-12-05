# lol-story

## 人気 e-sports ゲームの「リーグオブレジェンド」の世界観を描く小説を多言語（CH,JP,EN）で簡単に読める WEB アプリ

自分はたまに中国語版、日本語版、英語版とも読みたい時に、複数のサイトを開いて、違う言語の文章を手動で合わせしながら、読むしかないですので。
より簡単に多言語で読めるよう、このアプリの開発を始めました。

## アプリ

http://106.55.149.238/lolStory

## スキル

-   Javascript,Node.js,Html,Css
-   vue ：Javascript フレームワーク
-   vuex : 状態管理
-   vueRouter : SPA 開発ルーター
-   better-scroll : スクロールライブラリ
-   vant :css フレームワーク
-   stylus :css プリプロセッサ
-   express :API 取得

## 環境

-   Tencent Cloud (サーバー)
-   nginx

## 小説取得元：

-   https://universe.leagueoflegends.com/ja_JP/
-   https://universe.leagueoflegends.com/en_US/
-   https://yz.lol.qq.com/zh_CN/

## 実装機能

-   エピソード一覧表示画面
-   画像付き/なし切替
-   各エピソードのキャラクタータグ表示
-   各エピソードの進捗表示
-   各エピソード内容表示（中国語、日本語、英語）
-   多言語切替時、進捗同期（いちいち単語探さずに済む）
-   フォント調整
-   エピソード進捗保存（localSession 利用）

## 未実装機能

-   すべてのキャラクター一覧画面
-   すべての地域一覧画面
-   エピソード検索機能

## 全体イメージ

    ![20201204190245](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20201204190245.png)
    ![20201204185821](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20201204185821.png)
    ![20201204190015](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20201204190015.png)
    ![20201204190036](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20201204190036.png)
    ![20201204190124](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20201204190124.png)
    ![20201204190154](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20201204190154.png)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
