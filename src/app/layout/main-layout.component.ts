import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsAppBubbleComponent } from '../shared/components/whatsapp-bubble.component';
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
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsAppBubbleComponent],
  template: `
    <div class="flex min-h-screen flex-col">
      <app-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <app-footer />
      <app-whatsapp-bubble />
    </div>
  `,
})
export class MainLayoutComponent {}
