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

    // 一番上にあるプロジェクトプロパティを取得
    const id = properties.getKeys()[0];
    const text = properties.getProperty(id);
    // プロジェクトプロパティ削除
    properties.deleteProperty(id);

    // Discordに送信
    sendDiscord(text);
    // Discordに送信する文字をログ出力
    console.log(text);

    // トリガーを削除
    ScriptApp.getProjectTriggers().forEach(trigger => {
        if (trigger.getUniqueId() == id)
            ScriptApp.deleteTrigger(trigger);
    });
}