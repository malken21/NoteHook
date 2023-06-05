// レスポンス 生成
function result(status) {
    return ContentService.createTextOutput(
        JSON.stringify({ status: status })
    ).setMimeType(ContentService.MimeType.JSON);
}

// DiscordのWebhookを使って Discordにメッセージを送信する
function sendDiscord(text) {

    const payload = {
        "content": text
    };

    UrlFetchApp.fetch(Discord_Webhook, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
    });
}

// トリガー作成
function createTrigger(note) {
    // 1分後に run が実行するように設定
    const trigger = ScriptApp.newTrigger("run").timeBased().after(60000).create();

    //プロジェクトプロパティに追加
    addProperty(
        trigger.getUniqueId(),
        Message.replace("%note_id%", note.id).replace("%Instance%", Instance)
    );
}

// プロジェクトプロパティ追加
function addProperty(triggerId, message) {
    const properties = PropertiesService.getScriptProperties();

    let idList = properties.getProperty("TriggerData");
    if (idList) idList = JSON.parse(idList); else idList = [];
    let textList = properties.getProperty("MessageData");
    if (textList) textList = JSON.parse(textList); else textList = [];

    idList.push(triggerId);
    textList.push(message);

    properties.setProperty("TriggerData", JSON.stringify(idList));
    properties.setProperty("MessageData", JSON.stringify(textList));
}