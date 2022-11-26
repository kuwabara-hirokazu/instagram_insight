// IG利用者
type User = {
  id: string;
  followers_count: string;
  media_count: string;
};

// メディア(Feed, Reel)
type Media = {
  timestamp: Date;
  id: string;
  caption: string;
  media_type: string;
  permalink: string;
  like_count: string;
  comments_count: string;
};

// インサイト
type Insight = {
  name: string;
  values: InsightValue[];
};

type InsightValue = {
  value: string;
};
