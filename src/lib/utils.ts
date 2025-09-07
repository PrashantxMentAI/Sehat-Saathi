
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

  const lines = html.split('\n').filter(line => line.trim() !== '');
  
  let inList = false;
  html = lines.map(line => {
    line = line.trim();
    
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const listItem = `<li>${line.substring(2)}</li>`;
      if (!inList) {
        inList = true;
        return `<ul>${listItem}`;
      }
      return listItem;
    }

    const closingTag = inList ? '</ul>' : '';
    inList = false;
    
    if (line.startsWith('<h4>')) {
        return `${closingTag}${line}`;
    }
    
    return `${closingTag}${line}`;

  }).join('<br/>');

  if (inList) {
    html += '</ul>';
  }
  
  // Clean up by replacing <br> tags that are directly before or after block elements
  html = html.replace(/<br\/><ul>/g, '<ul>');
  html = html.replace(/<\/h4><br\/>/g, '</h4>');
  html = html.replace(/<\/ul><br\/>/g, '</ul>');

  return html;
}
