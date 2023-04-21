function doPost(e) {
    try {

        // POST Bodyの内容を取得 & JSON化
        const data = JSON.parse(e.postData.contents);
        //JSONをコンソール出力
        console.log(data);
        // Discordに送信
        sendDiscord(Message.replace("%note_id%", data.body.id));
        //レスポンス
        return result(true);

    } catch (err) {
        //エラーの場合の処理

        //エラー内容をコンソール出力
        console.log(err);
        //レスポンス
        return result(false);
    }
}