# Contentful手動設定手順

## 1. アカウント作成手順

1. ブラウザで https://www.contentful.com/sign-up/ にアクセス
2. 以下の情報を入力：
   - メールアドレス: yuki.af0416@gmail.com
   - パスワード: （任意の安全なパスワード）
   - 組織名: MovieAF

## 2. スペースの作成

1. ログイン後、ダッシュボードから「Create space」をクリック
2. 以下の設定を選択：
   - Space name: movieaf
   - Type: Empty space
   - Plan: Free
3. 「Confirm and create」をクリック

## 3. コンテンツモデルの作成

### 3.1 Toolモデル
1. 左メニューから「Content model」を選択
2. 「Add content type」をクリック
3. 基本情報を入力：
   ```
   Name: Tool
   API identifier: tool
   Description: 動画ダウンロードツールの情報
   ```

4. 以下のフィールドを追加：

| フィールド名 | タイプ | 必須 | 設定 |
|------------|-------|------|------|
| name | Short text | Yes | - |
| slug | Short text | Yes | Unique: Yes<br>Pattern: ^[a-z0-9-]+$ |
| description | Long text | Yes | - |
| type | Short text | Yes | Validation: Matches pattern ^(desktop\|online\|browser)$ |
| benefits | Rich text | Yes | - |
| drawbacks | Rich text | Yes | - |
| affiliateLink | Short text | Yes | Validation: URL |
| image | Media | Yes | Accept: Images only |

### 3.2 Guideモデル
1. 「Add content type」をクリック
2. 基本情報を入力：
   ```
   Name: Guide
   API identifier: guide
   Description: ツールの使用方法ガイド
   ```

3. 以下のフィールドを追加：

| フィールド名 | タイプ | 必須 | 設定 |
|------------|-------|------|------|
| title | Short text | Yes | - |
| slug | Short text | Yes | Unique: Yes<br>Pattern: ^[a-z0-9-]+$ |
| tool | Reference | Yes | Accept: Tool only |
| steps | Rich text | Yes | - |
| image | Media | Yes | Accept: Images only |

## 4. APIキーの取得

1. 左メニューから「Settings」→「API keys」を選択
2. 「Add API key」をクリック
3. 名前を入力：「MovieAF Website」
4. 作成されたキーから以下の情報をコピー：
   - Space ID
   - Content Delivery API - access token

## 5. 環境変数の設定

1. プロジェクトの`.env.local`ファイルを開く
2. 以下の情報を追加：
```
CONTENTFUL_SPACE_ID=【コピーしたSpace ID】
CONTENTFUL_ACCESS_TOKEN=【コピーしたContent Delivery API - access token】
```

## 6. サンプルコンテンツの作成

### 6.1 VideoProc Converterの登録
1. 「Content」タブを選択
2. 「Add entry」→「Tool」を選択
3. 以下の情報を入力：
```
Name: VideoProc Converter
Slug: videoprocconverter
Type: desktop
Description: 高性能な動画ダウンロード・変換ソフト。4K/8K動画対応、高速処理が特徴。

Benefits:
• 4K/8K動画の高品質ダウンロードに対応
• GPUハードウェアアクセラレーションによる高速処理
• 200以上の動画サイトに対応
• 動画編集・変換機能を搭載

Drawbacks:
• 有料ソフトウェア（永続ライセンス）
• インストールが必要

AffiliateLink: https://www.videoproc.com/download/videoproc-converter.exe
```

### 6.2 使い方ガイドの登録
1. 「Add entry」→「Guide」を選択
2. 以下の情報を入力：
```
Title: VideoProc Converterの使い方ガイド
Slug: videoprocconverter-guide
Tool: VideoProc Converter（参照選択）

Steps:
## 1. ダウンロードとインストール
公式サイトからソフトウェアをダウンロードし、インストーラーを実行します。

## 2. 動画のダウンロード
1. 「動画のダウンロード」タブを選択
2. URLを貼り付け
3. 解析ボタンをクリック
4. 品質を選択してダウンロード開始

## 3. 動画の変換（オプション）
1. 「動画変換」タブを選択
2. 変換したい動画をドラッグ＆ドロップ
3. 出力形式と品質を選択
4. 変換開始をクリック
```

## 7. 動作確認

1. 開発サーバーを再起動：
```bash
npm run dev
```

2. ブラウザで http://localhost:3000 にアクセス

3. 以下を確認：
   - トップページのツール一覧表示
   - ツール詳細ページの表示
   - 使い方ガイドの表示
   - 画像の表示
   - リンクの動作

## トラブルシューティング

### APIエラーが発生する場合
1. 環境変数が正しく設定されているか確認
2. `.env.local`ファイルが正しい場所にあるか確認
3. 開発サーバーを再起動

### 画像が表示されない場合
1. Contentfulで画像が公開されているか確認
2. `next.config.js`の設定を確認：
```javascript
images: {
  domains: ['images.ctfassets.net'],
}
```

### コンテンツが表示されない場合
1. Contentfulでエントリーが公開されているか確認
2. APIキーの権限を確認
3. コンソールでエラーメッセージを確認