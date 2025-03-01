# Contentfulフィールド設定詳細ガイド

## フィールドの追加手順

### 1. Short textフィールドの設定（name, slug, type）

1. 「Add field」をクリック
2. 「Short text」を選択
3. 基本設定：
   ```
   Name: フィールド名（例：name）
   Field ID: 自動生成（例：name）
   ```
4. 「Create and configure」をクリック
5. バリデーション設定：
   - Required: チェックを入れる
   - Unique: slugの場合のみチェックを入れる
   - Pattern: slugの場合は `^[a-z0-9-]+$` を設定
   - Character limit: 必要に応じて設定（デフォルト：256）

### 2. Long textフィールドの設定（description）

1. 「Add field」をクリック
2. 「Long text」を選択
3. 基本設定：
   ```
   Name: description
   Field ID: 自動生成
   ```
4. バリデーション設定：
   - Required: チェックを入れる
   - Character limit: 必要に応じて設定（デフォルト：50000）

### 3. Rich textフィールドの設定（benefits, drawbacks）

1. 「Add field」をクリック
2. 「Rich text」を選択
3. 基本設定：
   ```
   Name: benefits/drawbacks
   Field ID: 自動生成
   ```
4. バリデーション設定：
   - Required: チェックを入れる
   - Allowed node types:
     - Heading 1
     - Heading 2
     - Paragraph
     - Unordered list
     - Ordered list
     - Quote
     - Horizontal rule
   - Allowed marks:
     - Bold
     - Italic
     - Underline

### 4. Mediaフィールドの設定（image）

1. 「Add field」をクリック
2. 「Media」を選択
3. 基本設定：
   ```
   Name: image
   Field ID: 自動生成
   ```
4. バリデーション設定：
   - Required: チェックを入れる
   - Accept only specified file types: チェックを入れる
   - Allowed file types:
     - Image: チェックを入れる
     - その他: チェックを外す

### 5. Referenceフィールドの設定（tool）

1. 「Add field」をクリック
2. 「Reference」を選択
3. 基本設定：
   ```
   Name: tool
   Field ID: 自動生成
   ```
4. バリデーション設定：
   - Required: チェックを入れる
   - Accept only specified entry types: チェックを入れる
   - Allowed entry types: 「Tool」を選択
   - Number of references:
     - Exactly: 1を設定

## バリデーションルールの詳細

### slugフィールドのパターン
```
^[a-z0-9-]+$
```
- `^`: 文字列の先頭
- `[a-z0-9-]`: 小文字のアルファベット、数字、ハイフンのみ許可
- `+`: 1文字以上
- `$`: 文字列の末尾

### typeフィールドのパターン
```
^(desktop|online|browser)$
```
- `^`: 文字列の先頭
- `(desktop|online|browser)`: desktopまたはonlineまたはbrowserのいずれか
- `$`: 文字列の末尾

### affiliateLinkフィールドのバリデーション
- Type: URL
- Pattern: `^https?://.*$`
  - `^`: 文字列の先頭
  - `https?://`: httpまたはhttpsで始まる
  - `.*`: 任意の文字列
  - `$`: 文字列の末尾

## フィールド設定のヒント

1. フィールドの順序
   - 基本情報（name, slug）を上部に配置
   - 関連フィールドをグループ化
   - 参照フィールドを下部に配置

2. ヘルプテキスト
   - 各フィールドに説明文を追加
   - 入力例や制約事項を明記
   - 特殊なフォーマットが必要な場合は具体例を示す

3. デフォルト値
   - type: 必要に応じてデフォルト値を設定
   - 頻繁に使用される値がある場合は設定を検討

4. アピアランス
   - Rich textフィールド: フルスクリーンエディタを有効化
   - URLフィールド: リンクプレビューを有効化
   - Referenceフィールド: エントリーカードを表示

## トラブルシューティング

1. フィールドが保存できない
   - 必須項目が入力されているか確認
   - パターンが正しく設定されているか確認
   - 文字数制限を超えていないか確認

2. バリデーションエラー
   - エラーメッセージを確認
   - 入力値がパターンに一致しているか確認
   - 参照フィールドの制限を確認

3. リッチテキストの問題
   - 許可されているノードタイプを確認
   - マークアップが正しいか確認
   - エディタの表示モードを切り替えて確認