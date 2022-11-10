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

// 行の存在に応じて追加もしくは更新を行う
function insertOrUpdate(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  data: string[],
  startColumn: number = 1
) {
  const date: string = data[0];
  let row = findRow(sheet, date);
  if (row > 0) {
    // 行が見つかったら更新
    sheet.getRange(row, startColumn, 1, data.length).setValues([data]);
  } else {
    // 行が見つからなかったら新しくデータを挿入
    const lastRaw = findLastRow(sheet, startColumn);
    insert(sheet, data, lastRaw, startColumn);
  }
}

// 指定した位置に追加する
function insert(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  data: string[],
  startRow: number,
  startColumn: number = 1
) {
  sheet.getRange(startRow, startColumn, 1, data.length).setValues([data]);
}

// 日付比較を行い、データがあれば行番号を返す
function findRow(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  targetDate: string
): number {
  const searchDate = formatDate(new Date(targetDate));
  const allValues = sheet.getDataRange().getValues();

  for (let index = allValues.length - 1; index > 0; index--) {
    const valueDate = formatDate(new Date(allValues[index][0]));
    if (valueDate == searchDate) {
      return index + 1;
    }
  }
  return 0;
}

// 指定した列の最終行番号を返す関数
function findLastRow(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  targetColumn: number
): number {
  return sheet
    .getRange(1, targetColumn)
    .getNextDataCell(SpreadsheetApp.Direction.DOWN)
    .getRow();
}
