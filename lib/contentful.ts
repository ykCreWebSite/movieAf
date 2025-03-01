import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    'Contentfulの環境変数が設定されていません。CONTENTFUL_SPACE_IDとCONTENTFUL_ACCESS_TOKENを.env.localに設定してください。'
  );
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// コンテンツタイプの型定義
export interface ITool {
  name: string;
  slug: string;
  description: string;
  type: 'desktop' | 'online' | 'browser';
  benefits: Document;
  drawbacks: Document;
  affiliateLink: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export interface IGuide {
  title: string;
  slug: string;
  tool: { fields: ITool };
  steps: Document;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

// ツール情報の取得
export async function getTools() {
  try {
    const response = await client.getEntries({
      content_type: 'tool',
      order: ['fields.name'],
    });

    if (!response.items) {
      console.error('ツール情報の取得に失敗しました');
      return [];
    }

    return response.items.map(item => ({
      ...item.fields,
      id: item.sys.id,
    })) as (ITool & { id: string })[];
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}

// 特定のツール情報の取得
export async function getTool(slug: string) {
  if (!slug) {
    console.error('スラッグが指定されていません');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'tool',
      'fields.slug': slug,
      limit: 1,
    });

    const tool = response.items[0];
    if (!tool) {
      console.error(`スラッグ "${slug}" に該当するツールが見つかりません`);
      return null;
    }

    return {
      ...tool.fields,
      id: tool.sys.id,
    } as ITool & { id: string };
  } catch (error) {
    console.error('Error fetching tool:', error);
    return null;
  }
}

// ガイド情報の取得
export async function getGuides() {
  try {
    const response = await client.getEntries({
      content_type: 'guide',
      order: ['fields.title'],
    });

    if (!response.items) {
      console.error('ガイド情報の取得に失敗しました');
      return [];
    }

    return response.items.map(item => ({
      ...item.fields,
      id: item.sys.id,
    })) as (IGuide & { id: string })[];
  } catch (error) {
    console.error('Error fetching guides:', error);
    return [];
  }
}

// 特定のガイド情報の取得
export async function getGuide(slug: string) {
  if (!slug) {
    console.error('スラッグが指定されていません');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'guide',
      'fields.slug': slug,
      limit: 1,
    });

    const guide = response.items[0];
    if (!guide) {
      console.error(`スラッグ "${slug}" に該当するガイドが見つかりません`);
      return null;
    }

    return {
      ...guide.fields,
      id: guide.sys.id,
    } as IGuide & { id: string };
  } catch (error) {
    console.error('Error fetching guide:', error);
    return null;
  }
}