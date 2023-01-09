/**
 * ユーザー情報を集計してシートに入力する
 * 指定した数の投稿を集計してシートに入力する
 */
function analyzeDaily() {
  analyzeUser();
  analyzeUserInsight();
  analyzeMedia(false);
  analyzeMediaInsights(false);
}

/**
 * 全ての投稿の基本情報を集計してシートに入力する
 * 時間がかかるので単体で実行させる
 */
function analyzeMediaWeekly() {
  analyzeMedia(true);
}

/**
 * 全ての投稿のインサイトを集計してシートに入力する
 * 時間がかかるので単体で実行させる
 */
function analyzeMediaInsightsWeekly() {
  analyzeMediaInsights(true);
}
