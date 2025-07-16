import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declerations:[
    AppComponent
  ],
  imports:[
    BrowserModule,
    FormsModule
  ],
  prividers: [],
  bootstrap: [AppComponent]
})


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
