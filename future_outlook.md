# NodeCG配信枠にある現在わかってる不具合
## nodecg-alpharomeo-stream
- 下枠にまだゆとりがあるので延長

## nodecg-discord-utils
- 一度ボイチャ監視Botが入ったボイスチャンネルのユーザーが取得されてしまう
  - むやみにモジュール分離したせいだと思われる

# NodeCG配信枠に実装したい機能一覧
- Vtube Studioの表示をOBSではなくNodeCG側でやりたい
  - OBSで準備するソース数を抑えることができる
- MopidyをNodeCGのダッシュボードで制御する
  - 別バンドルにすることも検討
  - 願わくばsnapcastクライアントも組み込みたい