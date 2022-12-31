/**
 * 指定した数の投稿の基本情報を集計してシートに入力する
 */
function analyzeMedia() {
  const mediaList = getMediaList(ANALYZE_COUNT);
  const sheet = getSheet(PAGE_POST_INSIGHT);
  const START_COLUMN = 2;
  for (const media of mediaList) {
    const timestamp = formatDate(new Date(media.timestamp));
    const id = media.id;
    const caption = media.caption;
    const title = media.caption.substring(68, 77); // 長いので適当な長さで抽出
    const mediaType = media.media_type == "VIDEO" ? TYPE_REEL : TYPE_FEED;
    const mediaUrl = media.media_url;
    const permalink = media.permalink;
    const likeCount = media.like_count;
    const commentsCount = media.comments_count;

    insertOrUpdate(
      sheet,
      [
        timestamp,
        id,
        caption,
        title,
        mediaType,
        mediaUrl,
        permalink,
        likeCount,
        commentsCount,
      ],
      START_COLUMN,
      START_COLUMN
    );
  }

  const ROW_HEIGHT = 21;
  const START_ROW = 2;
  setRowHeight(sheet, ROW_HEIGHT, START_ROW, findLastRow(sheet, START_COLUMN));
}

/**
 * ApiDoc https://developers.facebook.com/docs/instagram-api/reference/ig-media
 */
function getMediaList(pageLimit: number): Media[] {
  const param = `?fields=media.limit(${pageLimit}){caption,media_url,permalink,like_count,comments_count,media_type,timestamp,id}`;
  const facebookUrl = `${
    GRAPH_API_PATH + INSTAGRAM_ID + param
  }&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  const response = executeApi(facebookUrl);
  const mediaList = response.media.data as Media[];

  // 日付古い順に並び替える
  return mediaList.sort(function (a: Media, b: Media) {
    return new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1;
  });
}
