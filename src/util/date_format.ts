function formatDateTime(date: Date): string {
  return Utilities.formatDate(date, "Asia/Tokyo", "yyyy/MM/dd HH:mm");
}

function formatDate(date: Date): string {
  return Utilities.formatDate(date, "Asia/Tokyo", "yyyy/MM/dd");
}

function formatTime(date: Date): string {
  return Utilities.formatDate(date, "Asia/Tokyo", "HH:mm");
}
