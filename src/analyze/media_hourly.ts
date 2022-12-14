/**
 * 最新投稿を集計してシートに入力する
 */
function analyzeMediaHourly() {
  // メディア情報(Feed/Reel)を集計
  const latestMedia = getMediaList(1)[0];

  const timestamp = formatDateTime(new Date(latestMedia.timestamp));
  const caption = latestMedia.caption.substring(68, 77); // 長いので適当な長さで抽出
  const isFeed = latestMedia.media_type != "VIDEO";
  const mediaType = isFeed ? TYPE_FEED : TYPE_REEL;

  const sheet = getSheet(PAGE_POST_INSIGHT_HOURLY);
  const nowTime = formatTime(new Date());
  const data = [
    nowTime,
    timestamp,
    latestMedia.id,
    caption,
    mediaType,
    latestMedia.permalink,
    latestMedia.like_count,
    latestMedia.comments_count,
  ];
  const startRow = findLastRow(sheet, 3) + 1;
  const START_COLUMN = 2;
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
