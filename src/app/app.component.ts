import { Component } from '@angular/core';
import { marked } from 'marked';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  markdownText: string = '# Hello Markdown!';

  get convertedHtml(): string {
    return marked(this.markdownText);
  }
}
