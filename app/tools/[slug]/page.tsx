import { Metadata } from 'next';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getTool } from '@/lib/contentful';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = await getTool(params.slug);
  if (!tool) return {};

  return {
    title: `${tool.name}の詳細と使い方 | 動画ダウンロードツール比較`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: Props) {
  const tool = await getTool(params.slug);
  
  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
        <p className="text-xl text-gray-600">{tool.description}</p>
      </section>

      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <Image
          src={tool.image.fields.file.url}
          alt={tool.name}
          fill
          className="object-contain"
        />
      </div>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-800">メリット</h2>
          <div className="prose">
            {documentToReactComponents(tool.benefits)}
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-800">デメリット</h2>
          <div className="prose">
            {documentToReactComponents(tool.drawbacks)}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">ダウンロードはこちら</h2>
        <p className="mb-6">
          {tool.type === 'desktop' && '高性能な動画ダウンロード・変換ソフトを今すぐお試しください。'}
          {tool.type === 'online' && 'ブラウザから直接動画をダウンロード。インストール不要です。'}
          {tool.type === 'browser' && 'ブラウザに完全統合された便利な拡張機能です。'}
        </p>
        <a
          href={tool.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {tool.name}を入手する
        </a>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">使い方のポイント</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {tool.type === 'desktop' && (
            <>
              <div className="p-4">
                <h3 className="font-bold mb-2">1. ダウンロードとインストール</h3>
                <p className="text-gray-600">公式サイトからソフトウェアをダウンロードし、インストールします。</p>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">2. URLの入力</h3>
                <p className="text-gray-600">ダウンロードしたい動画のURLをソフトウェアに貼り付けます。</p>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">3. 変換とダウンロード</h3>
                <p className="text-gray-600">必要に応じて形式を選択し、ダウンロードを開始します。</p>
              </div>
            </>
          )}
          {tool.type === 'online' && (
            <>
              <div className="p-4">
                <h3 className="font-bold mb-2">1. サイトにアクセス</h3>
                <p className="text-gray-600">公式サイトにアクセスします。インストール不要です。</p>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">2. URLを貼り付け</h3>
                <p className="text-gray-600">動画のURLを入力欄に貼り付けます。</p>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">3. ダウンロード</h3>
                <p className="text-gray-600">品質を選択してダウンロードを開始します。</p>
              </div>
            </>
          )}
          {tool.type === 'browser' && (
            <>
              <div className="p-4">
                <h3 className="font-bold mb-2">1. 拡張機能のインストール</h3>
                <p className="text-gray-600">ブラウザの拡張機能ストアからインストールします。</p>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">2. 動画ページを開く</h3>
                <p className="text-gray-600">ダウンロードしたい動画のページを開きます。</p>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">3. ダウンロードを実行</h3>
                <p className="text-gray-600">拡張機能のアイコンをクリックしてダウンロードします。</p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}