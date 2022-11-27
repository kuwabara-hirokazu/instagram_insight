/**
 * 指定した数の投稿のインサイトを集計してシートに入力する
 */
function analyzeMediaInsights() {
  const sheet = getSheet(PAGE_POST_INSIGHT);

  const lastRow = findLastRow(sheet, 1);
  const startRow = lastRow - ANALYZE_COUNT;
  const START_COLUMN = 8;
  const FOOD_TYPE_COLUMN = 12;

  for (let row = startRow; row <= lastRow; row++) {
    const feedId = sheet.getRange(row, 2).getValue();
    const isFeed = sheet.getRange(row, 4).getValue() == TYPE_FEED;

    const insights = getMediaInsight(feedId, isFeed);
    if (insights.length === 0) continue;
    insertOrUpdateMediaInsight(sheet, insights, row, START_COLUMN);

    if (isFeed) insertFoodType(sheet, row, FOOD_TYPE_COLUMN);
  }
}

/**
 * ApiDoc https://developers.facebook.com/docs/instagram-api/reference/ig-media/insights
 */
function getMediaInsight(feedId: string, isFeed: boolean): Insight[] {
  const graphApi = GRAPH_API_PATH + feedId + "/insights";
  const param = isFeed
    ? "?metric=saved,impressions,reach"
    : "?metric=saved,plays,reach";
  const facebookUrl = `${
    graphApi + param
  }&period=day&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  const response = executeApi(facebookUrl);
  if (typeof response === "undefined") return [];

  const insights = response.data as Insight[];
  return insights;
}

/**
 * Mediaインサイト情報を入力・更新する
 */
function insertOrUpdateMediaInsight(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  insights: Insight[],
  startRow: number,
  startColumn: number
) {
  for (const insight of insights) {
    const insightValue = insight.values[0].value;
    switch (insight.name) {
      case "saved":
        sheet.getRange(startRow, startColumn).setValue(insightValue);
        break;
      case "impressions":
      case "plays":
        sheet.getRange(startRow, startColumn + 1).setValue(insightValue);
        break;
      case "reach":
        sheet.getRange(startRow, startColumn + 2).setValue(insightValue);
        break;
    }
  }
}

/**
 * Foodジャンルを入力する
 */
function insertFoodType(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  row: number,
  column: number
) {
  const value = sheet.getRange(row - 1, column).getValue();
  // 前の行が空白だった場合は２つ前の行から取得する
  const preValue =
    value === "" ? sheet.getRange(row - 2, column).getValue() : value;
  switch (preValue) {
    case FOOD_TYPE_MAIN:
      sheet.getRange(row, column).setValue(FOOD_TYPE_CAFE);
      break;
    case FOOD_TYPE_CAFE:
      sheet.getRange(row, column).setValue(FOOD_TYPE_OTHER);
      break;
    case FOOD_TYPE_OTHER:
      sheet.getRange(row, column).setValue(FOOD_TYPE_MAIN);
      break;
  }
}
