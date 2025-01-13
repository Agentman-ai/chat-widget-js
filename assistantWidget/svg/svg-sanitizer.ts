// svg-sanitizer.ts

export interface SanitizerReport {
  originalSize: number;
  sanitizedSize: number;
  removedElements: Array<{tag: string, reason: string}>;
  removedAttributes: Array<{element: string, attribute: string, value: string, reason: string}>;
  suspiciousPatterns: Array<{pattern: string, matches: string[]}>;
  success: boolean;
  errors: string[];
}

export class SvgSanitizer {
  // Extended list of allowed elements
  private static readonly ALLOWED_ELEMENTS = new Set([
    // Basic shapes
    'svg', 'circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect', 
    // Container and structural elements
    'g', 'defs', 'symbol', 'use', 'clipPath', 'mask',
    // Text elements
    'text', 'tspan', 'textPath', 'title', 'desc',
    // Gradient elements
    'linearGradient', 'radialGradient', 'stop',
    // Additional graphical elements
    'image', 'marker', 'pattern', 'foreignObject',
    // Animation elements (if you want to support them)
    'animate', 'animateMotion', 'animateTransform'
  ]);

  // Extended list of allowed attributes
  private static readonly ALLOWED_ATTRIBUTES = new Set([
    // Common attributes
    'id', 'class', 'width', 'height', 'viewBox', 'preserveAspectRatio',
    'xmlns', 'version', 'baseProfile', 'x', 'y', 'transform',
    // Presentation attributes
    'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width',
    'stroke-linecap', 'stroke-linejoin', 'stroke-opacity', 'stroke-dasharray',
    'stroke-dashoffset', 'opacity', 'style', 'display', 'visibility',
    'clip-path', 'mask', 'filter', 'color', 'cursor',
    // Text-specific attributes
    'text-anchor', 'font-family', 'font-size', 'font-weight', 'font-style',
    'text-decoration', 'letter-spacing', 'word-spacing', 'writing-mode',
    'dominant-baseline', 'alignment-baseline',
    // Gradient/Pattern attributes
    'gradientUnits', 'gradientTransform', 'spreadMethod', 'offset',
    'stop-color', 'stop-opacity', 'patternUnits', 'patternTransform',
    // Animation attributes
    'dur', 'repeatCount', 'begin', 'end', 'from', 'to', 'values'
  ]);

