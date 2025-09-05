// HTML content-ийг цэвэршүүлэх utility
// Аюулгүй HTML render хийхэд ашиглана

import DOMPurify from 'isomorphic-dompurify';

/**
 * HTML агуулгыг цэвэршүүлж, script болон аюултай tag-уудыг арилгана
 * @param html - цэвэршүүлэх HTML string
 * @returns цэвэршүүлсэн HTML string
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';
  
  return DOMPurify.sanitize(html, {
    // Зөвшөөрөгдөх tag-ууд
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'code', 'pre'
    ],
    
    // Зөвшөөрөгдөх attribute-ууд
    ALLOWED_ATTR: [
      'href', 'title', 'alt', 'src', 'width', 'height', 'class', 'id'
    ],
    
    // Зөвшөөрөгдөх URI scheme-ууд
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    
    // Хоосон element-үүдийг арилгах
    KEEP_CONTENT: true,
    
    // Whitespace хадгалах
    NORMALIZE_WHITESPACE: false
  });
}

/**
 * Хүрээллийн HTML-ээс текст-ийг гаргаж авах
 * @param html - HTML string
 * @returns цэвэр текст
 */
export function stripHTML(html: string): string {
  if (!html) return '';
  
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}

/**
 * HTML агуулгаас хураангуй үүсгэх
 * @param html - HTML string
 * @param length - хамгийн их урт (default: 160)
 * @returns хураангуй текст
 */
export function createExcerpt(html: string, length: number = 160): string {
  const text = stripHTML(html);
  if (text.length <= length) return text;
  
  return text.substring(0, length).trim() + '...';
}
