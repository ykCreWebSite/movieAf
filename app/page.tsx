import Image from 'next/image';
import Link from 'next/link';

interface ToolCard {
  id: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
}

const tools: ToolCard[] = [
  {
    id: 'videoprocconverter',
    name: 'VideoProc Converter',
    type: 'デスクトップソフト',
    description: '高性能な動画ダウンロード・変換ソフト。4K動画対応、高速処理が特徴。',
    imageUrl: '/images/videoProc.png',
  },
  {
    id: 'savefrom',
    name: 'SaveFrom.net',
    type: 'オンラインサービス',
    description: 'ブラウザから直接動画をダウンロード。インストール不要で手軽に利用可能。',
    imageUrl: '/images/savefrom.png',
  },
  {
    id: 'downloadhelper',
    name: 'Video DownloadHelper',
    type: 'ブラウザ拡張機能',
    description: 'ブラウザに統合された使いやすい動画ダウンロード機能を提供。',
    imageUrl: '/images/downloadhelper.png',
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">
          動画ダウンロードツール比較
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          用途に合わせて選べる3つの動画ダウンロードツール。
          デスクトップソフト、オンラインサービス、ブラウザ拡張機能をご紹介します。
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 mb-4">
              <Image
                src={tool.imageUrl}
                alt={tool.name}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{tool.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{tool.type}</p>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <Link
              href={`/tools/${tool.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              詳細を見る
            </Link>
          </div>
        ))}
      </section>

      <section className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4">ツールを比較</h2>
        <p className="text-gray-600 mb-6">
          各ツールの特徴を詳しく比較し、あなたに最適なツールを見つけましょう。
        </p>
        <Link
          href="/tools/compare"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          ツール比較表を見る
        </Link>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">使い方ガイド</h2>
        <p className="text-gray-600 text-center mb-6">
          各ツールの詳しい使い方やTipsをご紹介します。
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/guides/${tool.id}`}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold mb-2">{tool.name}の使い方</h3>
              <p className="text-sm text-gray-600">
                ステップバイステップで解説します
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
