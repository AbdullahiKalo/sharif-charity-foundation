import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** Temporary landing page — confirms the layout shell renders routed content. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <section class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 class="text-center text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
        {{ 'home.placeholder.title' | translate }}
      </h1>
    </section>
  `,
})
export class HomeComponent {}
