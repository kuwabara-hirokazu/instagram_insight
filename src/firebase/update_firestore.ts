/**
 * Firestoreのデータを更新する（データがなければ作成する）
 * @param path document path
 * @param data Object
 * @param mask trueにすると、特定のフィールドのみを更新する。サーバー上に存在する他のフィールドは変更されない。
 */
function updateFirestore(path: string, data: Object, mask: boolean) {
  const firestoreInfo = getFirestoreAccessInfo();
  const firestore = FirestoreApp.getFirestore(
    firestoreInfo.client_email,
    firestoreInfo.private_key,
    firestoreInfo.project_id
  );
  try {
    firestore.updateDocument(path, data, mask);
  } catch (e) {
    console.log("APIエラー:" + e);
  }
}

/**
 * Firestoreのアクセス情報をGoogleドライブから取得する
 */
function getFirestoreAccessInfo(): FirestoreAccessInfo {
  if (FIRESTORE_ACCESS_FILE_ID == null)
    throw new Error("No FIRESTORE_ACCESS_FILE_ID!!");
  const file = DriveApp.getFileById(FIRESTORE_ACCESS_FILE_ID);
  const data = file.getBlob().getDataAsString();
  return JSON.parse(data) as FirestoreAccessInfo;
}
