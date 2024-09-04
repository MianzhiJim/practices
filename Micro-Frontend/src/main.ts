import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { inject, Injector } from '@angular/core';
// import '@webcomponents/custom-elements';
// import '@webcomponents/custom-elements/src/native-shim';  // Polyfill for browsers
// import '@webcomponents/custom-elements/custom-elements.min';
import { CalendarComponent } from './app/calendar/calendar.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

(async () => {
  const app = await createApplication({
    providers: [],
  });

  const calenderElement = createCustomElement(CalendarComponent, {
    injector: app.injector,
  });

  customElements.define('calendar-ele', calenderElement);
})();

// const calendarEl = createCustomElement(CalendarComponent, { injector: inject(Injector) });
// customElements.define('calendar-component', calendarEl);
