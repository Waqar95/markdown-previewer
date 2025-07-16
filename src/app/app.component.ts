import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marked } from 'marked';

declare const html2pdf: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  markdownText: string = '# Hello Markdown!';

  get convertedHtml(): string {
    marked.setOptions({ async: false });
    return marked.parse(this.markdownText) as string;
  }

  // PDF
  currentDate = new Date().toLocaleDateString();

  downloadPDF() {
    const pdfContent = document.getElementById('pdf-content');
    if (!pdfContent) return;

    const opt = {
      margin: 0.5,
      filename: 'markdown-preview.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Temporarily show it (for PDF layout), then hide
    pdfContent.style.display = 'block';

    html2pdf()
      .set(opt)
      .from(pdfContent)
      .save()
      .then(() => (pdfContent.style.display = 'none'));
  }

  insertHeading() {
    this.markdownText += '\n# Heading\n';
  }

  insertBold() {
    this.markdownText += '**bold**';
  }

  insertItalic() {
    this.markdownText += '*italic*';
  }

  insertQuote() {
    this.markdownText += '\n> quoted text\n';
  }

  insertCode() {
    this.markdownText += '`code`';
  }

  insertLink() {
    this.markdownText += '[title](https://example.com)';
  }

  insertImage() {
    this.markdownText += '![alt text](https://via.placeholder.com/150)';
  }

  insertList() {
    this.markdownText += '\n- item 1\n- item 2\n';
  }

  insertNumberedList() {
    this.markdownText += '\n1. item 1\n2. item 2\n';
  }

  insertLine() {
    this.markdownText += '\n---\n';
  }

  insertNewLine() {
    this.markdownText += '\n';
  }

  alignLeft() {
    this.markdownText += '\n<div align="left">\nYour text\n</div>\n';
  }

  alignCenter() {
    this.markdownText += '\n<div align="center">\nYour text\n</div>\n';
  }

  alignRight() {
    this.markdownText += '\n<div align="right">\nYour text\n</div>\n';
  }

  isDarkMode = false;

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;

    if (this.isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }

  // Word Count Logic

  get wordCount(): number {
    if (!this.markdownText.trim()) return 0;
    return this.markdownText.trim().split(/\s+/).length;
  }

  get charCount(): number {
    return this.markdownText.length;
  }

  // Text Undo Logic

  previousText: string = ''; // store last markdown

  clearMarkdown() {
    this.previousText = this.markdownText;
    this.markdownText = '';
  }

  undoClear() {
    if (this.previousText) {
      this.markdownText = this.previousText;
      this.previousText = '';
    }
  }
}
