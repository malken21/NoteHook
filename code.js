function doPost(e) {
    try {

        // POST Bodyの内容を取得 & JSON化
        const data = JSON.parse(e.postData.contents);
        //JSONをコンソール出力
        console.log(data);

        if (Visibility.includes(data.body.note.visibility)) {

            // Discordに送信
            sendDiscord(data.body.note);
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