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
  media_url: string;
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

// インサイト集計シートのデータ
interface InsightSheetData {
  timestamp: string;
  id: string;
  caption: string;
  title: string;
  mediaType: string;
  mediaUrl: string;
  permalink: string;
  likeCount: string;
  commentsCount: string;
  saved: string;
  impression: string;
  reach: string;
  saveRate: string;
  foodType: string;
}

// Firestoreにアクセスするための情報
type FirestoreAccessInfo = {
  project_id: string;
  private_key: string;
  client_email: string;
};
