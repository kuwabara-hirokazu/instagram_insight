/**
 * APIを実行し、Json形式のレスポンスをJavaScript Objectに変換して返す
 */
function executeApi(url: string): any {
  try {
    const encodedURI = encodeURI(url);
    const response: GoogleAppsScript.URL_Fetch.HTTPResponse =
      UrlFetchApp.fetch(encodedURI); // URLから情報を取得
    return JSON.parse(response.getContentText());
  } catch (e) {
    console.log("APIエラー:" + e);
  }
}
