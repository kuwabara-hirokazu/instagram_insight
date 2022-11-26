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
const TYPE_Reel = "Reel";

/**
 * スプレッドシートに関する情報
 */

// シート名
const PAGE_POST_INSIGHT = "投稿Insight";
const PAGE_USER_INSIGHT = "UserInsight";
