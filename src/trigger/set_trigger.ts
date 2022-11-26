/**
 * Triggerマスタシートをもとにトリガー設定する
 */
function setTrigger() {
  const trigger = new Trigger(TRIGGER_FUNCTION_MEDIA_HOURLY);

  trigger.delete(); // 過去のトリガーを削除

  const sheet = getSheet(PAGE_MASTER);
  const postTime = sheet.getRange(2, 1).getValue();
  const postTimeHour = postTime.getHours();
  const postTimeMinute = postTime.getMinutes();

  for (let triggerPattern = 1; triggerPattern <= 6; triggerPattern++) {
    const triggerDate = getTriggerDate(
      postTimeHour,
      postTimeMinute,
      triggerPattern
    );
    // トリガー作成
    trigger.createTimeBased(triggerDate);
  }
}

/**
 * Triggerマスタシートの時間をもとに設定日時を算出する
 */
function getTriggerDate(
  timeHour: number,
  timeMinute: number,
  triggerPattern: number
) {
  const date = new Date();
  switch (triggerPattern) {
    case 1:
      if (timeMinute == 30) {
        // 18:30 -> 19:00
        timeHour = timeHour + 1;
        timeMinute = 0;
      } else {
        // 19:00 -> 19:30
        timeMinute = timeMinute + 30;
      }
      break;
    case 2:
      timeHour = timeHour + 1;
      break;
    case 3:
      timeHour = timeHour + 2;
      break;
    case 4:
      timeHour = timeHour + 3;
      break;
    case 5:
      timeHour = timeHour + 6;
      // 24時を超えた場合は日付調整
      if (timeHour >= 24) {
        date.setDate(date.getDate() + 1);
        timeHour = timeHour - 24;
      }
      break;
    case 6:
      timeHour = timeHour + 23;
      // 24時を超えた場合は日付調整
      if (timeHour >= 24) {
        date.setDate(date.getDate() + 1);
        timeHour = timeHour - 24;
      }
      break;
  }
  date.setHours(timeHour, timeMinute, 0, 0);
  return date;
}
