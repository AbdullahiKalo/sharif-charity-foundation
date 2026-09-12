import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonWidth = 'auto' | 'full' | 'responsive';

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-gold text-primary-dark hover:bg-gold-dark',
  // primary-dark rather than primary: the outline button also sits on gold
  // bands, where primary green only reaches 3.6:1 against the background.
  outline:
    'border-2 border-primary-dark bg-transparent text-primary-dark hover:bg-primary-dark hover:text-white',
  'outline-light':
    'border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-dark',
  ghost: 'bg-transparent text-primary hover:bg-bg-warm',
};

const WIDTH_CLASSES: Record<ButtonWidth, string> = {
  auto: '',
  full: 'w-full',
  responsive: 'w-full sm:w-auto',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * One button for the whole site. Renders as a router link, a plain anchor or a
 * native button depending on which of `routerLink` / `href` is supplied.
 * Project an icon with the `icon` attribute: `<span icon>...</span>`.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink],
  template: `
    <ng-template #inner>
      <ng-content select="[icon]" />
      <ng-content />
    </ng-template>

    @if (routerLink(); as link) {
      <a
        [routerLink]="link"
        [class]="classes()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-disabled]="disabled() ? true : null"
      >
        <ng-container [ngTemplateOutlet]="inner" />
      </a>
    } @else {
      <!-- Nested, not chained: only a primary if-block may bind with an alias. -->
      @if (href(); as url) {
        <a
          [href]="url"
          [target]="target()"
          [attr.rel]="target() === '_blank' ? 'noopener' : null"
          [class]="classes()"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-disabled]="disabled() ? true : null"
        >
          <ng-container [ngTemplateOutlet]="inner" />
        </a>
      } @else {
        <button
          [type]="type()"
          [disabled]="disabled()"
          [class]="classes()"
          [attr.aria-label]="ariaLabel()"
          (click)="pressed.emit($event)"
        >
          <ng-container [ngTemplateOutlet]="inner" />
        </button>
      }
    }
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');

  /** Router path or command array. Takes precedence over `href`. */
  readonly routerLink = input<string | unknown[] | null>(null);
  /** External or protocol URL (mailto:, tel:, https://). */
  readonly href = input<string | null>(null);
  readonly target = input<'_self' | '_blank'>('_self');

  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  /** `responsive` fills the row on phones and shrinks to its content above that. */
  readonly width = input<ButtonWidth>('auto');
  readonly ariaLabel = input<string | null>(null);

  /** Emitted only in native-button mode. */
  readonly pressed = output<MouseEvent>();

  readonly classes = computed(() =>
    [
      BASE_CLASSES,
      VARIANT_CLASSES[this.variant()],
      SIZE_CLASSES[this.size()],
      WIDTH_CLASSES[this.width()],
      this.disabled() ? 'pointer-events-none opacity-60' : '',
    ]
      .filter((part) => part !== '')
      .join(' ')
  );
}
