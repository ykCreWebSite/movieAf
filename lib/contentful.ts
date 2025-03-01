import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// コンテンツの型定義
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
    });
    return response.items.map(item => ({
      ...item.fields,
      id: item.sys.id
    })) as (ITool & { id: string })[];
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}

// 特定のツール情報の取得
export async function getTool(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: 'tool',
      'fields.slug': slug,
      limit: 1,
    });
    const tool = response.items[0];
    return tool ? {
      ...tool.fields,
      id: tool.sys.id
    } as ITool & { id: string } : null;
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
    });
    return response.items.map(item => ({
      ...item.fields,
      id: item.sys.id
    })) as (IGuide & { id: string })[];
  } catch (error) {
    console.error('Error fetching guides:', error);
    return [];
  }
}

// 特定のガイド情報の取得
export async function getGuide(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: 'guide',
      'fields.slug': slug,
      limit: 1,
    });
    const guide = response.items[0];
    return guide ? {
      ...guide.fields,
      id: guide.sys.id
    } as IGuide & { id: string } : null;
  } catch (error) {
    console.error('Error fetching guide:', error);
    return null;
  }
}