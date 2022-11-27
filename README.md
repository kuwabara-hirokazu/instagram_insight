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

## GAS スクリプトプロパティ

事前に下記設定が必要

- INSTAGRAM_ACCESS_TOKEN : Instagram グラフ API を使用するためのアクセストークン
- INSTAGRAM_ID : Instagram グラフ API で集計するアカウントの ID
- SPREAD_SHEET_ID : Google スプレッドシートの ID
