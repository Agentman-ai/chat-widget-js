// src/components/assistant/message-renderer/svg-processor.ts
export class SvgProcessor {
  public containsSvg(content: string): boolean {
    return content.includes('<svg') && content.includes('</svg>');
  }

  public isPureSvg(text: string): boolean {
    const trimmed = text.trim();
    return trimmed.startsWith('<svg') && trimmed.endsWith('</svg>');
  }

  public processSvg(content: string): string {
    const cleanSvg = this.cleanSvg(content);
    return `<div class="chat-svg-wrapper">${cleanSvg}</div>`;
  }

  public splitContent(content: string): string[] {
    const parts: string[] = [];
    let currentIndex = 0;
    
    while (true) {
      const svgStart = content.indexOf('<svg', currentIndex);
      if (svgStart === -1) {
        if (currentIndex < content.length) {
          parts.push(content.slice(currentIndex));
        }
        break;
      }

      if (svgStart > currentIndex) {
        parts.push(content.slice(currentIndex, svgStart));
      }

      const svgEnd = content.indexOf('</svg>', svgStart);
      if (svgEnd === -1) {
        parts.push(content.slice(currentIndex));
        break;
      }

      parts.push(content.slice(svgStart, svgEnd + 6));
      currentIndex = svgEnd + 6;
    }

    return parts;
  }

  private cleanSvg(svg: string): string {
    return svg
      .replace(/`/g, '')
      .trim()
      .replace(/^svg\s*/, '')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/javascript:/g, '');
  }
}

