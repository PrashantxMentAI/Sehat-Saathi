import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseAIResponse(response: string): string {
  if (!response) return "";

  let html = response;

  // Process headings: **text** -> <h4>text</h4>
  html = html.replace(/\*\*(.*?)\*\*/g, '<h4>$1</h4>');

  // Process paragraphs and lists
  const lines = html.split('\n').filter(line => line.trim() !== '');
  
  let inList = false;
  html = lines.map(line => {
    line = line.trim();
    
    // Handle list items: * item -> <li>item</li>
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const listItem = `<li>${line.substring(2)}</li>`;
      if (!inList) {
        inList = true;
        return `<ul>${listItem}`;
      }
      return listItem;
    }

    // Handle non-list items
    const closingTag = inList ? '</ul>' : '';
    inList = false;

    // Check if it's a heading that we already processed
    if (line.startsWith('<h4>')) {
      return `${closingTag}${line}`;
    }
    
    // Treat other lines as paragraphs
    return `${closingTag}<p>${line}</p>`;

  }).join('');

  if (inList) {
    html += '</ul>';
  }

  return html;
}
