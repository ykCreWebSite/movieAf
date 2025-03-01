# Slugの概要と使用方法

## Slugとは
Slugは、URLやファイルパスで使用される、人間が読みやすい形式の識別子です。
WebサイトのURLを分かりやすく、SEOに適した形式にするために使用されます。

## 使用例

### ツール情報のslug
```
名前（表示用）: VideoProc Converter
slug（URL用）: videoprocconverter
→ 生成されるURL: /tools/videoprocconverter

名前: SaveFrom.net
slug: savefrom
→ URL: /tools/savefrom

名前: Video DownloadHelper
slug: downloadhelper
→ URL: /tools/downloadhelper
```

### ガイド情報のslug
```
タイトル: VideoProc Converterの使い方ガイド
slug: videoprocconverter-guide
→ URL: /guides/videoprocconverter-guide

タイトル: SaveFrom.netの使い方ガイド
slug: savefrom-guide
→ URL: /guides/savefrom-guide
```

## Slugのルール

### 使用可能な文字
- 小文字のアルファベット（a-z）
- 数字（0-9）
- ハイフン（-）

### 制限事項
- スペースは使用不可（代わりにハイフンを使用）
- 大文字は使用不可（すべて小文字に変換）
- 特殊文字は使用不可（. _ @ # $ % など）
- 日本語や他の非ASCII文字は使用不可
- 先頭と末尾にハイフンは使用不可

## 正しいslugの例
```
✅ 正しい例：
- videoprocconverter
- savefrom-net
- video-download-helper
- how-to-use-videoproc
- guide-for-beginners
```

## 間違ったslugの例
```
❌ 間違った例：
- VideoProc_Converter  （大文字とアンダースコアは使用不可）
- SaveFrom.net        （ドットは使用不可）
- video downloadhelper（スペースは使用不可）
- ビデオプロック      （日本語は使用不可）
- -my-guide-         （先頭と末尾のハイフンは使用不可）
```

## slugの自動生成方法

タイトルやツール名からslugを生成する手順：

1. すべての文字を小文字に変換
2. スペースをハイフンに置換
3. 特殊文字を削除
4. 連続するハイフンを1つに置換
5. 先頭と末尾のハイフンを削除

例：
```
"VideoProc Converter (4K対応)" → "videoprocconverter"
"SaveFrom.net - オンライン" → "savefrom-net-online"
"Video DownloadHelper 使い方" → "video-downloadhelper"
```

## Contentfulでのslugフィールドの設定

1. フィールドタイプ：「Short text」を選択
2. バリデーション設定：
   - Required: チェックを入れる
   - Unique: チェックを入れる（同じslugの重複を防ぐため）
   - Pattern: `^[a-z0-9-]+$` を設定
   - Character limit: 50文字程度（URLの長さを考慮）

3. ヘルプテキストの例：
```
URLで使用される識別子です。
- 小文字のアルファベット、数字、ハイフンのみ使用可能
- スペースや特殊文字は使用不可
- 例：videoprocconverter, savefrom-net
```

## 注意事項

1. 一意性
   - 同じコンテンツタイプ内でslugは重複不可
   - 異なるコンテンツタイプでも重複は避けることを推奨

2. 長さ
   - 短すぎず長すぎない長さを推奨（20-50文字程度）
   - URLの可読性とSEOを考慮

3. 永続性
   - 一度公開したslugは変更を避ける
   - 変更する場合はリダイレクトの設定を推奨

4. 予約語の回避
   - api, admin, login などのシステム予約語は使用しない
   - 将来の機能追加を考慮した命名

## トラブルシューティング

1. slugが重複する場合
   - 末尾に数字を追加（例：videoprocconverter-2）
   - より具体的な名前を使用

2. 長すぎるslug
   - 重要なキーワードのみを使用
   - 冗長な単語を省略

3. 特殊文字の処理
   - アンパサンド（&）→ and
   - プラス（+）→ plus
   - その他の特殊文字は削除