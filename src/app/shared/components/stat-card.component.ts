import { Component, computed, input } from '@angular/core';

/** A single impact statistic: large number over a short label. */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div [class]="wrapperClasses()">
      <p class="font-serif text-4xl font-bold leading-none text-primary sm:text-5xl">
        {{ value() }}
        @if (suffix(); as mark) {
          <span class="text-gold-on-light">{{ mark }}</span>
        }
      </p>
      <p class="mt-3 text-sm font-medium uppercase tracking-wide text-text-muted">{{ label() }}</p>
      @if (caption(); as text) {
        <p class="mt-1 text-xs text-text-muted">{{ text }}</p>
      }
    </div>
  `,
})
export class StatCardComponent {
  /** Pre-formatted number, e.g. "1,200". */
  readonly value = input.required<string>();
  /** Optional trailing mark rendered in gold, e.g. "+" or "%". */
  readonly suffix = input<string | null>(null);
  readonly label = input.required<string>();
  readonly caption = input<string | null>(null);

  /**
   * Gives the figure a card surface with the site-wide hover treatment. Off by
   * default so bare stat strips keep their plain look.
   */
  readonly interactive = input(false);

  readonly wrapperClasses = computed(() =>
    this.interactive()
      ? 'card-alive h-full rounded-2xl border border-border-soft bg-white p-6 text-center shadow-md'
      : 'text-center'
  );
}
