import { Component, input } from '@angular/core';

/** One of the six pillars of trust: gold ordinal, name, short description. */
@Component({
  selector: 'app-pillar-card',
  standalone: true,
  template: `
    <article class="flex h-full gap-5 rounded-2xl border border-border-soft bg-white p-7">
      <span
        class="shrink-0 font-serif text-4xl font-bold leading-none text-gold"
        aria-hidden="true"
      >
        {{ displayNumber() }}
      </span>
      <div>
        <h3 class="font-serif text-lg font-bold text-primary">{{ name() }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-text-muted">{{ description() }}</p>
      </div>
    </article>
  `,
})
export class PillarCardComponent {
  /** 1-based position of the pillar. */
  readonly number = input.required<number>();
  readonly name = input.required<string>();
  readonly description = input.required<string>();

  /** Zero-padded so the column of numbers lines up: 01, 02, … */
  displayNumber(): string {
    return String(this.number()).padStart(2, '0');
  }
}
