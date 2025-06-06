# AIカメラサイト

ブラウザでカメラを起動し、撮影画像をOpenAI Vision APIで解析するデモサイト。

## 機能
- カメラ映像の取得
- ボタンで撮影し、AIに画像送信
- 結果を画面に表示
- 音声認識で「撮影して」と言うと自動で撮影・解析

## 使い方
1. `.env.example` を参考に APIキーを `script.js` の `your_openai_api_key_here` に書き換える
2. `index.html` をブラウザで開く

## 注意
- Vision APIは `gpt-4-vision-preview` モデルを使用
- モバイルではカメラの使用許可が必要
