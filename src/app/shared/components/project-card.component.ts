import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export type ProjectStatus = 'ongoing' | 'completed' | 'planning';

const STATUS_CLASSES: Record<ProjectStatus, string> = {
  ongoing: 'bg-gold text-primary-dark',
  completed: 'bg-primary text-white',
  planning: 'bg-bg-warm text-text-muted ring-1 ring-border-soft',
};

const STATUS_LABEL_KEYS: Record<ProjectStatus, string> = {
  ongoing: 'projects.status.ongoing',
  completed: 'projects.status.completed',
  planning: 'projects.status.planning',
};

/**
 * Progress-bar widths in 5% steps. A bound `style.width` would be an inline
 * style, so the bar snaps to the nearest step and the exact figure is shown as
 * text next to it.
 */
const PROGRESS_CLASSES: readonly string[] = [
  'w-0',
  'w-[5%]',
  'w-[10%]',
  'w-[15%]',
  'w-[20%]',
  'w-[25%]',
  'w-[30%]',
  'w-[35%]',
  'w-[40%]',
  'w-[45%]',
  'w-[50%]',
  'w-[55%]',
  'w-[60%]',
  'w-[65%]',
  'w-[70%]',
  'w-[75%]',
  'w-[80%]',
  'w-[85%]',
  'w-[90%]',
  'w-[95%]',
  'w-full',
];

/** A project summary tile: gradient image placeholder, meta, status and funding. */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <article
      class="flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div
        class="flex h-44 items-center justify-center bg-gradient-to-br from-primary-light to-primary-dark"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-10 w-10 text-white/60"
        >
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 11h.01M15 11h.01" />
        </svg>
      </div>

      <div class="flex flex-1 flex-col p-6">
        <div class="flex items-start justify-between gap-3">
          <h3 class="font-serif text-lg font-bold text-primary">{{ title() }}</h3>
          <span [class]="statusClasses()">{{ statusLabelKey() | translate }}</span>
        </div>

        @if (location(); as place) {
          <p class="mt-2 flex items-center gap-1.5 text-xs font-medium text-text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {{ place }}
          </p>
        }

        @if (description(); as text) {
          <p class="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{{ text }}</p>
        }

        @if (fundingPercent() !== null) {
          <div class="mt-6">
            <div class="flex items-center justify-between text-xs font-medium text-text-muted">
              <span>{{ 'projects.funding' | translate }}</span>
              <span class="text-primary">
                {{ 'projects.funded' | translate: { percent: clampedPercent() } }}
              </span>
            </div>
            <div
              class="mt-2 h-2 overflow-hidden rounded-full bg-bg-warm ring-1 ring-border-soft"
              role="progressbar"
              [attr.aria-valuenow]="clampedPercent()"
              aria-valuemin="0"
              aria-valuemax="100"
              [attr.aria-label]="'projects.funding' | translate"
            >
              <div [class]="progressClasses()"></div>
            </div>
          </div>
        }
      </div>
    </article>
  `,
})
export class ProjectCardComponent {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
  readonly location = input<string | null>(null);
  readonly status = input<ProjectStatus>('ongoing');
  /** 0–100. Leave null to hide the funding bar. */
  readonly fundingPercent = input<number | null>(null);

  readonly statusLabelKey = computed(() => STATUS_LABEL_KEYS[this.status()]);

  readonly statusClasses = computed(
    () =>
      'shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ' +
      STATUS_CLASSES[this.status()]
  );

  readonly clampedPercent = computed(() => {
    const value = this.fundingPercent();
    return value === null ? 0 : Math.min(100, Math.max(0, Math.round(value)));
  });

  readonly progressClasses = computed(
    () => 'h-full rounded-full bg-gold ' + PROGRESS_CLASSES[Math.round(this.clampedPercent() / 5)]
  );
}
