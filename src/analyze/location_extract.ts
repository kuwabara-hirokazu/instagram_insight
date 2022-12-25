/**
 * 指定した数の投稿のインサイトを集計してシートに入力する
 */
function createMapInfo() {
  const mediaList = getMediaList(ANALYZE_COUNT);
  const sheet = getSheet(PAGE_LOCATION_INFO);

  for (const media of mediaList) {
    if (media.media_type == "VIDEO") continue;

    console.log(media.caption);

    const timestamp = formatDate(new Date(media.timestamp));
    const shopName = extractShopName(media.caption);
    const location = extractLocation(media.caption);
    const permalink = media.permalink;

    insertOrUpdate(sheet, [timestamp, shopName, location, permalink]);
  }
}

function extractShopName(caption: string): string {
  const LOCALE_TITLE = "店舗名：";
  const NEAREST_STATION_TITLE = "▶︎ Instagram：";

  const startIndex = caption.indexOf(LOCALE_TITLE) + LOCALE_TITLE.length;
  const endIndex = caption.indexOf(NEAREST_STATION_TITLE);

  const shopName = caption.substring(startIndex, endIndex);
  return shopName.replace(/\s+/g, ""); // 改行・空白を削除
}

function extractLocation(caption: string): string {
  const LOCALE_TITLE = "住所：";
  const NEAREST_STATION_TITLE = "▶︎ 最寄駅：";

  const startIndex = caption.indexOf(LOCALE_TITLE) + LOCALE_TITLE.length;
  const endIndex = caption.indexOf(NEAREST_STATION_TITLE);

  const location = caption.substring(startIndex, endIndex);
  return location.replace(/\s+/g, ""); // 改行・空白を削除
}
