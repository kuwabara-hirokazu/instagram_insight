/**
 * Firestoreのデータを更新する（データがなければ作成する）
 */
function updateFirestore(path: string, data: Object) {
  const firestoreInfo = getFirestoreAccessInfo();
  const firestore = FirestoreApp.getFirestore(
    firestoreInfo.client_email,
    firestoreInfo.private_key,
    firestoreInfo.project_id
  );
  firestore.updateDocument(path, data);
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
