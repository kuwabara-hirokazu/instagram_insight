function analyzeMediaHourly() {
  // メディア情報(Feed/Reel)を集計
  const latestMedia = getMediaList(1)[0];

  const timestamp = formatDateTime(new Date(latestMedia.timestamp));
  const caption = latestMedia.caption.substring(64, 73); // 長いので適当な長さで抽出
  const isFeed = latestMedia.media_type != "VIDEO";
  const mediaType = isFeed ? TYPE_REEL : TYPE_FEED;

  const sheet = getSheet(PAGE_POST_INSIGHT_HOURLY);
  const data = [
    timestamp,
    latestMedia.id,
    caption,
    mediaType,
    latestMedia.permalink,
    latestMedia.like_count,
    latestMedia.comments_count,
  ];
  const startRow = findLastRow(sheet, 3) + 1;
  const START_COLUMN = 3;
  // データ入力
  insert(sheet, data, startRow, START_COLUMN);

  // メディアインサイトを集計
  const mediaInsights = getMediaInsight(latestMedia.id, isFeed);

  // データ入力
  insertOrUpdateMediaInsight(
    sheet,
    mediaInsights,
    startRow,
    START_COLUMN + data.length
  );
}
