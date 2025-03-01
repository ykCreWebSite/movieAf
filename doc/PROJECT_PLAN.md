# 動画ダウンロードツール アフィリエイトサイト 実装計画

## 1. プロジェクト初期設定

### 環境構築
```bash
# リポジトリのクローンと初期セットアップ
git clone https://github.com/ykCreWebSite/dougaAF.git
cd dougaAF

# Next.jsプロジェクトの作成
npx create-next-app@latest . --typescript --tailwind --eslint

# 必要なパッケージのインストール
npm install @contentful/rich-text-react-renderer
npm install @contentful/rich-text-types
npm install contentful
```

### ブランチ戦略
- `main`: 本番環境用ブランチ
- `develop`: 開発用ブランチ
- 機能ブランチ: `feature/機能名`

## 2. 開発フロー

### GitHubフロー
1. 機能ブランチの作成
```bash
git checkout -b feature/機能名
```

2. 開発作業
```bash
git add .
git commit -m "コミットメッセージ"
git push origin feature/機能名
```

3. プルリクエスト作成
```bash
gh pr create --title "機能名の実装" --body "実装内容の説明"
```

4. レビュー & マージ
- GitHub上でレビュー
- CI/CDパイプラインの確認
- developブランチへのマージ

### GitHub Actions
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ develop, main ]
  pull_request:
    branches: [ develop, main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run lint
```

## 3. アプリケーション構造

### ディレクトリ構成
```
src/
├── app/
│   ├── page.tsx                 # トップページ
│   ├── tools/
│   │   ├── [slug]/page.tsx     # 各ツール詳細ページ
│   │   └── compare/page.tsx    # ツール比較ページ
│   └── guides/
│       └── [slug]/page.tsx     # 使い方ガイド
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── tools/
│   │   ├── ToolCard.tsx
│   │   └── ToolComparison.tsx
│   └── seo/
│       └── MetaTags.tsx
└── lib/
    ├── contentful.ts
    └── schema.ts
```

### コンポーネント設計
- Layout: 共通レイアウト
- ToolCard: ツール紹介カード
- ToolComparison: 比較表
- MetaTags: SEO用メタタグ

## 4. コンテンツ管理

### Contentfulモデル設計

#### ツール情報（Tool）
- 名前
- スラッグ
- 説明
- メリット（リッチテキスト）
- デメリット（リッチテキスト）
- アフィリエイトリンク
- 画像

#### 使い方ガイド（Guide）
- タイトル
- スラッグ
- ツール参照
- 手順（リッチテキスト）
- 画像

### SEO最適化
- 構造化データの実装
- メタタグの動的生成
- サイトマップの自動生成

## 5. デプロイメント

### Vercel設定
1. GitHubとの連携
2. 環境変数の設定
   - CONTENTFUL_SPACE_ID
   - CONTENTFUL_ACCESS_TOKEN
3. デプロイメント設定
   - ISRの設定
   - キャッシュ戦略

### デプロイフロー
1. feature → develop: プレビューデプロイ
2. develop → main: 本番デプロイ

## 6. プロジェクト管理

### GitHub Issues
- 機能実装タスク
- バグ報告
- 改善提案

### マイルストーン
1. 基本機能実装
   - プロジェクト設定
   - ページテンプレート
   - Contentful連携
2. コンテンツ実装
   - ツール情報
   - 使い方ガイド
3. SEO最適化
   - メタタグ
   - 構造化データ
4. デプロイ設定
   - Vercel連携
   - CI/CD設定