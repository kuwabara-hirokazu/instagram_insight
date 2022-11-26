// IG利用者
type User = {
  id: string;
  followers_count: string;
  media_count: string;
};

function analyzeUserInfo() {
  const user = getUser();

  const sheet = getSheet(PAGE_USER_INSIGHT);
  const today = formatDate(new Date());
  const data = [today, user.followers_count, user.media_count];

  insertOrUpdate(sheet, data);
}

/**
 * ApiDoc https://developers.facebook.com/docs/instagram-api/reference/ig-user
 */
function getUser(): User {
  const graphApi = GRAPH_API_PATH + INSTAGRAM_ID;
  const fields = "?fields=followers_count,media_count";
  const facebookUrl = `${
    graphApi + fields
  }&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  console.log(facebookUrl);
  return executeApi(facebookUrl) as User;
}
