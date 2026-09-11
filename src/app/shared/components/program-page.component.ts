import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from './button.component';
import { CardComponent } from './card.component';
import { ContactMethodComponent } from './contact-method.component';
import { PlaceholderPhotoComponent, PlaceholderPhotoIcon } from './placeholder-photo.component';
import { SectionHeadingComponent } from './section-heading.component';
import { StatCardComponent } from './stat-card.component';

/** One step in a program's "How it works" row. */
export interface ProgramStep {
  readonly titleKey: string;
  readonly descriptionKey: string;
}

/** One figure in a program's "Impact so far" row. */
export interface ProgramStat {
  readonly valueKey: string;
  readonly labelKey: string;
  /** Trailing mark rendered in gold, e.g. "+". Null for an exact figure. */
  readonly suffix: string | null;
}

/**
 * Everything that varies between the four program sub-pages. Section furniture
 * that is identical across them lives in the template instead.
 */
export interface ProgramPageConfig {
  readonly headingKey: string;
  readonly subheadingKey: string;
  readonly photoLabelKey: string;
  readonly photoIcon: PlaceholderPhotoIcon;
  readonly aboutHeadingKey: string;
  readonly aboutParagraphKeys: readonly string[];
  readonly stepsHeadingKey: string;
  readonly steps: readonly ProgramStep[];
  readonly impactHeadingKey: string;
  readonly stats: readonly ProgramStat[];
  readonly ctaHeadingKey: string;
  readonly ctaDescriptionKey: string;
}

/** Three and four are the only row widths the program pages use. */
const ROW_CLASSES: Record<number, string> = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

/**
 * Shared layout for the four program sub-pages. Each page supplies a config of
 * translation keys; the section structure and the support block are identical.
 */
@Component({
  selector: 'app-program-page',
  standalone: true,
  imports: [
    TranslatePipe,
    ButtonComponent,
    CardComponent,
    ContactMethodComponent,
    PlaceholderPhotoComponent,
    SectionHeadingComponent,
    StatCardComponent,
  ],
  template: `
    <!-- Page hero -->
    <section class="bg-primary">
      <div class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          {{ 'programs.page.eyebrow' | translate }}
        </p>
        <h1 class="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
          {{ config().headingKey | translate }}
        </h1>
        <p class="mt-5 text-base leading-relaxed text-white/80">
          {{ config().subheadingKey | translate }}
        </p>
      </div>
    </section>

    <!-- About this program -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div class="mx-auto w-full max-w-md lg:mx-0">
            <app-placeholder-photo
              ratio="landscape"
              [icon]="config().photoIcon"
              [label]="config().photoLabelKey | translate"
            />
          </div>

          <div>
            <app-section-heading
              align="left"
              [eyebrow]="'programs.page.aboutEyebrow' | translate"
              [heading]="config().aboutHeadingKey | translate"
            />
            <div class="mt-6 space-y-5 text-base leading-relaxed text-text-body">
              @for (key of config().aboutParagraphKeys; track key) {
                <p>{{ key | translate }}</p>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <app-section-heading
          [eyebrow]="'programs.page.stepsEyebrow' | translate"
          [heading]="config().stepsHeadingKey | translate"
        />

        <div [class]="stepRowClasses()">
          @for (step of config().steps; track step.titleKey; let i = $index) {
            <app-card
              [title]="step.titleKey | translate"
              [description]="step.descriptionKey | translate"
            >
              <span icon class="font-serif text-3xl font-bold text-gold">
                {{ stepNumber(i) }}
              </span>
            </app-card>
          }
        </div>
      </div>
    </section>

    <!-- Impact so far -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <app-section-heading [heading]="config().impactHeadingKey | translate" />

        <div [class]="statRowClasses()">
          @for (stat of config().stats; track stat.labelKey) {
            <app-stat-card
              [value]="stat.valueKey | translate"
              [suffix]="stat.suffix"
              [label]="stat.labelKey | translate"
            />
          }
        </div>
      </div>
    </section>

    <!-- How to support this program -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <app-section-heading
          [heading]="'programs.page.supportHeading' | translate"
          [subheading]="'programs.page.supportSubheading' | translate"
        />

        <div class="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          <app-contact-method
            type="whatsapp"
            [label]="'contact.labels.whatsapp' | translate"
            [value]="'contact.whatsapp' | translate"
          />
          <app-contact-method
            type="email"
            [label]="'contact.labels.email' | translate"
            [value]="'contact.email' | translate"
          />
          <app-contact-method
            type="phone"
            [label]="'contact.labels.phone' | translate"
            [value]="'contact.phone' | translate"
          />
        </div>

        <p class="mt-10 text-center text-sm italic text-text-muted">
          {{ 'programs.page.supportNote' | translate }}
        </p>
      </div>
    </section>

    <!-- Final CTA band -->
    <section class="bg-gold">
      <div class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl font-bold leading-tight text-primary-dark sm:text-4xl">
          {{ config().ctaHeadingKey | translate }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-primary-dark">
          {{ config().ctaDescriptionKey | translate }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-button variant="primary" size="lg" routerLink="/contact">
            {{ 'programs.page.ctaContact' | translate }}
          </app-button>
          <app-button variant="outline" size="lg" routerLink="/programs">
            {{ 'programs.page.ctaAll' | translate }}
          </app-button>
        </div>
      </div>
    </section>
  `,
})
export class ProgramPageComponent {
  readonly config = input.required<ProgramPageConfig>();

  readonly stepRowClasses = computed(() => this.rowClasses(this.config().steps.length));
  readonly statRowClasses = computed(() => this.rowClasses(this.config().stats.length));

  /** 01, 02, 03 … matching the pillar cards elsewhere on the site. */
  stepNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  private rowClasses(count: number): string {
    return 'mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 ' + (ROW_CLASSES[count] ?? 'lg:grid-cols-4');
  }
}
