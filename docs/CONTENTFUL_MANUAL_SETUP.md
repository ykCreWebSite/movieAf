# Contentful詳細セットアップ手順

## 1. 初期設定

### 1.1 アカウント作成とスペース設定
1. https://www.contentful.com/sign-up/ にアクセス
2. メールアドレス: yuki.af0416@gmail.com で登録
3. 「Create new space」を選択
   - Space name: movieaf
   - Type: Empty space
   - Plan: Free

### 1.2 基本設定
1. Settings → Locales
   - Add locale: Japanese (ja-JP)
   - Set as default locale
2. Settings → Space settings
   - Default preview URL: http://localhost:3000

## 2. コンテンツモデルの作成

### 2.1 共通コンポーネント（SEO）の作成
1. Content model → Add content type
   ```
   Name: SEO
   API identifier: seo
   Description: SEO関連の設定
   ```

2. フィールドの追加
   ```
   Field name: Meta Title
   API ID: metaTitle
   Type: Short text
   Required: Yes
   Character limit: 60
   Help text: 検索結果に表示されるタイトル（60文字以内）
   ```

   ```
   Field name: Meta Description
   API ID: metaDescription
   Type: Long text
   Required: Yes
   Character limit: 160
   Help text: 検索結果に表示される説明文（160文字以内）
   ```

   ```
   Field name: OG Image
   API ID: ogImage
   Type: Media
   Required: Yes
   Accept only: Images
   Help text: SNSでシェアされた際に表示される画像（1200x630px推奨）
   ```

### 2.2 ツール情報（Tool）の作成
1. Add content type
   ```
   Name: Tool
   API identifier: tool
   Description: 動画ダウンロードツールの情報
   ```

2. 基本情報フィールド
   ```
   Field name: Name
   API ID: name
   Type: Short text
   Required: Yes
   Character limit: 100
   Help text: ツールの表示名
   ```

   ```
   Field name: Slug
   API ID: slug
   Type: Short text
   Required: Yes
   Unique: Yes
   Pattern: ^[a-z0-9-]+$
   Character limit: 50
   Help text: URLで使用される識別子（小文字、数字、ハイフンのみ）
   ```

   ```
   Field name: Description
   API ID: description
   Type: Long text
   Required: Yes
   Character limit: 500
   Help text: ツールの概要説明
   ```

3. 詳細情報フィールド
   ```
   Field name: Type
   API ID: type
   Type: Short text
   Required: Yes
   Validation: Matches pattern ^(desktop|online|browser)$
   Help text: ツールの種類（desktop/online/browser）
   ```

   ```
   Field name: Benefits
   API ID: benefits
   Type: Rich text
   Required: Yes
   Allowed node types:
     - Heading 2
     - Heading 3
     - Paragraph
     - Unordered list
     - Ordered list
   Help text: ツールのメリット（箇条書き推奨）
   ```

   ```
   Field name: Drawbacks
   API ID: drawbacks
   Type: Rich text
   Required: Yes
   Allowed node types: [同上]
   Help text: ツールのデメリット（箇条書き推奨）
   ```

4. メディアとリンク
   ```
   Field name: Image
   API ID: image
   Type: Media
   Required: Yes
   Accept only: Images
   Help text: ツールのスクリーンショット（1200x800px推奨）
   ```

   ```
   Field name: Affiliate Link
   API ID: affiliateLink
   Type: Short text
   Required: Yes
   Pattern: ^https?://.*$
   Help text: アフィリエイトリンクのURL
   ```

5. SEO設定
   ```
   Field name: SEO
   API ID: seo
   Type: Reference
   Required: Yes
   Accept only: SEO
   Number of references: 1
   Help text: SEO設定
   ```

### 2.3 使い方ガイド（Guide）の作成
1. Add content type
   ```
   Name: Guide
   API identifier: guide
   Description: ツールの使用方法ガイド
   ```

