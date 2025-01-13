import type { Message } from '../types/types';

export class CustomRenderer {
  public renderHtml(content: string): string {
    // Use DOMPurify or similar library in production
    return this.sanitizeHtml(content);
  }

  public renderCustom(message: Message): string {
    // Handle custom message types based on data
    if (!message.data) return message.content;

    switch (message.data.customType) {
      case 'image':
        return this.renderImage(message.data);
      case 'button':
        return this.renderButton(message.data);
      case 'card':
        return this.renderCard(message.data);
      case 'carousel':
        return this.renderCarousel(message.data);
      case 'quickReplies':
        return this.renderQuickReplies(message.data);
      default:
        return message.content;
    }
  }

  private renderImage(data: any): string {
    const { url, alt, width, height } = data;
    return `
      <div class="chat-image">
        <img 
          src="${this.sanitizeUrl(url)}" 
          alt="${this.sanitizeText(alt || '')}"
          ${width ? `width="${width}"` : ''}
          ${height ? `height="${height}"` : ''}
          loading="lazy"
        >
      </div>
    `;
  }

  private renderButton(data: any): string {
    const { text, action, style = 'primary' } = data;
    return `
      <button 
        class="chat-button chat-button--${this.sanitizeText(style)}"
        data-action="${this.sanitizeText(action)}"
      >
        ${this.sanitizeText(text)}
      </button>
    `;
  }

  private renderCard(data: any): string {
    const { title, description, image, buttons } = data;
    return `
      <div class="chat-card">
        ${image ? this.renderImage(image) : ''}
        <div class="chat-card__content">
          ${title ? `<h4 class="chat-card__title">${this.sanitizeText(title)}</h4>` : ''}
          ${description ? `<p class="chat-card__description">${this.sanitizeText(description)}</p>` : ''}
          ${buttons ? `
            <div class="chat-card__actions">
              ${buttons.map((button: any) => this.renderButton(button)).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private renderCarousel(data: any): string {
    const { items } = data;
    if (!Array.isArray(items)) return '';

    return `
      <div class="chat-carousel">
        ${items.map((item: any) => this.renderCard(item)).join('')}
      </div>
    `;
  }

  private renderQuickReplies(data: any): string {
    const { replies } = data;
    if (!Array.isArray(replies)) return '';

    return `
      <div class="chat-quick-replies">
        ${replies.map((reply: any) => this.renderButton({
          ...reply,
          style: 'quick-reply'
        })).join('')}
      </div>
    `;
  }

  private sanitizeHtml(html: string): string {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '');
  }

  private sanitizeText(text: string): string {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private sanitizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol) ? url : '#';
    } catch {
      return '#';
    }
  }
}