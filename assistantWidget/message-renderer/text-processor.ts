// src/components/assistant/message-renderer/text-processor.ts
import type { MessageRendererOptions, EmojiMap } from './types';

export class TextProcessor {
  constructor(private emojiMap: EmojiMap) {}

  public processText(content: string, options: MessageRendererOptions): string {
    let processed = content;
    
    // First sanitize the text
    processed = this.sanitizeText(processed);
    
    // If marked is available and markdown is enabled, use it
    if (options.enableMarkdown !== false && window.marked) {
      window.marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: false,
        mangle: false,
        sanitize: true,
      });
      processed = window.marked.parse(processed);

      // Add target="_blank" to all links
      processed = processed.replace(
        /<a\s+(?:[^>]*?)href="([^"]*)"([^>]*?)>/gi,
        '<a href="$1" target="_blank" rel="noopener noreferrer" $2>'
      );
            
    } else {
      // Fallback markdown processing
      processed = this.applyMarkdown(processed);
    }

    return processed;
  }

  private sanitizeText(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private replaceEmoji(text: string): string {
    return text.replace(/:\)|:\(|:D|;\)|<3/g, match => this.emojiMap[match] || match);
  }

  private applyMarkdown(text: string): string {
    let processed = text;

    // Only apply our markdown processing if marked is not available
    // Process links first to avoid interference
    processed = processed.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Then process other markdown elements
    processed = processed
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Line breaks
      .replace(/\n/g, '<br>');

    return processed;
  }
}