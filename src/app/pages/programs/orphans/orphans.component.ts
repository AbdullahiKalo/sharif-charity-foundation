import { Component } from '@angular/core';
import {
  ProgramPageComponent,
  ProgramPageConfig,
} from '../../../shared/components/program-page.component';

@Component({
  selector: 'app-orphans',
  standalone: true,
  imports: [ProgramPageComponent],
  template: `<app-program-page [config]="config" />`,
})
export class OrphansComponent {
  readonly config: ProgramPageConfig = {
    headingKey: 'programs.orphans.title',
    subheadingKey: 'programs.orphans.subheading',
    photoLabelKey: 'programs.orphans.photoLabel',
    photoIcon: 'person',
    aboutHeadingKey: 'programs.orphans.aboutHeading',
    aboutParagraphKeys: [
      'programs.orphans.aboutOne',
      'programs.orphans.aboutTwo',
      'programs.orphans.aboutThree',
    ],
    stepsHeadingKey: 'programs.orphans.stepsHeading',
    steps: [
      {
        titleKey: 'programs.orphans.steps.registration.title',
        descriptionKey: 'programs.orphans.steps.registration.description',
      },
      {
        titleKey: 'programs.orphans.steps.matching.title',
        descriptionKey: 'programs.orphans.steps.matching.description',
      },
      {
        titleKey: 'programs.orphans.steps.support.title',
        descriptionKey: 'programs.orphans.steps.support.description',
      },
      {
        titleKey: 'programs.orphans.steps.reports.title',
        descriptionKey: 'programs.orphans.steps.reports.description',
      },
    ],
    impactHeadingKey: 'programs.orphans.impactHeading',
    stats: [
      {
        valueKey: 'programs.orphans.stats.sponsored.value',
        labelKey: 'programs.orphans.stats.sponsored.label',
        suffix: '+',
      },
      {
        valueKey: 'programs.orphans.stats.states.value',
        labelKey: 'programs.orphans.stats.states.label',
        suffix: null,
      },
      {
        valueKey: 'programs.orphans.stats.retention.value',
        labelKey: 'programs.orphans.stats.retention.label',
        suffix: '%',
      },
      {
        valueKey: 'programs.orphans.stats.graduates.value',
        labelKey: 'programs.orphans.stats.graduates.label',
        suffix: '+',
      },
    ],
    ctaHeadingKey: 'programs.orphans.ctaHeading',
    ctaDescriptionKey: 'programs.orphans.ctaDescription',
  };
}
