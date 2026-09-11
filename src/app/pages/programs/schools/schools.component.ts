import { Component } from '@angular/core';
import {
  ProgramPageComponent,
  ProgramPageConfig,
} from '../../../shared/components/program-page.component';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [ProgramPageComponent],
  template: `<app-program-page [config]="config" />`,
})
export class SchoolsComponent {
  readonly config: ProgramPageConfig = {
    headingKey: 'programs.schools.title',
    subheadingKey: 'programs.schools.subheading',
    photoLabelKey: 'programs.schools.photoLabel',
    photoIcon: 'building',
    aboutHeadingKey: 'programs.schools.aboutHeading',
    aboutParagraphKeys: [
      'programs.schools.aboutOne',
      'programs.schools.aboutTwo',
      'programs.schools.aboutThree',
    ],
    stepsHeadingKey: 'programs.schools.stepsHeading',
    steps: [
      {
        titleKey: 'programs.schools.steps.need.title',
        descriptionKey: 'programs.schools.steps.need.description',
      },
      {
        titleKey: 'programs.schools.steps.construction.title',
        descriptionKey: 'programs.schools.steps.construction.description',
      },
      {
        titleKey: 'programs.schools.steps.equip.title',
        descriptionKey: 'programs.schools.steps.equip.description',
      },
      {
        titleKey: 'programs.schools.steps.followUp.title',
        descriptionKey: 'programs.schools.steps.followUp.description',
      },
    ],
    impactHeadingKey: 'programs.schools.impactHeading',
    stats: [
      {
        valueKey: 'programs.schools.stats.schools.value',
        labelKey: 'programs.schools.stats.schools.label',
        suffix: '+',
      },
      {
        valueKey: 'programs.schools.stats.classrooms.value',
        labelKey: 'programs.schools.stats.classrooms.label',
        suffix: '+',
      },
      {
        valueKey: 'programs.schools.stats.pupils.value',
        labelKey: 'programs.schools.stats.pupils.label',
        suffix: '+',
      },
      {
        valueKey: 'programs.schools.stats.teachers.value',
        labelKey: 'programs.schools.stats.teachers.label',
        suffix: null,
      },
    ],
    ctaHeadingKey: 'programs.schools.ctaHeading',
    ctaDescriptionKey: 'programs.schools.ctaDescription',
  };
}
