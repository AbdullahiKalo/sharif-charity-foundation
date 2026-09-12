import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

/**
 * Renders a readable word instead of a raw dotted key when a translation is
 * absent, so a gap in a language file never shows `nav.transparency` to a
 * visitor. The key is still logged in development builds.
 */
export class HumanisedMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    const key = params.key;
    const lastSegment = key.slice(key.lastIndexOf('.') + 1);

    return lastSegment
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/^./, (character) => character.toUpperCase())
      .trim();
  }
}
