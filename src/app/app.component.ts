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
}
