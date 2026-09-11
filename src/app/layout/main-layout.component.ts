import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';

/**
 * Site shell: header on top, routed page in the middle, footer at the bottom.
 * The flex column plus `flex-1` on <main> keeps the footer at the bottom of the
 * viewport even when the routed page is short.
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="flex min-h-screen flex-col">
      <app-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class MainLayoutComponent {}
