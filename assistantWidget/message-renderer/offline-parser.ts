export class OfflineParser {
  static rules = {
    // Headers
    h1: { pattern: /^#\s+(.+)$/gm, replace: '<h1>$1</h1>' },
    h2: { pattern: /^##\s+(.+)$/gm, replace: '<h2>$1</h2>' },
    h3: { pattern: /^###\s+(.+)$/gm, replace: '<h3>$1</h3>' },
    
    // Emphasis
    bold: { pattern: /\*\*(.*?)\*\*/g, replace: '<strong>$1</strong>' },
    italic: { pattern: /\*(.*?)\*/g, replace: '<em>$1</em>' },
    
    // Links and URLs
    markdownLink: { 
      pattern: /\[([^\]]+)\]\(([^)]+)\)/g, 
      replace: '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>' 
    },
    autoLink: { 
      pattern: /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g, 
      replace: '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>' 
    },
    
    // Code
    inlineCode: { pattern: /`([^`]+)`/g, replace: '<code>$1</code>' },
    codeBlock: { 
      pattern: /```([\s\S]*?)```/g, 
      replace: '<pre><code>$1</code></pre>' 
    },
    
    // Lists
    bulletList: { 
      pattern: /^\s*[-*+]\s+(.+)/gm, 
      replace: '<li>$1</li>',
      wrapper: '<ul>$1</ul>' 
    },
    numberList: { 
      pattern: /^\s*\d+\.\s+(.+)/gm, 
      replace: '<li>$1</li>',
      wrapper: '<ol>$1</ol>' 
    },
    
    // Blockquotes
    blockquote: { 
      pattern: /^>\s+(.+)/gm, 
      replace: '<blockquote>$1</blockquote>' 
    },
    
    // Line breaks
    lineBreak: { pattern: /\n/g, replace: '<br>' }
  };

  static parse(text: string): string {
    try {
      let html = text;

      // Process code blocks first to prevent interference
      if (this.rules.codeBlock.pattern.test(html)) {
        html = html.replace(this.rules.codeBlock.pattern, this.rules.codeBlock.replace);
      }

      // Process headers
      html = html
        .replace(this.rules.h3.pattern, this.rules.h3.replace)
        .replace(this.rules.h2.pattern, this.rules.h2.replace)
        .replace(this.rules.h1.pattern, this.rules.h1.replace);

      // Process lists
      let listMatches;
      
      // Bullet lists
      listMatches = html.match(new RegExp(this.rules.bulletList.pattern.source, 'gm'));
      if (listMatches) {
        const bulletItems = listMatches.map((item: string) => 
          item.replace(this.rules.bulletList.pattern, this.rules.bulletList.replace)
        ).join('');
        html = html.replace(
          new RegExp(this.rules.bulletList.pattern.source, 'gm'),
          this.rules.bulletList.wrapper.replace('$1', bulletItems)
        );
      }

      // Numbered lists
      listMatches = html.match(new RegExp(this.rules.numberList.pattern.source, 'gm'));
      if (listMatches) {
        const numberItems = listMatches.map((item: string) => 
          item.replace(this.rules.numberList.pattern, this.rules.numberList.replace)
        ).join('');
        html = html.replace(
          new RegExp(this.rules.numberList.pattern.source, 'gm'),
          this.rules.numberList.wrapper.replace('$1', numberItems)
        );
      }

      // Process inline formatting
      html = html
        .replace(this.rules.bold.pattern, this.rules.bold.replace)
        .replace(this.rules.italic.pattern, this.rules.italic.replace)
        .replace(this.rules.inlineCode.pattern, this.rules.inlineCode.replace);

      // Process links
      html = html
        .replace(this.rules.markdownLink.pattern, this.rules.markdownLink.replace)
        .replace(this.rules.autoLink.pattern, this.rules.autoLink.replace);

      // Process blockquotes
      html = html.replace(this.rules.blockquote.pattern, this.rules.blockquote.replace);

      // Process line breaks last
      html = html.replace(this.rules.lineBreak.pattern, this.rules.lineBreak.replace);

      return html;
    } catch (error) {
      console.warn('Offline parser error:', error);
      return text; // Return original text if parsing fails
    }
  }

  // Helper method to sanitize URLs
  static sanitizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol) ? url : '#';
    } catch {
      return '#';
    }
  }
}
