type Feed = {
  timestamp: Date;
  id: string;
  caption: string;
  media_type: string;
  permalink: string;
  like_count: number;
  comments_count: number;
};

function main() {
  const feeds = getFeeds(2);
  for (const feed of feeds) {
    const mediaType = feed.media_type == "VIDEO" ? TYPE_Reel : TYPE_FEED;
    console.log(feed.media_type);
    console.log(mediaType);
  }
}

function getFeeds(pageLimit: number): Feed[] {
  const param = `?fields=media.limit(${pageLimit}){caption,media_url,permalink,like_count,comments_count,media_type,timestamp,id}`;
  const facebookUrl = `${
    GRAPH_API_PATH + INSTAGRAM_ID + param
  }&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  const response = executeApi(facebookUrl);
  const feeds = response.media.data as Feed[];

  // 日付昇順に並び替え
  feeds.sort((a: Feed, b: Feed) => {
    const aFromDate = new Date(a.timestamp);
    const bFromDate = new Date(b.timestamp);
    return aFromDate < bFromDate ? 1 : -1;
  });

  return feeds;
}
