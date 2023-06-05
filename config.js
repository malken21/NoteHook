// DiscordのWebhookのURL
const Discord_Webhook = "Discord Webhook URL";

// Misskeyインスタンスのドメイン
const Instance = "misskey.io";

// Discordに送信される ノートの公開範囲の設定 (public,home,followers,specified)
const Visibility = ["public", "home"];

// Discordに送信されるメッセージ
const Message = "ノートが作成されました https://%Instance%/notes/%note_id%";

// ここに書いた正規表現がノートした文字に当てはまる場合 Discordに送信される
// "" と入力すると この設定を無視する
const Filter = "";