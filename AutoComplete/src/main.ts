import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { AutoCompleteComponent } from './app/auto-complete/auto-complete.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// (async () => {
//   const app = await createApplication({
//     providers: []
//   });

//   const acElement = createCustomElement(AppComponent, {
//     injector: app.injector,
//   });

//   customElements.define('auto-complete', acElement);
// })();
