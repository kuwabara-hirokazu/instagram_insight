/**
 * Firestoreのインサイトデータを更新する
 */
function updateInsightData() {
  updateFirestore(FIRESTORE_INSIGHT_MEDIA_PATH, getInsightSheetData());
}

/**
 * インサイト集計シートから入力データを取得する
 */
function getInsightSheetData(): InsightSheetData[] {
  const sheet = getSheet(PAGE_POST_INSIGHT);

  const lastRow = findLastRow(sheet, 1);
  const COLUMN_START_INDEX = 1;
  const ROW_COUNT = 1;
  const columnCount = sheet.getLastColumn();
  const dataList: InsightSheetData[] = [];

  for (var rowStartIndex = 2; rowStartIndex <= lastRow; rowStartIndex++) {
    const range = sheet.getRange(
      rowStartIndex,
      COLUMN_START_INDEX,
      ROW_COUNT,
      columnCount
    );
    const value = range.getValues()[0];

    const data: InsightSheetData = {
      timestamp: value[0],
      id: value[1],
      caption: value[2],
      mediaType: value[3],
      permalink: value[4],
      likeCount: value[5],
      commentsCount: value[6],
      saved: value[7],
      impression: value[8],
      reach: value[9],
      saveRate: value[10],
      foodType: value[11],
    };
    dataList.push(data);
  }
  return dataList;
}
