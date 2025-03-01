# Contentfulアーキテクチャ設計

## 1. コンテンツモデル構造

### 1.1 基本構造
```
Root
├── Tool（ツール情報）
│   ├── Properties
│   │   ├── name: Short text
│   │   ├── slug: Short text (unique)
│   │   ├── description: Long text
│   │   ├── type: Short text (enum)
│   │   ├── benefits: Rich text
│   │   ├── drawbacks: Rich text
│   │   ├── affiliateLink: Short text (URL)
│   │   └── image: Media
│   └── References
│       └── guides: Multiple references to Guide
│
├── Guide（使い方ガイド）
│   ├── Properties
│   │   ├── title: Short text
│   │   ├── slug: Short text (unique)
│   │   ├── steps: Rich text
│   │   └── image: Media
│   └── References
│       └── tool: Single reference to Tool
│
└── Common（共通コンポーネント）
    ├── SEO
    │   ├── metaTitle: Short text
    │   ├── metaDescription: Long text
    │   └── ogImage: Media
    └── Navigation
        ├── label: Short text
        └── link: Short text
```

### 1.2 コンテンツタイプの詳細定義

#### Tool
```typescript
interface Tool {
  // 基本情報
  name: string;          // 表示名
  slug: string;         // URL用識別子
  description: string;  // 概要説明
  type: 'desktop' | 'online' | 'browser';  // ツール種別

  // 詳細情報
  benefits: RichText;   // メリット（箇条書き可能）
  drawbacks: RichText;  // デメリット（箇条書き可能）
  affiliateLink: URL;   // アフィリエイトリンク

  // メディア
  image: Asset;         // ツールのスクリーンショット

  // SEO
  seo: SEO;            // SEO設定（共通コンポーネント）

  // リレーション
  guides: Guide[];     // 関連ガイド
}
```

#### Guide
```typescript
interface Guide {
  // 基本情報
  title: string;       // ガイドタイトル
  slug: string;       // URL用識別子
  steps: RichText;    // 手順説明

  // メディア
  image: Asset;       // 手順のスクリーンショット

  // SEO
  seo: SEO;          // SEO設定（共通コンポーネント）

  // リレーション
  tool: Tool;        // 対象ツール
}
```

## 2. フィールド設定詳細

### 2.1 テキストフィールド

#### Short text
- 文字数制限: 256文字
- バリデーション: 必須項目
- 使用例: タイトル、名前、ラベル

#### Long text
- 文字数制限: 50,000文字
- バリデーション: 必須項目
- 使用例: 概要説明、メタ説明

#### Rich text
- 許可する要素:
  - 見出し（H2, H3）
  - 段落
  - 箇条書き（順序付き/なし）
  - 太字、イタリック
  - リンク
- 使用例: 手順説明、メリット/デメリット

### 2.2 メディアフィールド

#### 画像設定
- 推奨サイズ: 1200x800px
- フォーマット: JPG, PNG
- ファイルサイズ制限: 2MB
- メタデータ: alt text必須

### 2.3 参照フィールド

#### 単一参照
- バリデーション: 必須
- 使用例: ガイドから対象ツールへの参照

#### 複数参照
- バリデーション: オプション
- 使用例: ツールから関連ガイドへの参照

## 3. 多言語対応設計

### 3.1 翻訳可能フィールド
- テキストフィールド全般
- リッチテキスト
- メディアのalt text

### 3.2 言語非依存フィールド
- slug
- affiliateLink
- 画像（共通使用）

### 3.3 言語設定
- デフォルト言語: 日本語
- 将来対応言語: 英語（予定）

## 4. エディター体験の最適化

### 4.1 入力補助
- ヘルプテキストの提供
- バリデーションメッセージの日本語化
- プレビュー機能の活用

### 4.2 カスタムエディター設定
- リッチテキストエディターのツールバーカスタマイズ
- メディア選択インターフェースの最適化
- 参照選択の使いやすさ向上

## 5. パフォーマンスとスケーラビリティ

### 5.1 コンテンツ最適化
- 画像の自動最適化
- CDN活用
- キャッシュ戦略

### 5.2 API利用の最適化
- GraphQLクエリの最適化
- 必要なフィールドのみ取得
- ページネーション対応

## 6. 拡張性への対応

### 6.1 将来的な機能追加
- ユーザーレビュー機能
- 比較表機能
- カテゴリー分類

### 6.2 コンテンツ構造の拡張
- 新規コンテンツタイプの追加
- フィールドの追加/変更
- リレーションの拡張

## 7. セキュリティと権限管理

### 7.1 ロール設定
- 管理者: フルアクセス
- エディター: コンテンツ編集のみ
- 閲覧者: 読み取りのみ

### 7.2 環境分離
- 開発環境
- ステージング環境
- 本番環境

## 8. バックアップと復旧

### 8.1 定期バックアップ
- コンテンツのエクスポート
- メディアファイルのバックアップ

### 8.2 復旧手順
- コンテンツの復元手順
- メディアの復元手順

## 9. 監視とメンテナンス

### 9.1 監視項目
- API使用状況
- メディア使用量
- エラー発生状況

### 9.2 定期メンテナンス
- 未使用アセットの削除
- パフォーマンス最適化
- セキュリティアップデート