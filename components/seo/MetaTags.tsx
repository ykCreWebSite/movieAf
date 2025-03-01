import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
}

export default function MetaTags({
  title,
  description,
  ogImage = 'https://example.com/default-og-image.jpg', // デフォルトのOGP画像を設定
  canonicalUrl,
  type = 'website',
}: MetaTagsProps) {
  const siteTitle = '動画ダウンロードツール比較';
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <Head>
      {/* 基本的なメタタグ */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* OGP設定 */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteTitle,
            description: description,
            url: canonicalUrl || 'https://example.com', // サイトのURLを設定
          }),
        }}
      />
    </Head>
  );
}