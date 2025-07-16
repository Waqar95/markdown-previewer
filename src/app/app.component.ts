import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marked } from 'marked';

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

  clearMarkdown() {
    this.markdownText = '';
  }

  declare html2pdf: any;

  downloadPDF() {
    const previewElement = document.querySelector('.preview');
    if (!previewElement) return;

    const opt = {
      margin: 0.5,
      filename: 'markdown-preview.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    this.html2pdf().set(opt).from(previewElement).save();
  }
}
