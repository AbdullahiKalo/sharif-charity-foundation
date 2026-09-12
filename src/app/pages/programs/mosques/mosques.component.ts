import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';
import {
  ProgramPageComponent,
  ProgramPageConfig,
} from '../../../shared/components/program-page.component';

@Component({
  selector: 'app-mosques',
  standalone: true,
  imports: [ProgramPageComponent],
  template: `<app-program-page [config]="config" />`,
})
export class MosquesComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly seoDestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.apply('seo.mosques.title', 'seo.mosques.description', this.seoDestroyRef);
  }

  readonly config: ProgramPageConfig = {
    headingKey: 'programs.mosques.title',
    subheadingKey: 'programs.mosques.subheading',
    photoLabelKey: 'programs.mosques.photoLabel',
    photoIcon: 'building',
    aboutHeadingKey: 'programs.mosques.aboutHeading',
    aboutParagraphKeys: ['programs.mosques.aboutOne', 'programs.mosques.aboutTwo'],
    stepsHeadingKey: 'programs.mosques.stepsHeading',
    steps: [
      {
        titleKey: 'programs.mosques.steps.survey.title',
        descriptionKey: 'programs.mosques.steps.survey.description',
      },
      {
        titleKey: 'programs.mosques.steps.build.title',
        descriptionKey: 'programs.mosques.steps.build.description',
      },
      {
        titleKey: 'programs.mosques.steps.handover.title',
        descriptionKey: 'programs.mosques.steps.handover.description',
      },
    ],
    impactHeadingKey: 'programs.mosques.impactHeading',
    stats: [
      {
        valueKey: 'programs.mosques.stats.built.value',
        labelKey: 'programs.mosques.stats.built.label',
        suffix: '+',
      },
      {
        valueKey: 'programs.mosques.stats.worshippers.value',
        labelKey: 'programs.mosques.stats.worshippers.label',
        suffix: '+',
      },
      {
        valueKey: 'programs.mosques.stats.boreholes.value',
        labelKey: 'programs.mosques.stats.boreholes.label',
        suffix: null,
      },
    ],
    ctaHeadingKey: 'programs.mosques.ctaHeading',
    ctaDescriptionKey: 'programs.mosques.ctaDescription',
  };
}
