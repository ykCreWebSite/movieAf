# Contentfulセットアップ手順

## 1. Contentfulアカウントの作成
1. [Contentful](https://www.contentful.com/)にアクセス
2. 「Start for free」をクリック
3. メールアドレスとパスワードを入力して登録

## 2. スペースの作成
1. ダッシュボードから「Create Space」をクリック
2. スペース名を「movieaf」として作成
3. Free tierを選択

## 3. コンテンツモデルの作成

### ツールモデル（Tool）
1. 「Content model」タブを選択
2. 「Add content type」をクリック
3. 名前を「Tool」として以下のフィールドを追加：
   - name (Short text) - 必須
   - slug (Short text) - 必須
   - description (Long text) - 必須
   - type (Short text) - 必須 (desktop, online, browserのいずれか)
   - benefits (Rich text) - 必須
   - drawbacks (Rich text) - 必須
   - affiliateLink (Short text) - 必須
   - image (Media) - 必須

### ガイドモデル（Guide）
1. 「Add content type」をクリック
2. 名前を「Guide」として以下のフィールドを追加：
   - title (Short text) - 必須
   - slug (Short text) - 必須
   - tool (Reference to Tool) - 必須
   - steps (Rich text) - 必須
   - image (Media) - 必須

## 4. APIキーの取得
1. 「Settings」メニューをクリック
2. 「API keys」を選択
3. 「Add API key」をクリック
4. 任意の名前（例：「MovieAF Website」）を入力
5. 作成後、以下の情報をコピー：
   - Space ID
   - Content Delivery API - access token

## 5. 環境変数の設定
1. プロジェクトの`.env.local`ファイルに以下の情報を追加：
```
CONTENTFUL_SPACE_ID=あなたのSpace ID
CONTENTFUL_ACCESS_TOKEN=あなたのContent Delivery API access token
```

## 6. コンテンツの作成
1. 「Content」タブを選択
2. 「Add entry」をクリック
3. 各ツールとガイドの情報を入力
4. 必要な画像をMedia欄にアップロード
5. 作成後、「Publish」をクリックして公開

## 7. 動作確認
1. 環境変数を設定後、開発サーバーを再起動
2. ブラウザでサイトにアクセスし、コンテンツが表示されることを確認

## 注意事項
- すべてのフィールドが必須として設定されていることを確認
- slugフィールドは一意の値を設定
- 画像は最適化のため、適切なサイズとフォーマットで用意
- APIキーは公開リポジトリにコミットしないよう注意