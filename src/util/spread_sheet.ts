/**
 * 指定した名前に一致するシートを取得する
 */
function getSheet(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
  const ssid =
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");
  if (ssid == null)
    throw Error("スプレッドシートのシートIDを取得できませんでした");

  const spreadsheet = SpreadsheetApp.openById(ssid); //IDでスプレッドシートを開く
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet != null) {
    return sheet;
  } else {
    throw Error("該当のスプレッドシートが見つかりませんでした");
  }
}

/**
 * 行の存在に応じて追加もしくは更新を行う
 */
function insertOrUpdate(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  data: string[],
  startColumn: number = 1,
  dateColumn: number = 1
) {
  const date: string = data[0];
  let row = findRow(sheet, date, dateColumn);
  if (row > 0) {
    // 行が見つかったら更新
    sheet.getRange(row, startColumn, 1, data.length).setValues([data]);
  } else {
    // 行が見つからなかったら新しくデータを挿入
    const lastRow = findLastRow(sheet, startColumn);
    insert(sheet, data, lastRow + 1, startColumn);
  }
}

/**
 * 指定した位置に追加する
 */
function insert(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  data: string[],
  startRow: number,
  startColumn: number = 1
) {
  sheet.getRange(startRow, startColumn, 1, data.length).setValues([data]);
}

/**
 * 日付比較を行い、データがあれば行番号を返す
 */
function findRow(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  targetDate: string,
  dateColumn: number
): number {
  const lastRow = findLastRow(sheet, dateColumn);
  const searchDate = formatDate(new Date(targetDate));
  // 1行目はタイトルのため2行目から比較
  for (let row = 2; row < lastRow + 1; row++) {
    // シートから日付を取得
    const dateString = sheet.getRange(row, dateColumn).getValue();
    const valueDate = formatDate(new Date(dateString));
    // 同日であるか比較
    if (valueDate == searchDate) {
      return row;
    }
  }
  return 0;
}

/**
 * 指定した列の最終行番号を返す
 */
function findLastRow(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  targetColumn: number
): number {
  // 2行目が空白の場合,最終行番号がシートの最下番号を取ってしまうので早期リターンさせる
  if (sheet.getRange(2, targetColumn).isBlank()) return 1;
  return sheet
    .getRange(1, targetColumn)
    .getNextDataCell(SpreadsheetApp.Direction.DOWN)
    .getRow();
}

/**
 * 行幅を固定する
 */
function setRowHeight(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  pixelSize: number,
  startIndex: number,
  endIndex: number
) {
  // 行数が多い場合、行の高さを「データに合わせる」設定に変更されてしまい、
  // sheet.setRowHeight()が期待通りの挙動にならないため、Google Sheets APIを使って変更する
  const requests = {
    updateDimensionProperties: {
      properties: { pixelSize: pixelSize },
      range: {
        sheetId: sheet.getSheetId(),
        startIndex: startIndex,
        endIndex: endIndex,
        dimension: "ROWS",
      },
      fields: "pixelSize",
    },
  };
  const ssid =
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");
  Sheets.Spreadsheets?.batchUpdate({ requests: requests }, ssid);
}
