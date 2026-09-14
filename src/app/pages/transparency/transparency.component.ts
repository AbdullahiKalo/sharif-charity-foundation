import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/button.component';
import { CardComponent } from '../../shared/components/card.component';
import { PlaceholderPhotoComponent } from '../../shared/components/placeholder-photo.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { StatCardComponent } from '../../shared/components/stat-card.component';

/** One figure in the live impact band. */
interface LedgerStat {
  readonly valueKey: string;
  readonly labelKey: string;
  readonly suffix: string | null;
}

/** One card in the fund-handling or registrations rows. */
interface InfoCard {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
}

/** One row of the annual reports table. */
interface AnnualReport {
  readonly titleKey: string;
}

@Component({
  selector: 'app-transparency',
  standalone: true,
  imports: [
    TranslatePipe,
    ButtonComponent,
    CardComponent,
    PlaceholderPhotoComponent,
    SectionHeadingComponent,
    StatCardComponent,
  ],
  template: `
    <!-- 1. Page hero -->
    <section class="bg-primary">
      <div class="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold-on-dark">
          {{ 'transparency.hero.eyebrow' | translate }}
        </p>
        <h1 class="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
          {{ 'transparency.hero.heading' | translate }}
        </h1>
        <p class="mt-5 text-base leading-relaxed text-white/80">
          {{ 'transparency.hero.subheading' | translate }}
        </p>
      </div>
    </section>

    <!-- 2. Live impact band -->
    <section class="border-b border-border-soft bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-12 md:py-16 sm:px-6 lg:px-8">
        <h2 class="sr-only">{{ 'transparency.impact.heading' | translate }}</h2>
        <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          @for (stat of ledgerStats; track stat.labelKey) {
            <app-stat-card
              [value]="stat.valueKey | translate"
              [suffix]="stat.suffix"
              [label]="stat.labelKey | translate"
              [caption]="'transparency.impact.asOf' | translate: { year: currentYear }"
              [interactive]="true"
            />
          }
        </div>
      </div>
    </section>

    <!-- 3. How we handle funds -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <app-section-heading
          [eyebrow]="'transparency.funds.eyebrow' | translate"
          [heading]="'transparency.funds.heading' | translate"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          @for (card of fundControls; track card.id) {
            <app-card
              [title]="card.titleKey | translate"
              [description]="card.descriptionKey | translate"
              [elevated]="true"
            />
          }
        </div>
      </div>
    </section>

    <!-- 4. Annual reports -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-4xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <app-section-heading
          [heading]="'transparency.reports.heading' | translate"
          [subheading]="'transparency.reports.subheading' | translate"
        />

        <div class="mt-12 overflow-x-auto rounded-2xl border border-border-soft bg-bg-warm">
          <table class="w-full min-w-[34rem] border-collapse text-left">
            <caption class="sr-only">
              {{
                'transparency.reports.caption' | translate
              }}
            </caption>
            <thead>
              <tr class="border-b border-border-soft">
                <th
                  scope="col"
                  class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-text-muted"
                >
                  {{ 'transparency.reports.columnReport' | translate }}
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-text-muted"
                >
                  {{ 'transparency.reports.columnPublished' | translate }}
                </th>
                <th scope="col" class="px-6 py-4 text-right">
                  <span class="sr-only">
                    {{ 'transparency.reports.columnAction' | translate }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              @for (report of reports; track report.titleKey) {
                <tr
                  class="border-b border-border-soft bg-white transition-colors last:border-b-0 hover:bg-bg-warm"
                >
                  <td class="border-l-2 border-gold px-6 py-5 font-medium text-primary">
                    {{ report.titleKey | translate }}
                  </td>
                  <td class="px-6 py-5 text-sm italic text-text-muted">
                    {{ 'transparency.reports.pending' | translate }}
                  </td>
                  <td class="px-6 py-5 text-right">
                    <app-button variant="outline" size="sm" [disabled]="true">
                      {{ 'transparency.reports.download' | translate }}
                    </app-button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <p class="mt-6 text-center text-sm italic text-text-muted">
          {{ 'transparency.reports.note' | translate }}
        </p>
      </div>
    </section>

    <!-- 5. Governance -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <app-section-heading
              align="left"
              [eyebrow]="'transparency.governance.eyebrow' | translate"
              [heading]="'transparency.governance.heading' | translate"
            />
            <div class="mt-6 space-y-5 text-base leading-relaxed text-text-body">
              @for (key of governanceParagraphKeys; track key) {
                <p>{{ key | translate }}</p>
              }
            </div>
          </div>

          <div class="mx-auto w-full max-w-sm lg:mx-0">
            <app-placeholder-photo
              ratio="landscape"
              icon="person"
              [label]="'transparency.governance.photoLabel' | translate"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Regulatory registrations -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <app-section-heading
          [eyebrow]="'transparency.registrations.eyebrow' | translate"
          [heading]="'transparency.registrations.heading' | translate"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          @for (card of registrations; track card.id) {
            <app-card
              [title]="card.titleKey | translate"
              [description]="card.descriptionKey | translate"
              [elevated]="true"
            >
              <span class="text-sm italic text-text-muted">
                {{ 'transparency.registrations.pending' | translate }}
              </span>
            </app-card>
          }
        </div>
      </div>
    </section>

    <!-- 7. CTA band -->
    <section class="bg-gold">
      <div class="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl font-bold leading-tight text-primary-dark sm:text-4xl">
          {{ 'transparency.cta.heading' | translate }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-primary-dark">
          {{ 'transparency.cta.description' | translate }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-button variant="primary" size="lg" routerLink="/contact">
            {{ 'transparency.cta.contact' | translate }}
          </app-button>
          <app-button variant="outline" size="lg" routerLink="/projects">
            {{ 'transparency.cta.projects' | translate }}
          </app-button>
        </div>
      </div>
    </section>
  `,
})
export class TransparencyComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly seoDestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.apply('seo.transparency.title', 'seo.transparency.description', this.seoDestroyRef);
  }

  /** Stamped on each figure so a stale page is obvious to the reader. */
  readonly currentYear = new Date().getFullYear();

  readonly ledgerStats: readonly LedgerStat[] = [
    {
      valueKey: 'transparency.impact.raised.value',
      labelKey: 'transparency.impact.raised.label',
      suffix: null,
    },
    {
      valueKey: 'transparency.impact.disbursed.value',
      labelKey: 'transparency.impact.disbursed.label',
      suffix: null,
    },
    {
      valueKey: 'transparency.impact.projects.value',
      labelKey: 'transparency.impact.projects.label',
      suffix: null,
    },
    {
      valueKey: 'transparency.impact.beneficiaries.value',
      labelKey: 'transparency.impact.beneficiaries.label',
      suffix: '+',
    },
  ];

  readonly fundControls: readonly InfoCard[] = [
    {
      id: 'segregation',
      titleKey: 'transparency.funds.segregation.title',
      descriptionKey: 'transparency.funds.segregation.description',
    },
    {
      id: 'signatories',
      titleKey: 'transparency.funds.signatories.title',
      descriptionKey: 'transparency.funds.signatories.description',
    },
    {
      id: 'audit',
      titleKey: 'transparency.funds.audit.title',
      descriptionKey: 'transparency.funds.audit.description',
    },
  ];

  readonly reports: readonly AnnualReport[] = [
    { titleKey: 'transparency.reports.year2025' },
    { titleKey: 'transparency.reports.year2024' },
    { titleKey: 'transparency.reports.year2023' },
  ];

  readonly governanceParagraphKeys: readonly string[] = [
    'transparency.governance.paragraphOne',
    'transparency.governance.paragraphTwo',
    'transparency.governance.paragraphThree',
  ];

  readonly registrations: readonly InfoCard[] = [
    {
      id: 'cac',
      titleKey: 'transparency.registrations.cac.title',
      descriptionKey: 'transparency.registrations.cac.description',
    },
    {
      id: 'firs',
      titleKey: 'transparency.registrations.firs.title',
      descriptionKey: 'transparency.registrations.firs.description',
    },
    {
      id: 'ndpr',
      titleKey: 'transparency.registrations.ndpr.title',
      descriptionKey: 'transparency.registrations.ndpr.description',
    },
  ];
}
