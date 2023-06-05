// Misskeyからのリクエストで実行
function doPost(e) {
    try {

        // POST Bodyの内容を取得 & JSON化
        const data = JSON.parse(e.postData.contents);
        //JSONをコンソール出力
        console.log(data);

        if (
            // config で 指定した 公開設定に当てはまるかどうか
            Visibility.includes(data.body.note.visibility) &&
            // config で 指定した フィルターに当てはまるかどうか
            (Filter == "" || (data.body.note.text && data.body.note.text.match(Filter)))
        ) {

            // トリガー作成
            createTrigger(data.body.note);
            //レスポンス
            return result(true);
        }

        //レスポンス
        return result(false);

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
    const id = properties.getKeys().slice(-1)[0];
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