# nodecg-alphaRomeo-stream

柏寧有葉が配信で使用している配信枠システムです

NodeCG上で動作します


## Replicants

大量のレプリカントがあります

### 配信情報系

- `title`: 配信のタイトル。string型
- `description`: 配信の概要。string型
- `start-time`: 配信開始予定時刻。string型
- `end-time`: 配信終了予定時刻。string型
- `restart-time`: 配信再開時刻。string型
- `guests`: ゲスト一覧。string型のリスト
- `twitter-handle`: X(旧Twitter)のハンドル。**@を含まない**string型。~~これに限らずX系のRepやElmはTwitter名義です~~
- `misskey-acct`: MisskeyのAcct。**@とホスト名を含む**string型
- `youtube-handle`: Youtubeのハンドル。**@を含まない**string型。未実装
- `twitch-id`: Twitchのユーザー名。string型。未実装
- `additional-info`: その他情報。以下のハッシュで構成されたオブジェクトのリスト
  - `svg`: SVGのURL。`/graphics`からの相対パスで指定
  - `materialIcon`: [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)を指定するためのコードポイント。string型
  - `content`: 情報の内容。string型
  - `queue`: 配信待機画面で見せる場合true
  - `frame`: 配信中見せる場合true

### 配信制御系

- `switch`: 配信画面切り替え。`queue`と`frame`の2値を取る
- `status`: 配信前後・配信中表示切り替え。`before`、`interlude`、`after`の3つの値を取る

### 画像系

- `logo`: ロゴのURL。
- `logo-size`: 配信中画面におけるロゴのサイズ。number型
- `logo-hide`: 配信中画面でロゴを**隠すときtrue**
- `background`: 背景画像のURL
- `op`: オープニング映像のURL

### お楽しみ要素系

- `fun-type`: 現在配信画面に乗せているお楽しみ要素。ない場合`none`を指定。string型
- `memo`: 配信中のメモ書き。string型
- `counter-title`: 何をカウントしているかの表示。string型。
- `counter-value`: カウント。number型

### その他(extensionで生成)

- `frame-info`: 配信中画面に載せる情報
- `queue-info`: 配信待機画面で見せる情報
- `playback`: mpdで再生中の曲の情報

### もはや使われていない

- `lock`: 重要な内容の改ざん防止用。bool型
