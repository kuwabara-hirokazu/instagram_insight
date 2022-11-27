## Instagram Insight

[Instagram グラフ API](https://developers.facebook.com/docs/instagram-api)を利用してインスタグラムのインサイト情報を集計する GAS プログラム。

集計情報を Google スプレッドシートに入力する。

## 主なプログラム

### ユーザーの基本情報を集計

- 取得項目: フォロワー数, 投稿数
- API: https://developers.facebook.com/docs/instagram-api/reference/ig-user

### ユーザーのインサイトを集計

- 取得項目: リーチ数, インプレッション数, プロフィール閲覧数
- API: https://developers.facebook.com/docs/instagram-api/reference/ig-user/insights

### 投稿の基本情報を集計

- 取得項目: 投稿日, ID, タイトル, 投稿種類, URL, いいね数, コメント数
- API: https://developers.facebook.com/docs/instagram-api/reference/ig-media

### 投稿のインサイトを集計

- 取得項目: 保存数, インプレッション数, リーチ数
- API: https://developers.facebook.com/docs/instagram-api/reference/ig-media/insights

## Image
|UserInsight|投稿Insight|
|----|----|
|![スクリーン ショット 2022-11-27 に 10 59 25 午前](https://user-images.githubusercontent.com/62511320/204115811-f4e2ff77-e5e7-4f83-b2a9-335b4659a95c.png)|![スクリーン ショット 2022-11-27 に 10 33 26 午前](https://user-images.githubusercontent.com/62511320/204115718-27dd759e-3863-4f37-8822-313af701a7ea.png)|

|時間別Insight|Triggerマスタ|
|----|----|
|![スクリーン ショット 2022-11-27 に 10 35 55 午前](https://user-images.githubusercontent.com/62511320/204115734-50a48c01-db62-4597-906e-dc4fca74548c.png)|![スクリーン ショット 2022-11-27 に 10 37 15 午前](https://user-images.githubusercontent.com/62511320/204115739-8236cbbe-9b57-4bd5-9aa0-5f217b85f3d6.png)|

## GAS スクリプトプロパティ

事前に下記設定が必要

- INSTAGRAM_ACCESS_TOKEN : Instagram グラフ API を使用するためのアクセストークン
- INSTAGRAM_ID : Instagram グラフ API で集計するアカウントの ID
- SPREAD_SHEET_ID : Google スプレッドシートの ID
