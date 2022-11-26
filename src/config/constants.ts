/**
 * Instagram Graph APIに関する情報
 */
const GRAPH_API_PATH = "https://graph.facebook.com/v15.0/";
const INSTAGRAM_ID =
  PropertiesService.getScriptProperties().getProperty("INSTAGRAM_ID");
const INSTAGRAM_ACCESS_TOKEN =
  PropertiesService.getScriptProperties().getProperty("INSTAGRAM_ACCESS_TOKEN");

// 投稿種類
const TYPE_FEED = "Feed";
const TYPE_REEL = "Reel";
// 計測する数
const ANALYZE_COUNT = 20;

/**
 * スプレッドシートに関する情報
 */

// シート名
const PAGE_POST_INSIGHT = "投稿Insight";
const PAGE_POST_INSIGHT_HOURLY = "時間別Insight";
const PAGE_USER_INSIGHT = "UserInsight";
const PAGE_MASTER = "Triggerマスタ";

/**
 * トリガーに関する情報
 */

// トリガーとなるメソッド名
const TRIGGER_FUNCTION_MEDIA_HOURLY = "analyzeMediaHourly";
