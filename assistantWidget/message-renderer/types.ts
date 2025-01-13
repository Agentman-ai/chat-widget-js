// src/components/assistant/message-renderer/types.ts
export interface MessageRendererOptions {
  enableMarkdown: boolean;
  enableHtml: boolean;
  enableEmoji: boolean;
  enableLinks: boolean;
  enableSvg: boolean;
}

export interface ProcessedContent {
  html: string;
  type: 'text' | 'svg' | 'mixed';
}

export interface EmojiMap {
  [key: string]: string;
}