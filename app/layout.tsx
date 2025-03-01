import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "動画ダウンロードツール比較サイト",
  description: "人気の動画ダウンロードツールを比較・紹介。VideoProc Converter、SaveFrom.net、Video DownloadHelperの特徴や使い方を解説。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto">
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:text-gray-300">ホーム</Link></li>
              <li><Link href="/tools/compare" className="hover:text-gray-300">ツール比較</Link></li>
              <li><Link href="/guides" className="hover:text-gray-300">使い方ガイド</Link></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 動画ダウンロードツール比較サイト. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
