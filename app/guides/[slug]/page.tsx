import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getGuide } from '@/lib/contentful';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await getGuide(params.slug);
  if (!guide) return {};

  return {
    title: `${guide.title} | 動画ダウンロードツール使い方ガイド`,
    description: `${guide.tool.fields.name}の詳しい使い方を解説。ステップバイステップで簡単に学べます。`,
  };
}

export default async function GuidePage({ params }: Props) {
  const guide = await getGuide(params.slug);
  
  if (!guide) {
    notFound();
  }

  const tool = guide.tool.fields;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
        <p className="text-xl text-gray-600">
          {tool.name}の使い方を詳しく解説します
        </p>
      </section>

      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <Image
          src={guide.image.fields.file.url}
          alt={guide.title}
          fill
          className="object-cover"
        />
      </div>

      <section className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">使い方手順</h2>
        <div className="prose max-w-none">
          {documentToReactComponents(guide.steps)}
        </div>
      </section>

      <section className="bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">ツールの詳細情報</h2>
        <p className="mb-6">
          {tool.description}
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {tool.name}の詳細を見る
          </Link>
          <a
            href={tool.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            ダウンロードする
          </a>
        </div>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">よくある質問</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">Q: インストール後、起動できない場合は？</h3>
            <p className="text-gray-600">
              A: システム要件を確認し、最新バージョンをインストールしているか確認してください。
              問題が解決しない場合は、公式サポートにお問い合わせください。
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Q: ダウンロードに時間がかかる場合は？</h3>
            <p className="text-gray-600">
              A: インターネット接続速度を確認してください。
              また、動画の品質設定を下げることで、ダウンロード時間を短縮できる場合があります。
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Q: 対応している動画形式は？</h3>
            <p className="text-gray-600">
              A: MP4、MKV、AVI、WMVなど、一般的な動画形式に対応しています。
              詳細は各ツールの仕様をご確認ください。
            </p>
          </div>
        </div>
      </section>

      <section className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">他のツールも比較する</h2>
        <Link
          href="/tools/compare"
          className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ツール比較表を見る
        </Link>
      </section>
    </div>
  );
}