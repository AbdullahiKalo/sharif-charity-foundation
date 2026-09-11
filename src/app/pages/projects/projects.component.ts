import { Component, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/button.component';
import { ProgramId } from '../../shared/components/program-icon.component';
import {
  ProjectCardComponent,
  ProjectStatus,
} from '../../shared/components/project-card.component';

/** Either "everything", one program, or one delivery status. */
type FilterId = 'all' | ProgramId | ProjectStatus;

interface Filter {
  readonly id: FilterId;
  readonly labelKey: string;
}

interface Project {
  readonly id: string;
  readonly category: ProgramId;
  readonly status: ProjectStatus;
  /** 0–100, or null for a finished project with no bar to show. */
  readonly fundingPercent: number | null;
}

const FILTERS: readonly Filter[] = [
  { id: 'all', labelKey: 'projects.filters.all' },
  { id: 'mosques', labelKey: 'projects.filters.mosques' },
  { id: 'schools', labelKey: 'projects.filters.schools' },
  { id: 'orphans', labelKey: 'projects.filters.orphans' },
  { id: 'hadiya', labelKey: 'projects.filters.hadiya' },
  // Status chips reuse the badge labels, so a status is named once site-wide.
  { id: 'ongoing', labelKey: 'projects.status.ongoing' },
  { id: 'completed', labelKey: 'projects.status.completed' },
  { id: 'planning', labelKey: 'projects.status.planning' },
];

const PROJECTS: readonly Project[] = [
  { id: 'alFalah', category: 'mosques', status: 'completed', fundingPercent: null },
  { id: 'rahma', category: 'schools', status: 'ongoing', fundingPercent: 65 },
  { id: 'ramadanFood', category: 'hadiya', status: 'completed', fundingPercent: null },
  { id: 'orphanCohort', category: 'orphans', status: 'ongoing', fundingPercent: 40 },
  { id: 'yobeWell', category: 'mosques', status: 'planning', fundingPercent: 15 },
  { id: 'eidClothing', category: 'hadiya', status: 'completed', fundingPercent: null },
  { id: 'bauchiGirls', category: 'schools', status: 'ongoing', fundingPercent: 78 },
  { id: 'zariaRebuild', category: 'mosques', status: 'completed', fundingPercent: null },
  { id: 'winterBlankets', category: 'hadiya', status: 'completed', fundingPercent: null },
  { id: 'kebbiExtension', category: 'mosques', status: 'planning', fundingPercent: 5 },
  { id: 'healthCamp', category: 'orphans', status: 'completed', fundingPercent: null },
  { id: 'kanoIftar', category: 'hadiya', status: 'ongoing', fundingPercent: 55 },
];

const STATUS_FILTERS: readonly FilterId[] = ['ongoing', 'completed', 'planning'];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslatePipe, ButtonComponent, ProjectCardComponent],
  template: `
    <!-- 1. Page hero -->
    <section class="bg-primary">
      <div class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          {{ 'projects.gallery.eyebrow' | translate }}
        </p>
        <h1 class="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
          {{ 'projects.gallery.heading' | translate }}
        </h1>
        <p class="mt-5 text-base leading-relaxed text-white/80">
          {{ 'projects.gallery.subheading' | translate }}
        </p>
      </div>
    </section>

    <!-- 2. Filter bar + 3. Grid -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          class="flex flex-wrap justify-center gap-3"
          role="group"
          [attr.aria-label]="'projects.filters.label' | translate"
        >
          @for (filter of filters; track filter.id) {
            <button
              type="button"
              [class]="chipClasses(filter.id)"
              [attr.aria-pressed]="activeFilter() === filter.id"
              (click)="selectFilter(filter.id)"
            >
              {{ filter.labelKey | translate }}
            </button>
          }
        </div>

        <p class="sr-only" aria-live="polite">
          {{ 'projects.gallery.count' | translate: { count: visibleProjects().length } }}
        </p>

        @if (visibleProjects().length > 0) {
          <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            @for (project of visibleProjects(); track project.id) {
              <app-project-card
                [title]="'projects.items.' + project.id + '.title' | translate"
                [description]="'projects.items.' + project.id + '.description' | translate"
                [location]="'projects.items.' + project.id + '.location' | translate"
                [status]="project.status"
                [fundingPercent]="project.fundingPercent"
              />
            }
          </div>
        } @else {
          <p class="mt-12 text-center text-base text-text-muted">
            {{ 'projects.gallery.empty' | translate }}
          </p>
        }

        <!-- 4. Placeholder note -->
        <p class="mx-auto mt-12 max-w-2xl text-center text-sm italic text-text-muted">
          {{ 'projects.gallery.note' | translate }}
        </p>
      </div>
    </section>

    <!-- 5. CTA band -->
    <section class="bg-gold">
      <div class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl font-bold leading-tight text-primary-dark sm:text-4xl">
          {{ 'projects.gallery.ctaHeading' | translate }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-primary-dark">
          {{ 'projects.gallery.ctaDescription' | translate }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-button variant="primary" size="lg" routerLink="/contact">
            {{ 'projects.gallery.ctaContact' | translate }}
          </app-button>
          <app-button variant="outline" size="lg" routerLink="/programs">
            {{ 'projects.gallery.ctaPrograms' | translate }}
          </app-button>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  readonly filters = FILTERS;
  readonly activeFilter = signal<FilterId>('all');

  readonly visibleProjects = computed(() => {
    const active = this.activeFilter();
    if (active === 'all') {
      return PROJECTS;
    }
    if (STATUS_FILTERS.includes(active)) {
      return PROJECTS.filter((project) => project.status === active);
    }
    return PROJECTS.filter((project) => project.category === active);
  });

  selectFilter(id: FilterId): void {
    this.activeFilter.set(id);
  }

  chipClasses(id: FilterId): string {
    const base =
      'rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ';
    return this.activeFilter() === id
      ? base + 'bg-primary text-white'
      : base + 'bg-white text-text-muted ring-1 ring-border-soft hover:text-primary';
  }
}
