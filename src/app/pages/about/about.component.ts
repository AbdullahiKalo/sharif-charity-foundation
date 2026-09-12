import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/button.component';
import { CardComponent } from '../../shared/components/card.component';
import { PillarCardComponent } from '../../shared/components/pillar-card.component';
import { PlaceholderPhotoComponent } from '../../shared/components/placeholder-photo.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

/** One of the four foundation values. */
interface Value {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
}

/** One of the six pillars, described at full length on this page. */
interface DetailedPillar {
  readonly number: number;
  readonly nameKey: string;
  readonly descriptionKey: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    TranslatePipe,
    ButtonComponent,
    CardComponent,
    PillarCardComponent,
    PlaceholderPhotoComponent,
    SectionHeadingComponent,
  ],
  template: `
    <!-- 1. Page hero -->
    <section class="bg-primary">
      <div class="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold-on-dark">
          {{ 'about.hero.eyebrow' | translate }}
        </p>
        <h1 class="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
          {{ 'about.hero.heading' | translate }}
        </h1>
        <p class="mt-5 text-base leading-relaxed text-white/80">
          {{ 'about.hero.subheading' | translate }}
        </p>
      </div>
    </section>

    <!-- 2. Our story -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <app-section-heading
              align="left"
              [eyebrow]="'about.story.eyebrow' | translate"
              [heading]="'about.story.heading' | translate"
            />
            <div class="mt-6 space-y-5 text-base leading-relaxed text-text-body">
              @for (key of storyParagraphKeys; track key) {
                <p>{{ key | translate }}</p>
              }
            </div>
          </div>

          <div class="mx-auto w-full max-w-sm lg:mx-0">
            <app-placeholder-photo
              ratio="portrait"
              icon="building"
              [label]="'about.story.photoLabel' | translate"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Founder -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <app-section-heading
          [eyebrow]="'about.founder.eyebrow' | translate"
          [heading]="'about.founder.heading' | translate"
        />

        <div class="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div class="mx-auto w-full max-w-md lg:mx-0">
            <app-placeholder-photo
              ratio="square"
              icon="person"
              [label]="'about.founder.photoLabel' | translate"
            />
          </div>

          <div>
            <p class="font-serif text-3xl font-bold text-primary">
              {{ 'about.founder.name' | translate }}
            </p>
            <p class="mt-1 text-sm font-semibold uppercase tracking-wide text-gold-on-light">
              {{ 'about.founder.role' | translate }}
            </p>

            <div class="mt-6 space-y-5 text-base leading-relaxed text-text-muted">
              @for (key of founderBioKeys; track key) {
                <p>{{ key | translate }}</p>
              }
            </div>

            <p class="mt-6 text-sm italic text-text-muted">
              {{ 'about.founder.note' | translate }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Our values -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <app-section-heading
          [eyebrow]="'about.values.eyebrow' | translate"
          [heading]="'about.values.heading' | translate"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (value of values; track value.id) {
            <app-card
              [title]="value.titleKey | translate"
              [description]="value.descriptionKey | translate"
            />
          }
        </div>
      </div>
    </section>

    <!-- 5. Six pillars of trust, in full -->
    <section class="bg-primary">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <app-section-heading
          tone="dark"
          [eyebrow]="'about.pillars.eyebrow' | translate"
          [heading]="'about.pillars.heading' | translate"
          [subheading]="'about.pillars.subheading' | translate"
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

    <!-- 6. Partners -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <app-section-heading [heading]="'about.partners.heading' | translate" />

        <div class="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          @for (slot of partnerSlots; track slot) {
            <div
              class="flex h-24 items-center justify-center rounded-xl border border-border-soft bg-gray-100 px-3 text-center text-xs font-medium uppercase tracking-wide text-text-muted"
            >
              {{ 'about.partners.logoLabel' | translate }}
            </div>
          }
        </div>

        <p class="mt-6 text-center text-sm italic text-text-muted">
          {{ 'about.partners.note' | translate }}
        </p>
      </div>
    </section>

    <!-- 7. CTA band -->
    <section class="bg-gold">
      <div class="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl font-bold leading-tight text-primary-dark sm:text-4xl">
          {{ 'about.cta.heading' | translate }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-primary-dark">
          {{ 'about.cta.description' | translate }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-button variant="primary" size="lg" routerLink="/contact">
            {{ 'about.cta.contact' | translate }}
          </app-button>
          <app-button variant="outline" size="lg" routerLink="/programs">
            {{ 'about.cta.programs' | translate }}
          </app-button>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly seoDestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.apply('seo.about.title', 'seo.about.description', this.seoDestroyRef);
  }

  readonly storyParagraphKeys: readonly string[] = [
    'about.story.paragraphOne',
    'about.story.paragraphTwo',
    'about.story.paragraphThree',
    'about.story.paragraphFour',
  ];

  readonly founderBioKeys: readonly string[] = [
    'about.founder.bioOne',
    'about.founder.bioTwo',
    'about.founder.bioThree',
  ];

  readonly values: readonly Value[] = [
    {
      id: 'faith',
      titleKey: 'about.values.faith.title',
      descriptionKey: 'about.values.faith.description',
    },
    {
      id: 'integrity',
      titleKey: 'about.values.integrity.title',
      descriptionKey: 'about.values.integrity.description',
    },
    {
      id: 'excellence',
      titleKey: 'about.values.excellence.title',
      descriptionKey: 'about.values.excellence.description',
    },
    {
      id: 'service',
      titleKey: 'about.values.service.title',
      descriptionKey: 'about.values.service.description',
    },
  ];

  /** Names are shared with the home page; only the descriptions differ in length. */
  readonly pillars: readonly DetailedPillar[] = [
    {
      number: 1,
      nameKey: 'pillars.verifiability.name',
      descriptionKey: 'about.pillars.verifiability.description',
    },
    {
      number: 2,
      nameKey: 'pillars.traceability.name',
      descriptionKey: 'about.pillars.traceability.description',
    },
    {
      number: 3,
      nameKey: 'pillars.independence.name',
      descriptionKey: 'about.pillars.independence.description',
    },
    {
      number: 4,
      nameKey: 'pillars.accountability.name',
      descriptionKey: 'about.pillars.accountability.description',
    },
    {
      number: 5,
      nameKey: 'pillars.privacy.name',
      descriptionKey: 'about.pillars.privacy.description',
    },
    {
      number: 6,
      nameKey: 'pillars.continuity.name',
      descriptionKey: 'about.pillars.continuity.description',
    },
  ];

  readonly partnerSlots: readonly number[] = [1, 2, 3, 4];
}
