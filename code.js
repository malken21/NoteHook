// Misskeyからのリクエストで実行
function doPost(e) {
    try {

        // POST Bodyの内容を取得 & JSON化
        const data = JSON.parse(e.postData.contents);
        //JSONをコンソール出力
        console.log(data);

        if (Visibility.includes(data.body.note.visibility)) {

            // トリガー作成
            createTrigger(data.body.note);
            //レスポンス
            return result(true);

        } else {

            //レスポンス
            return result(false);

        }
    } catch (err) {
        //エラーの場合の処理

        //エラー内容をコンソール出力
        console.log(err);
        //レスポンス
        return result(false);
    }
}

// トリガーから実行
function run() {
    // プロジェクトプロパティ取得
    const properties = PropertiesService.getScriptProperties();

    // プロジェクトプロパティの"TriggerData"のデータを取得
    const idList = JSON.parse(properties.getProperty("TriggerData"));
    // プロジェクトプロパティの"MessageData"のデータを取得
    const textList = JSON.parse(properties.getProperty("MessageData"));

    // "idList"の先頭の要素を削除、削除したものを"id"に代入
    const id = idList.shift();
    // "textList"の先頭の要素を削除、削除したものを"text"に代入
    const text = textList.shift();

    // プロジェクトプロパティの"TriggerData"のデータを設定
    properties.setProperty("TriggerData", JSON.stringify(idList));

    // プロジェクトプロパティの"MessageData"のデータを設定
    properties.setProperty("MessageData", JSON.stringify(textList));

    // トリガーを削除
    ScriptApp.getProjectTriggers().forEach(trigger => {
        if (trigger.getUniqueId() == id)
            ScriptApp.deleteTrigger(trigger);
    });

    // Discordに送信
    sendDiscord(text);
    // Discordに送信する文字をログ出力
    console.log(text);
}