  // Extended suspicious patterns
  private static readonly SUSPICIOUS_PATTERNS = [
    // Script-related patterns
    { pattern: /javascript:/i, description: 'JavaScript protocol' },
    { pattern: /data:/i, description: 'Data URL' },
    { pattern: /vbscript:/i, description: 'VBScript protocol' },
    { pattern: /on\w+=/i, description: 'Event handler attribute' },
    // CSS-related patterns
    { pattern: /expression\s*\(/i, description: 'CSS expression' },
    { pattern: /url\s*\(\s*['"]?\s*data:/i, description: 'Data URL in CSS' },
    // Script tag patterns
    { pattern: /<script\b/i, description: 'Script tag' },
    { pattern: /[<>]script/i, description: 'Malformed script tag' },
    // Additional dangerous patterns
    { pattern: /behaviour:/i, description: 'CSS behavior' },
    { pattern: /-moz-binding:/i, description: 'Mozilla binding' },
    { pattern: /@import/i, description: 'CSS import' },
    { pattern: /<!--[^>]*>.*?-->/gm, description: 'Conditional comments' },
    { pattern: /base64/i, description: 'Base64 encoding' },
    { pattern: /eval\s*\(/i, description: 'Eval function' },
    { pattern: /setInterval|setTimeout/i, description: 'Timer functions' },
    { pattern: /createElement|appendChild|createElementNS/i, description: 'DOM manipulation' },
    // File system related
    { pattern: /file:/i, description: 'File protocol' },
    // Additional protocols
    { pattern: /jar:/i, description: 'JAR protocol' },
    { pattern: /ftp:/i, description: 'FTP protocol' },
    { pattern: /mailto:/i, description: 'Mailto protocol' }
  ];

  public sanitize(svg: string): { sanitized: string; report: SanitizerReport } {
    const report: SanitizerReport = {
      originalSize: svg.length,
      sanitizedSize: 0,
      removedElements: [],
      removedAttributes: [],
      suspiciousPatterns: [],
      success: false,
      errors: []
    };

    try {
      // Check for suspicious patterns first
      const suspiciousMatches = this.checkSuspiciousPatterns(svg);
      report.suspiciousPatterns = suspiciousMatches;

      if (suspiciousMatches.length > 0) {
        report.errors.push('Suspicious patterns detected');
        return { sanitized: '', report };
      }

      // Parse SVG
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'image/svg+xml');

      // Check for parsing errors
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        report.errors.push(`Parser error: ${parserError.textContent}`);
        return { sanitized: '', report };
      }

      // Sanitize the document
      this.sanitizeNode(doc.documentElement, report);

      // Serialize back to string
      const serializer = new XMLSerializer();
      const sanitized = serializer.serializeToString(doc);
      
      report.sanitizedSize = sanitized.length;
      report.success = true;

      return { sanitized, report };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      report.errors.push(`Sanitization error: ${errorMessage}`);
      return { sanitized: '', report };
    }
  }

  private sanitizeNode(node: Element, report: SanitizerReport): void {
    const tagName = node.tagName.toLowerCase();
    
    // Remove disallowed elements
    if (!SvgSanitizer.ALLOWED_ELEMENTS.has(tagName)) {
      report.removedElements.push({
        tag: tagName,
        reason: 'Element not in allowlist'
      });
      node.remove();
      return;
    }

    // Check attributes
    Array.from(node.attributes).forEach(attr => {
      const name = attr.name.toLowerCase();
      const value = attr.value;

      if (!SvgSanitizer.ALLOWED_ATTRIBUTES.has(name)) {
        report.removedAttributes.push({
          element: tagName,
          attribute: name,
          value: value,
          reason: 'Attribute not in allowlist'
        });
        node.removeAttribute(name);
      } else if (this.isUnsafeAttributeValue(name, value)) {
        report.removedAttributes.push({
          element: tagName,
          attribute: name,
          value: value,
          reason: 'Unsafe attribute value'
        });
        node.removeAttribute(name);
      }
    });

    // Recursively sanitize children
    Array.from(node.children).forEach(child => {
      this.sanitizeNode(child as Element, report);
    });
  }

  private isUnsafeAttributeValue(name: string, value: string): boolean {
    // Check for unsafe URLs
    if (name === 'href' || name === 'xlink:href') {
      try {
        const url = new URL(value, window.location.href);
        if (!['http:', 'https:', '#'].includes(url.protocol)) {
          return true;
        }
      } catch {
        return !value.startsWith('#'); // Allow only fragment identifiers
      }
    }

    // Check style attributes
    if (name === 'style') {
      return this.checkSuspiciousPatterns(value).length > 0;
    }

    return false;
  }

  private checkSuspiciousPatterns(content: string): Array<{pattern: string, matches: string[]}> {
    const matches: Array<{pattern: string, matches: string[]}> = [];
    
    SvgSanitizer.SUSPICIOUS_PATTERNS.forEach(({pattern, description}) => {
      const found = content.match(pattern);
      if (found) {
        matches.push({
          pattern: description,
          matches: found
        });
      }
    });

    return matches;
  }
}

// Example usage in MessageRenderer
export class MessageRenderer {
  private svgSanitizer: SvgSanitizer;
  private reportCallback?: (report: SanitizerReport) => void;

  constructor(reportCallback?: (report: SanitizerReport) => void) {
    this.svgSanitizer = new SvgSanitizer();
    this.reportCallback = reportCallback;
  }

  private renderSvg(content: string): string {
    const { sanitized, report } = this.svgSanitizer.sanitize(content);
    
    // Call report callback if provided
    if (this.reportCallback) {
      this.reportCallback(report);
    }

    if (!sanitized) {
      return `<div class="chat-error">Invalid SVG content removed for security</div>`;
    }

    return `
      <div class="chat-svg-container">
        ${sanitized}
      </div>
    `;
  }
}