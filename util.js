// レスポンス 生成
function result(status) {
    return ContentService.createTextOutput(
        JSON.stringify({ status: status })
    ).setMimeType(ContentService.MimeType.JSON);
}

// DiscordのWebhookを使って Discordにメッセージを送信する
function sendDiscord(text) {
    const payload = {
        content: text
    };
    UrlFetchApp.fetch(Discord_Webhook, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
    });
}