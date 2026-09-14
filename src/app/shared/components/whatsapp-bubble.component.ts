import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Floating WhatsApp action button. Mounted once in the main layout, so every
 * route inherits it; never add it to an individual page.
 */
@Component({
  selector: 'app-whatsapp-bubble',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <a
      [href]="'contact.whatsappLink' | translate"
      target="_blank"
      rel="noopener noreferrer"
      [attr.aria-label]="'contact.whatsappBubble' | translate"
      class="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 ease-out hover:scale-105 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-7 w-7"
        aria-hidden="true"
      >
        <path
          d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.92 9.92 0 0 0 4.88 1.27h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm5.83 14.06c-.24.69-1.42 1.32-1.96 1.37-.5.05-1.14.07-1.84-.11-.42-.13-.97-.31-1.67-.61-2.94-1.27-4.86-4.23-5.01-4.43-.14-.2-1.19-1.59-1.19-3.03s.75-2.15 1.02-2.44c.27-.3.59-.37.78-.37h.56c.18 0 .42-.07.66.5.24.59.83 2.03.9 2.18.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.39-.25.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.72-.17 1.41Z"
        />
      </svg>
    </a>
  `,
})
export class WhatsAppBubbleComponent {}
