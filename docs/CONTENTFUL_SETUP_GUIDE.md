# Contentful設定手順詳細ガイド

## 1. Contentfulアカウントのセットアップ

### 1.1 アカウント作成
1. [Contentful](https://www.contentful.com/)にアクセス
2. 右上の「Start for free」をクリック
3. メールアドレスとパスワードを入力
4. 「Create account」をクリック

### 1.2 組織とスペースの作成
1. 「Create new organization」をクリック
2. 組織名を入力（例：「MovieAF」）
3. 「Create organization」をクリック
4. 「Create new space」をクリック
5. スペース名を「movieaf」と入力
6. 「Create space」をクリック

## 2. コンテンツモデルの作成

### 2.1 ツールモデル（Tool）の作成
1. 左メニューから「Content model」を選択
2. 「Add content type」をクリック
3. 以下の設定を入力：
   - Name: `Tool`
   - API identifier: `tool`
   - Description: `動画ダウンロードツールの情報`

4. 「Fields」タブで以下のフィールドを追加：

| フィールド名 | タイプ | 設定 |
|------------|-------|------|
| name | Short text | Required: Yes<br>Unique: No |
| slug | Short text | Required: Yes<br>Unique: Yes<br>Validation: Pattern ^[a-z0-9-]+$ |
| description | Long text | Required: Yes |
| type | Short text | Required: Yes<br>Validation: desktop, online, browser |
| benefits | Rich text | Required: Yes |
| drawbacks | Rich text | Required: Yes |
| affiliateLink | Short text | Required: Yes<br>Validation: URL |
| image | Media | Required: Yes<br>Accept: Images only |

### 2.2 ガイドモデル（Guide）の作成
1. 「Add content type」をクリック
2. 以下の設定を入力：
   - Name: `Guide`
   - API identifier: `guide`
   - Description: `ツールの使用方法ガイド`

3. 以下のフィールドを追加：

| フィールド名 | タイプ | 設定 |
|------------|-------|------|
| title | Short text | Required: Yes |
| slug | Short text | Required: Yes<br>Unique: Yes<br>Validation: Pattern ^[a-z0-9-]+$ |
| tool | Reference | Required: Yes<br>Accept: Tool only<br>Validation: Exactly 1 reference |
| steps | Rich text | Required: Yes |
| image | Media | Required: Yes<br>Accept: Images only |

## 3. サンプルコンテンツの作成

### 3.1 ツール情報の登録（VideoProc Converter）
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

### 3.2 ガイド情報の登録
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

## 4. APIキーの取得と設定

### 4.1 APIキーの作成
1. 左メニューから「Settings」→「API keys」を選択
2. 「Add API key」をクリック
3. 名前を入力（例：「MovieAF Website」）
4. 「Save」をクリック
5. 以下の情報をメモ：
   - Space ID
   - Content Delivery API - access token

### 4.2 環境変数の設定
1. プロジェクトの`.env.local`ファイルを開く
2. 以下の情報を追加：
```
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

## 5. 画像のアップロードとメディア管理

### 5.1 画像の準備
1. 各ツールのスクリーンショットを準備
   - サイズ: 1200x800px
   - 形式: PNG/JPG
   - 品質: 高解像度

2. ガイド用の手順画像を準備
   - サイズ: 800x600px
   - 形式: PNG
   - テキストが読みやすい解像度

### 5.2 画像のアップロード
1. 「Media」タブを選択
2. 「Add asset」をクリック
3. 画像をドラッグ＆ドロップ
4. タイトルと説明を入力
5. タグを追加（例：「screenshot」「guide」）
6. 「Publish」をクリック

## 6. コンテンツの公開

### 6.1 コンテンツの確認
1. すべてのフィールドが正しく入力されているか確認
2. 画像が適切に表示されるか確認
3. リンクが正しく機能するか確認

### 6.2 公開設定
1. 各エントリーの「Publish」ボタンをクリック
2. 関連するアセット（画像）も公開されていることを確認

## 7. 動作確認

### 7.1 開発環境での確認
1. 開発サーバーを起動：
```bash
npm run dev
```
2. ブラウザで http://localhost:3000 にアクセス
3. 以下を確認：
   - ツール一覧の表示
   - 詳細ページの表示
   - 画像の表示
   - リッチテキストの表示

### 7.2 本番環境での確認
1. Vercelにデプロイ
2. 環境変数が正しく設定されているか確認
3. すべてのページとコンテンツが正しく表示されるか確認

## トラブルシューティング

### よくある問題と解決方法

1. 画像が表示されない
   - Contentfulで画像が公開されているか確認
   - next.config.jsのdomains設定を確認

2. リッチテキストが正しく表示されない
   - @contentful/rich-text-react-rendererが正しくインストールされているか確認
   - コンポーネントのマッピングを確認

3. APIエラー
   - 環境変数が正しく設定されているか確認
   - APIキーの権限を確認
   - Space IDが正しいか確認

## 定期的なメンテナンス

1. コンテンツの更新
   - ツール情報の最新化
   - スクリーンショットの更新
   - アフィリエイトリンクの確認

2. パフォーマンスの確認
   - 画像の最適化
   - キャッシュの設定
   - ビルド時間の確認

3. セキュリティ
   - APIキーの定期的な更新
   - アクセス権限の確認
   - 環境変数の管理