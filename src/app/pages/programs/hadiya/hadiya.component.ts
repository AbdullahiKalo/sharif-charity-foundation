import { Component } from '@angular/core';
import {
  ProgramPageComponent,
  ProgramPageConfig,
} from '../../../shared/components/program-page.component';

@Component({
  selector: 'app-hadiya',
  standalone: true,
  imports: [ProgramPageComponent],
  template: `<app-program-page [config]="config" />`,
})
export class HadiyaComponent {
  readonly config: ProgramPageConfig = {
    headingKey: 'programs.hadiya.title',
    subheadingKey: 'programs.hadiya.subheading',
    photoLabelKey: 'programs.hadiya.photoLabel',
    photoIcon: 'person',
    aboutHeadingKey: 'programs.hadiya.aboutHeading',
    aboutParagraphKeys: ['programs.hadiya.aboutOne', 'programs.hadiya.aboutTwo'],
    stepsHeadingKey: 'programs.hadiya.stepsHeading',
    steps: [
      {
        titleKey: 'programs.hadiya.steps.identify.title',
        descriptionKey: 'programs.hadiya.steps.identify.description',
      },
      {
        titleKey: 'programs.hadiya.steps.pack.title',
        descriptionKey: 'programs.hadiya.steps.pack.description',
      },
      {
        titleKey: 'programs.hadiya.steps.deliver.title',
        descriptionKey: 'programs.hadiya.steps.deliver.description',
      },
    ],
    impactHeadingKey: 'programs.hadiya.impactHeading',
    stats: [
      {
        valueKey: 'programs.hadiya.stats.parcels.value',
        labelKey: 'programs.hadiya.stats.parcels.label',
        suffix: '+',
      },
      {
        valueKey: 'programs.hadiya.stats.households.value',
        labelKey: 'programs.hadiya.stats.households.label',
        suffix: '+',
      },
      {
        valueKey: 'programs.hadiya.stats.communities.value',
        labelKey: 'programs.hadiya.stats.communities.label',
        suffix: null,
      },
    ],
    ctaHeadingKey: 'programs.hadiya.ctaHeading',
    ctaDescriptionKey: 'programs.hadiya.ctaDescription',
  };
}
