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

    // プロジェクトプロパティ生成
    PropertiesService.getScriptProperties().setProperty(
        trigger.getUniqueId(),
        // Discordに送信する文字
        Message.replace("%note_id%", note.id).replace("%Instance%", Instance)
    );
}