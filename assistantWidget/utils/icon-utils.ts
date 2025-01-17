// icon-utils.ts

/**
 * Determines if a given string is a URL to an image.
 * @param url - The string to check
 * @returns boolean indicating if the string is a URL
 */
export const isImageUrl = (url: string): boolean => {
  if (typeof url !== 'string') {
    return false;
  }
  // If it contains HTML tags, it's not a URL
  if (url.includes('<') && url.includes('>')) {
    return false;
  }
  // Check for URLs
  return url.startsWith('/') || url.startsWith('http') || url.startsWith('https');
};

/**
 * Converts an icon source (URL or SVG) to HTML.
 * @param icon - The icon source (URL or SVG string)
 * @param alt - Alt text for accessibility
 * @param size - Size in pixels for width and height
 * @returns HTML string for the icon
 */
export const getIconHtml = (icon: string, alt: string, size: number = 32): string => {
  return isImageUrl(icon)
    ? `<img src="${icon}" alt="${alt}" width="${size}" height="${size}"/>`
    : icon;
};
