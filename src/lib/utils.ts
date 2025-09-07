import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseAIResponse(response: string): string {
  if (!response) return "";

  return response
    .split('\n')
    .map(line => {
      line = line.trim();

      // Bold headings
      if (line.startsWith('**') && line.endsWith('**')) {
        return `<h4>${line.substring(2, line.length - 2)}</h4>`;
      }
      
      // List items
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return `<ul><li>${line.substring(2)}</li></ul>`;
      }
      
      // Simple paragraphs
      if (line) {
        return `<p>${line}</p>`;
      }
      
      return '';
    })
    .join('');
}

    