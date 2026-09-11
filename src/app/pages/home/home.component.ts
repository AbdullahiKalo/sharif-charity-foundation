import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/button.component';
import { CardComponent } from '../../shared/components/card.component';
import { PillarCardComponent } from '../../shared/components/pillar-card.component';
import { PlaceholderPhotoComponent } from '../../shared/components/placeholder-photo.component';
import {
  ProjectCardComponent,
  ProjectStatus,
} from '../../shared/components/project-card.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { StatCardComponent } from '../../shared/components/stat-card.component';

/** One figure in the impact band. */
interface ImpactStat {
  readonly valueKey: string;
  readonly labelKey: string;
}

/** One of the four programmes previewed on the home page. */
interface ProgramPreview {
  readonly id: 'orphans' | 'mosques' | 'schools' | 'hadiya';
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly path: string;
}

/** One of the six pillars of donor trust. */
interface Pillar {
  readonly number: number;
  readonly nameKey: string;
  readonly descriptionKey: string;
}

/** A placeholder project shown in the featured-projects row. */
interface FeaturedProject {
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly locationKey: string;
  readonly status: ProjectStatus;
  readonly fundingPercent: number | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslatePipe,
    ButtonComponent,
    CardComponent,
    PillarCardComponent,
    PlaceholderPhotoComponent,
    ProjectCardComponent,
    SectionHeadingComponent,
    StatCardComponent,
  ],
  template: `
    <!-- 1. Hero -->
    <section class="relative flex min-h-[80vh] items-center overflow-hidden bg-primary-dark">
      <svg
        class="pointer-events-none absolute inset-0 h-full w-full text-white opacity-[0.07]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hero-diagonal-stripes"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" stroke-width="3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-diagonal-stripes)" />
      </svg>

      <div class="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          {{ 'home.hero.eyebrow' | translate }}
        </p>
        <h1 class="mt-5 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {{ 'home.hero.title' | translate }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          {{ 'home.hero.description' | translate }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-button variant="secondary" size="lg" routerLink="/donate">
            {{ 'home.hero.donate' | translate }}
          </app-button>
          <app-button variant="outline-light" size="lg" routerLink="/programs">
            {{ 'home.hero.programs' | translate }}
          </app-button>
        </div>
      </div>
    </section>

    <!-- 2. Impact statistics band -->
    <section class="border-b border-border-soft bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 class="sr-only">{{ 'home.impact.title' | translate }}</h2>
        <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          @for (stat of impactStats; track stat.labelKey) {
            <app-stat-card
              [value]="stat.valueKey | translate"
              suffix="+"
              [label]="stat.labelKey | translate"
            />
          }
        </div>
      </div>
    </section>

    <!-- 3. Our Mission -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <app-section-heading
              align="left"
              [eyebrow]="'home.mission.eyebrow' | translate"
              [heading]="'home.mission.heading' | translate"
              [subheading]="'home.mission.paragraphOne' | translate"
            />
            <p class="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
              {{ 'home.mission.paragraphTwo' | translate }}
            </p>
          </div>

          <div class="mx-auto w-full max-w-sm">
            <app-placeholder-photo
              ratio="portrait"
              icon="building"
              [label]="'home.mission.photoLabel' | translate"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Programs preview -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <app-section-heading
          [eyebrow]="'home.programs.eyebrow' | translate"
          [heading]="'home.programs.heading' | translate"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (program of programs; track program.id) {
            <app-card
              [title]="program.titleKey | translate"
              [description]="program.descriptionKey | translate"
              [linkLabel]="'home.programs.learnMore' | translate"
              [routerLink]="program.path"
            >
              <span icon>
                @switch (program.id) {
                  @case ('orphans') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-9 w-9"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="6" r="3.2" />
                      <path d="M6.5 21v-3a5.5 5.5 0 0 1 11 0v3" />
                      <path d="M9.5 21v-3.5M14.5 21v-3.5" />
                    </svg>
                  }
                  @case ('mosques') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-9 w-9"
                      aria-hidden="true"
                    >
                      <path d="M12 2.5c2.5 2.2 3.8 4 3.8 5.8 0 1.6-1.7 2.7-3.8 2.7s-3.8-1.1-3.8-2.7c0-1.8 1.3-3.6 3.8-5.8Z" />
                      <path d="M4 21v-6.5a8 8 0 0 1 16 0V21" />
                      <path d="M2.5 21h19M4 12V8M20 12V8M10 21v-3.5a2 2 0 0 1 4 0V21" />
                    </svg>
                  }
                  @case ('schools') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-9 w-9"
                      aria-hidden="true"
                    >
                      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v17H5.5A2.5 2.5 0 0 0 3 22.5Z" />
                      <path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H12v17h6.5a2.5 2.5 0 0 1 2.5 2.5Z" />
                    </svg>
                  }
                  @default {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-9 w-9"
                      aria-hidden="true"
                    >
                      <rect x="3" y="9" width="18" height="12" rx="1.5" />
                      <path d="M2 9h20M12 9v12" />
                      <path d="M12 9S9.5 3 7 4.2C5.2 5 6.2 9 12 9ZM12 9s2.5-6 5-4.8C18.8 5 17.8 9 12 9Z" />
                    </svg>
                  }
                }
              </span>
            </app-card>
          }
        </div>
      </div>
    </section>

    <!-- 5. Six pillars of trust -->
    <section class="bg-primary">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <app-section-heading
          tone="dark"
          [eyebrow]="'home.pillars.eyebrow' | translate"
          [heading]="'home.pillars.heading' | translate"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (pillar of pillars; track pillar.number) {
            <app-pillar-card
              tone="dark"
              [number]="pillar.number"
              [name]="pillar.nameKey | translate"
              [description]="pillar.descriptionKey | translate"
            />
          }
        </div>
      </div>
    </section>

    <!-- 6. Featured projects -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <app-section-heading [heading]="'home.projects.heading' | translate" />

        <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (project of featuredProjects; track project.titleKey) {
            <app-project-card
              [title]="project.titleKey | translate"
              [description]="project.descriptionKey | translate"
              [location]="project.locationKey | translate"
              [status]="project.status"
              [fundingPercent]="project.fundingPercent"
            />
          }
        </div>

        <div class="mt-12 text-center">
          <app-button variant="outline" routerLink="/projects">
            {{ 'home.projects.viewAll' | translate }}
          </app-button>
        </div>
      </div>
    </section>

    <!-- 7. Final CTA band -->
    <section class="bg-gold">
      <div class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl font-bold leading-tight text-primary-dark sm:text-4xl">
          {{ 'home.cta.heading' | translate }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-primary-dark">
          {{ 'home.cta.description' | translate }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-button variant="primary" size="lg" routerLink="/donate">
            {{ 'home.cta.donate' | translate }}
          </app-button>
          <app-button variant="outline" size="lg" routerLink="/contact">
            {{ 'home.cta.contact' | translate }}
          </app-button>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  readonly impactStats: readonly ImpactStat[] = [
    { valueKey: 'home.impact.orphans.value', labelKey: 'home.impact.orphans.label' },
    { valueKey: 'home.impact.mosques.value', labelKey: 'home.impact.mosques.label' },
    { valueKey: 'home.impact.schools.value', labelKey: 'home.impact.schools.label' },
    { valueKey: 'home.impact.families.value', labelKey: 'home.impact.families.label' },
  ];

  readonly programs: readonly ProgramPreview[] = [
    {
      id: 'orphans',
      titleKey: 'home.programs.orphans.title',
      descriptionKey: 'home.programs.orphans.description',
      path: '/programs/orphans',
    },
    {
      id: 'mosques',
      titleKey: 'home.programs.mosques.title',
      descriptionKey: 'home.programs.mosques.description',
      path: '/programs/mosques',
    },
    {
      id: 'schools',
      titleKey: 'home.programs.schools.title',
      descriptionKey: 'home.programs.schools.description',
      path: '/programs/schools',
    },
    {
      id: 'hadiya',
      titleKey: 'home.programs.hadiya.title',
      descriptionKey: 'home.programs.hadiya.description',
      path: '/programs/hadiya',
    },
  ];

  readonly pillars: readonly Pillar[] = [
    {
      number: 1,
      nameKey: 'home.pillars.verifiability.name',
      descriptionKey: 'home.pillars.verifiability.description',
    },
    {
      number: 2,
      nameKey: 'home.pillars.traceability.name',
      descriptionKey: 'home.pillars.traceability.description',
    },
    {
      number: 3,
      nameKey: 'home.pillars.independence.name',
      descriptionKey: 'home.pillars.independence.description',
    },
    {
      number: 4,
      nameKey: 'home.pillars.accountability.name',
      descriptionKey: 'home.pillars.accountability.description',
    },
    {
      number: 5,
      nameKey: 'home.pillars.privacy.name',
      descriptionKey: 'home.pillars.privacy.description',
    },
    {
      number: 6,
      nameKey: 'home.pillars.continuity.name',
      descriptionKey: 'home.pillars.continuity.description',
    },
  ];

  readonly featuredProjects: readonly FeaturedProject[] = [
    {
      titleKey: 'home.projects.alFalah.title',
      descriptionKey: 'home.projects.alFalah.description',
      locationKey: 'home.projects.alFalah.location',
      status: 'completed',
      fundingPercent: null,
    },
    {
      titleKey: 'home.projects.rahma.title',
      descriptionKey: 'home.projects.rahma.description',
      locationKey: 'home.projects.rahma.location',
      status: 'ongoing',
      fundingPercent: 65,
    },
    {
      titleKey: 'home.projects.ramadan.title',
      descriptionKey: 'home.projects.ramadan.description',
      locationKey: 'home.projects.ramadan.location',
      status: 'completed',
      fundingPercent: null,
    },
  ];
}
