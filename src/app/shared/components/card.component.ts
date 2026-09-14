import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Generic white content card for programs and feature grids.
 * Project an icon with the `icon` attribute: `<span icon>...</span>`.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article [class]="cardClasses()">
      <div class="mb-5 text-primary empty:hidden"><ng-content select="[icon]" /></div>

      <h3 class="font-serif text-xl font-bold text-primary">{{ title() }}</h3>

      @if (description(); as text) {
        <p class="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{{ text }}</p>
      }

      <!-- Sits above the stretched link's overlay so projected controls stay usable. -->
      <div class="relative z-[2] mt-6 empty:hidden"><ng-content /></div>

      @if (linkLabel(); as label) {
        @if (routerLink(); as link) {
          <a
            [routerLink]="link"
            [class]="linkClasses"
            [attr.aria-label]="accessibleLinkLabel(label)"
          >
            {{ label }}
            <span aria-hidden="true">&rarr;</span>
          </a>
        } @else {
          <!-- Nested, not chained: only a primary if-block may bind with an alias. -->
          @if (href(); as url) {
            <a
              [href]="url"
              target="_blank"
              rel="noopener"
              [class]="linkClasses"
              [attr.aria-label]="accessibleLinkLabel(label)"
            >
              {{ label }}
              <span aria-hidden="true">&rarr;</span>
            </a>
          }
        }
      }
    </article>
  `,
})
export class CardComponent {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);

  /** Label for the optional footer link. The link only renders when this is set. */
  readonly linkLabel = input<string | null>(null);
  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);

  /** Carries a heavier resting shadow, for pages that need more weight. */
  readonly elevated = input(false);

  /** True when the footer link renders, which is what makes the card clickable. */
  private readonly linked = computed(
    () => this.linkLabel() !== null && (this.routerLink() !== null || this.href() !== null)
  );

  readonly cardClasses = computed(() =>
    [
      'card-alive flex h-full flex-col rounded-2xl border border-border-soft bg-white p-8',
      this.elevated() ? 'shadow-md' : 'shadow-sm',
      this.linked() ? 'relative cursor-pointer' : '',
    ]
      .filter((part) => part !== '')
      .join(' ')
  );

  readonly linkClasses =
    'stretched-link mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-gold-on-light';

  /**
   * Four identical "Learn more" links in a row are useless read out of context,
   * and the stretched link now represents the whole card, so name it by title.
   */
  accessibleLinkLabel(label: string): string {
    return `${label}: ${this.title()}`;
  }
}
