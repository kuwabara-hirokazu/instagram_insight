type Feed = {
  timestamp: Date;
  id: string;
  caption: string;
  media_type: string;
  permalink: string;
  like_count: string;
  comments_count: string;
};

function analyzeFeeds() {
  const feeds = getFeeds(2);
  const sheet = getSheet(PAGE_POST_INSIGHT);
  for (const feed of feeds) {
    const timestamp = formatDate(new Date(feed.timestamp));
    const id = feed.id;
    const caption = feed.caption.substring(64, 73); // 長いので適当な長さで抽出
    const mediaType = feed.media_type == "VIDEO" ? TYPE_Reel : TYPE_FEED;
    const permalink = feed.permalink;
    const likeCount = feed.like_count;
    const commentsCount = feed.comments_count;

    insertOrUpdate(sheet, [
      timestamp,
      id,
      caption,
      mediaType,
      permalink,
      likeCount,
      commentsCount,
    ]);
  }
}

function getFeeds(pageLimit: number): Feed[] {
  const param = `?fields=media.limit(${pageLimit}){caption,media_url,permalink,like_count,comments_count,media_type,timestamp,id}`;
  const facebookUrl = `${
    GRAPH_API_PATH + INSTAGRAM_ID + param
  }&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  const response = executeApi(facebookUrl);
  const feeds = response.media.data as Feed[];

  // 日付古い順に並び替える
  return feeds.reverse();
}
