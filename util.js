// レスポンス 生成
function result(status) {
    return ContentService.createTextOutput(
        JSON.stringify({ status: status })
    ).setMimeType(ContentService.MimeType.JSON);
}

// DiscordのWebhookを使って Discordにメッセージを送信する
function sendDiscord(note) {

    const payload = {
        "content": Message.replace("%note_id%", note.id),
        "embeds": [
            {
                "title": `${note.user.name} (@${note.user.username})`,
                "description": note.text,
                "url": `https://misskey.io/notes/${note.id}`,
                "color": Color,
                "thumbnail": {
                    "url": note.user.avatarUrl
                }
            }
        ]
    };

    UrlFetchApp.fetch(Discord_Webhook, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
    });
}