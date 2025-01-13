// marked.d.ts
declare module 'marked' {
  interface MarkedOptions {
    gfm?: boolean;
    breaks?: boolean;
    headerIds?: boolean;
    mangle?: boolean;
    sanitize?: boolean;
    renderer?: any;
    baseUrl?: string;
    langPrefix?: string;

  }

  interface Marked {
    setOptions(options: MarkedOptions): void;
    parse(markdown: string, options?: MarkedOptions): string;
  }

  const marked: Marked;
  export default marked;
}

// Add this to global.d.ts or similar
interface Window {
  marked?: typeof import('marked').default;
}