2. 基本情報フィールド
   ```
   Field name: Title
   API ID: title
   Type: Short text
   Required: Yes
   Character limit: 100
   Help text: ガイドのタイトル
   ```

   ```
   Field name: Slug
   API ID: slug
   Type: Short text
   Required: Yes
   Unique: Yes
   Pattern: ^[a-z0-9-]+$
   Character limit: 50
   Help text: URLで使用される識別子（小文字、数字、ハイフンのみ）
   ```

3. コンテンツフィールド
   ```
   Field name: Steps
   API ID: steps
   Type: Rich text
   Required: Yes
   Allowed node types:
     - Heading 2
     - Heading 3
     - Paragraph
     - Unordered list
     - Ordered list
     - Image
   Help text: 使用手順の詳細説明
   ```

4. 関連情報
   ```
   Field name: Tool
   API ID: tool
   Type: Reference
   Required: Yes
   Accept only: Tool
   Number of references: 1
   Help text: 対象となるツール
   ```

   ```
   Field name: Image
   API ID: image
   Type: Media
   Required: Yes
   Accept only: Images
   Help text: 手順説明用のスクリーンショット
   ```

5. SEO設定
   ```
   Field name: SEO
   API ID: seo
   Type: Reference
   Required: Yes
   Accept only: SEO
   Number of references: 1
   Help text: SEO設定
   ```

## 3. APIキーの設定

### 3.1 APIキーの作成
1. Settings → API keys → Add API key
   ```
   Name: MovieAF Website
   Description: Next.jsウェブサイト用
   ```

2. 以下の情報をメモ
   - Space ID
   - Content Delivery API - access token
   - Content Preview API - access token

### 3.2 環境変数の設定
1. プロジェクトルートの`.env.local`を編集
   ```
   CONTENTFUL_SPACE_ID=【Space ID】
   CONTENTFUL_ACCESS_TOKEN=【Content Delivery API - access token】
   CONTENTFUL_PREVIEW_TOKEN=【Content Preview API - access token】
   ```

## 4. 権限設定

### 4.1 ロールの作成
1. Settings → Roles → Add role
   ```
   Name: Content Editor
   Description: コンテンツ編集者
   Permissions:
     - Read content
     - Create and edit content
     - Publish content
     - Manage assets
   ```

### 4.2 ユーザーの招待
1. Settings → Users → Add user
   - メールアドレスを入力
   - ロールを選択

## 5. メディア管理設定

### 5.1 アセット設定
1. Settings → Media → Edit settings
   ```
   Default upload directory: /images
   Auto-process files: Yes
   ```

### 5.2 画像最適化設定
1. Settings → Media → Image handling
   ```
   Enable automatic image optimization: Yes
   Default quality: 80
   Max file size: 2MB
   ```

## 6. プレビュー設定

### 6.1 プレビューの設定
1. Settings → Content preview
   ```
   Entry preview:
     - Name: Development
     - URL: http://localhost:3000/api/preview?secret=【プレビューシークレット】&slug={entry.fields.slug}
   ```

## 7. バックアップ設定

### 7.1 定期エクスポートの設定
1. Settings → Space settings → Content export
   ```
   Export type: Full
   Include assets: Yes
   Export format: JSON
   ```

## 8. 動作確認

### 8.1 コンテンツの作成
1. サンプルコンテンツの作成
   - SEO情報の作成
   - ツール情報の作成
   - ガイド情報の作成

### 8.2 APIテスト
1. GraphiQL Explorerでクエリのテスト
2. Postmanでエンドポイントのテスト

### 8.3 プレビューの確認
1. エントリーのプレビュー
2. 下書き状態の確認

## トラブルシューティング

### APIエラー
1. APIキーの確認
2. 環境変数の確認
3. コンテンツモデルの確認

### プレビューエラー
1. プレビューURLの確認
2. シークレットの確認
3. ルーティングの確認

### メディアエラー
1. ファイルサイズの確認
2. 画像フォーマットの確認
3. パーミッションの確認