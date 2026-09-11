import { Component, computed, input } from '@angular/core';

/** `dark` recolours the card for placement on a primary-green background. */
export type PillarCardTone = 'light' | 'dark';

/** One of the six pillars of trust: gold ordinal, name, short description. */
@Component({
  selector: 'app-pillar-card',
  standalone: true,
  template: `
    <article [class]="cardClasses()">
      <span
        class="shrink-0 font-serif text-4xl font-bold leading-none text-gold"
        aria-hidden="true"
      >
        {{ displayNumber() }}
      </span>
      <div>
        <h3 [class]="nameClasses()">{{ name() }}</h3>
        <p [class]="descriptionClasses()">{{ description() }}</p>
      </div>
    </article>
  `,
})
export class PillarCardComponent {
  /** 1-based position of the pillar. */
  readonly number = input.required<number>();
  readonly name = input.required<string>();
  readonly description = input.required<string>();
  readonly tone = input<PillarCardTone>('light');

  readonly cardClasses = computed(
    () =>
      'flex h-full gap-5 rounded-2xl border p-7 ' +
      (this.tone() === 'dark' ? 'border-white/20 bg-white/5' : 'border-border-soft bg-white')
  );

  readonly nameClasses = computed(
    () => 'font-serif text-lg font-bold ' + (this.tone() === 'dark' ? 'text-white' : 'text-primary')
  );

  readonly descriptionClasses = computed(
    () =>
      'mt-2 text-sm leading-relaxed ' +
      (this.tone() === 'dark' ? 'text-white/75' : 'text-text-muted')
  );

  /** Zero-padded so the column of numbers lines up: 01, 02, … */
  displayNumber(): string {
    return String(this.number()).padStart(2, '0');
  }
}
