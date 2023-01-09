/**
 * インサイト集計シートから入力データを取得して、Firestoreのインサイトデータを更新する
 */
function updateInsightData(startIndex: number, isTheEnd: boolean) {
  const sheet = getSheet(PAGE_POST_INSIGHT);

  const COLUMN_START_INDEX = 1;
  const lastRow = isTheEnd ? findLastRow(sheet, 2) : 120;
  const ROW_COUNT = 1;
  const columnCount = sheet.getLastColumn();

  for (
    var rowStartIndex = startIndex;
    rowStartIndex <= lastRow;
    rowStartIndex++
  ) {
    // 1行ずつデータを取得
    const value = sheet
      .getRange(rowStartIndex, COLUMN_START_INDEX, ROW_COUNT, columnCount)
      .getValues()[0];

    // 型変換
    const insight: InsightSheetData = {
      postedOrder: value[0],
      timestamp: value[1],
      id: value[2],
      caption: value[3],
      title: value[4],
      mediaType: value[5],
      mediaUrl: value[6],
      permalink: value[7],
      likeCount: value[8],
      commentsCount: value[9],
      saved: value[10],
      impression: value[11],
      reach: value[12],
      saveRate: value[13],
      foodType: value[14],
    };

    // Firestore更新
    updateFirestore(
      FIRESTORE_INSIGHT_PATH + insight.postedOrder,
      insight,
      true
    );

    if (rowStartIndex % 10 == 0) {
      console.log(`currentIndex: ${rowStartIndex}`);
    }
  }
}
