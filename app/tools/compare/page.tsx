import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '動画ダウンロードツール比較表 | 機能・性能を詳しく比較',
  description: 'VideoProc Converter、SaveFrom.net、Video DownloadHelperの機能、性能、使いやすさを詳しく比較。あなたに最適なツールが見つかります。',
};

interface ComparisonItem {
  feature: string;
  videoProc: string | boolean;
  saveFrom: string | boolean;
  downloadHelper: string | boolean;
}

const comparisonData: ComparisonItem[] = [
  {
    feature: '対応プラットフォーム',
    videoProc: 'Windows, Mac',
    saveFrom: 'すべてのOS（ブラウザ）',
    downloadHelper: 'Firefox, Chrome, Edge',
  },
  {
    feature: '動画品質',
    videoProc: '4K/8K対応',
    saveFrom: '1080pまで',
    downloadHelper: '利用サイトに依存',
  },
  {
    feature: '変換機能',
    videoProc: true,
    saveFrom: false,
    downloadHelper: false,
  },
  {
    feature: '一括ダウンロード',
    videoProc: true,
    saveFrom: false,
    downloadHelper: true,
  },
  {
    feature: '使いやすさ',
    videoProc: '★★★★☆',
    saveFrom: '★★★★★',
    downloadHelper: '★★★★☆',
  },
  {
    feature: '処理速度',
    videoProc: '★★★★★',
    saveFrom: '★★★☆☆',
    downloadHelper: '★★★★☆',
  },
  {
    feature: '価格',
    videoProc: '有料（永続ライセンス）',
    saveFrom: '無料',
    downloadHelper: '無料（寄付歓迎）',
  },
];

export default function ComparePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">動画ダウンロードツール比較表</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          3つの動画ダウンロードツールの機能や性能を詳しく比較。
          あなたの用途に最適なツールを見つけましょう。
        </p>
      </section>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-4 text-left min-w-[200px]">機能・特徴</th>
              <th className="border p-4 text-left min-w-[200px]">
                VideoProc Converter
                <div className="text-sm font-normal text-gray-600">デスクトップソフト</div>
              </th>
              <th className="border p-4 text-left min-w-[200px]">
                SaveFrom.net
                <div className="text-sm font-normal text-gray-600">オンラインサービス</div>
              </th>
              <th className="border p-4 text-left min-w-[200px]">
                Video DownloadHelper
                <div className="text-sm font-normal text-gray-600">ブラウザ拡張機能</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border p-4 font-medium">{item.feature}</td>
                <td className="border p-4">
                  {typeof item.videoProc === 'boolean' ? (
                    item.videoProc ? '✅' : '❌'
                  ) : (
                    item.videoProc
                  )}
                </td>
                <td className="border p-4">
                  {typeof item.saveFrom === 'boolean' ? (
                    item.saveFrom ? '✅' : '❌'
                  ) : (
                    item.saveFrom
                  )}
                </td>
                <td className="border p-4">
                  {typeof item.downloadHelper === 'boolean' ? (
                    item.downloadHelper ? '✅' : '❌'
                  ) : (
                    item.downloadHelper
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="bg-blue-50 p-8 rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">選び方のポイント</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">動画の品質にこだわる方</h3>
            <p className="text-gray-600">
              4K/8K動画の高品質ダウンロードに対応している「VideoProc Converter」がおすすめです。
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">手軽に使いたい方</h3>
            <p className="text-gray-600">
              インストール不要ですぐに使える「SaveFrom.net」が便利です。
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">ブラウザでよく動画を見る方</h3>
            <p className="text-gray-600">
              ブラウザに統合される「Video DownloadHelper」で快適にダウンロードできます。
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">動画の編集もしたい方</h3>
            <p className="text-gray-600">
              変換・編集機能も搭載している「VideoProc Converter」が最適です。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}