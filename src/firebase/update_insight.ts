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

  const COLUMN_START_INDEX = 2;
  const lastRow = findLastRow(sheet, COLUMN_START_INDEX);
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
      title: value[3],
      mediaType: value[4],
      mediaUrl: value[5],
      permalink: value[6],
      likeCount: value[7],
      commentsCount: value[8],
      saved: value[9],
      impression: value[10],
      reach: value[11],
      saveRate: value[12],
      foodType: value[13],
    };
    dataList.push(data);
  }
  return dataList;
}
