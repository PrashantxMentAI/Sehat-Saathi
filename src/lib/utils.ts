
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseAIResponse(response: string): string {
  if (!response) return "";

  // Split the response into lines
  const lines = response.split('\n').filter(line => line.trim() !== '');

  let html = '';
  let inList = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check for headings like **Self-care steps**
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<h4>${trimmedLine.substring(2, trimmedLine.length - 2)}</h4>`;
      continue;
    }

    // Check for list items like * Get plenty of rest...
    if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${trimmedLine.substring(2)}</li>`;
      continue;
    }
    
    // If we are in a list and the line is not a list item, close the list
    if (inList) {
      html += '</ul>';
      inList = false;
    }

    // Any other line is treated as a paragraph
    html += `<p>${trimmedLine}</p>`;
  }

  // Close any open list at the end
  if (inList) {
    html += '</ul>';
  }

  // Clean up any empty paragraphs that might have been created
  html = html.replace(/<p><\/p>/g, '');

  return html;
}
