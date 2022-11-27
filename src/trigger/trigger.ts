class Trigger {
  functionName: string;

  constructor(functionName: string) {
    this.functionName = functionName;
  }

  /**
   * 指定日時のトリガーを設定する
   * @param {Date} triggerTime - トリガーをセットする指定日時
   * @return {Trigger} Trigger オブジェクト
   */
  createTimeBased(triggerTime: Date): Trigger {
    ScriptApp.newTrigger(this.functionName)
      .timeBased()
      .at(triggerTime)
      .create();
    return this;
  }

  /**
   * トリガーを削除する
   * @return {Trigger} Trigger オブジェクト
   */
  delete(): Trigger {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach((trigger) => {
      if (trigger.getHandlerFunction() === this.functionName)
        ScriptApp.deleteTrigger(trigger);
    });
    return this;
  }
}
