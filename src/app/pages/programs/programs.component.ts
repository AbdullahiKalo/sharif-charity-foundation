import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/button.component';
import { CardComponent } from '../../shared/components/card.component';
import { ProgramIconComponent, ProgramId } from '../../shared/components/program-icon.component';

/** One program tile on the overview grid. */
interface ProgramTile {
  readonly id: ProgramId;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly path: string;
}

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [TranslatePipe, ButtonComponent, CardComponent, ProgramIconComponent],
  template: `
    <!-- Page hero -->
    <section class="bg-primary">
      <div class="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold-on-dark">
          {{ 'programs.overview.eyebrow' | translate }}
        </p>
        <h1 class="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
          {{ 'programs.overview.heading' | translate }}
        </h1>
        <p class="mt-5 text-base leading-relaxed text-white/80">
          {{ 'programs.overview.subheading' | translate }}
        </p>
      </div>
    </section>

    <!-- Program grid -->
    <section class="bg-white">
      <div class="mx-auto max-w-6xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          @for (program of programs; track program.id) {
            <app-card
              [title]="program.titleKey | translate"
              [description]="program.descriptionKey | translate"
              [linkLabel]="'programs.learnMore' | translate"
              [routerLink]="program.path"
            >
              <span icon>
                <app-program-icon [program]="program.id" sizeClass="h-11 w-11" />
              </span>
            </app-card>
          }
        </div>
      </div>
    </section>

    <!-- CTA band -->
    <section class="bg-gold">
      <div class="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl font-bold leading-tight text-primary-dark sm:text-4xl">
          {{ 'programs.overview.ctaHeading' | translate }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-primary-dark">
          {{ 'programs.overview.ctaDescription' | translate }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-button variant="primary" size="lg" routerLink="/contact">
            {{ 'programs.page.ctaContact' | translate }}
          </app-button>
          <app-button variant="outline" size="lg" routerLink="/projects">
            {{ 'programs.overview.ctaProjects' | translate }}
          </app-button>
        </div>
      </div>
    </section>
  `,
})
export class ProgramsComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly seoDestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.apply('seo.programs.title', 'seo.programs.description', this.seoDestroyRef);
  }

  readonly programs: readonly ProgramTile[] = [
    {
      id: 'orphans',
      titleKey: 'programs.orphans.title',
      descriptionKey: 'programs.orphans.overviewDescription',
      path: '/programs/orphans',
    },
    {
      id: 'mosques',
      titleKey: 'programs.mosques.title',
      descriptionKey: 'programs.mosques.overviewDescription',
      path: '/programs/mosques',
    },
    {
      id: 'schools',
      titleKey: 'programs.schools.title',
      descriptionKey: 'programs.schools.overviewDescription',
      path: '/programs/schools',
    },
    {
      id: 'hadiya',
      titleKey: 'programs.hadiya.title',
      descriptionKey: 'programs.hadiya.overviewDescription',
      path: '/programs/hadiya',
    },
  ];
}
