/**
 * ユーザーのインサイトを集計してシートに入力する
 */
function analyzeUserInsight() {
  const beginDate = new Date();
  // 前日の0:00にする
  beginDate.setDate(beginDate.getDate() - 1);
  beginDate.setHours(0, 0, 0);
  const endDate = new Date();
  // 前日の23:59にする
  endDate.setDate(endDate.getDate() - 1);
  endDate.setHours(23, 59, 59);

  const userInsight = getUserInsight(beginDate, endDate);

  const sheet = getSheet(PAGE_USER_INSIGHT);
  const startRow = findLastRow(sheet, 1) + 1;
  const START_COLUMN = 1;
  insertUserInsight(sheet, userInsight, startRow, START_COLUMN);
}

/**
 * ApiDoc https://developers.facebook.com/docs/instagram-api/reference/ig-user/insights
 */
function getUserInsight(beginDate: Date, endDate: Date): Insight[] {
  const beginTime = Math.floor(beginDate.getTime() / 1000);
  const endTime = Math.floor(endDate.getTime() / 1000);

  const graphApi = GRAPH_API_PATH + INSTAGRAM_ID + "/insights";
  const metricParam = "?metric=reach,impressions,profile_views";
  const facebookUrl = `${
    graphApi + metricParam
  }&period=day&since=${beginTime}&until=${endTime}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  const response = executeApi(facebookUrl);

  const insights = response.data as Insight[];
  return insights;
}

/**
 * Userインサイト情報を入力する
 */
function insertUserInsight(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  userInsights: Insight[],
  startRow: number,
  startColumn: number
) {
  for (const insight of userInsights) {
    const insightValue = insight.values[0].value;
    switch (insight.name) {
      case "reach":
        sheet.getRange(startRow, startColumn + 4).setValue(insightValue);
        break;
      case "impressions":
        sheet.getRange(startRow, startColumn + 5).setValue(insightValue);
        break;
      case "profile_views":
        sheet.getRange(startRow, startColumn + 6).setValue(insightValue);
        break;
    }
  }
}
