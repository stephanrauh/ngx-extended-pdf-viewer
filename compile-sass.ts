import * as fs from 'fs';
import * as sass from 'sass';

const options = { style: 'compressed' } as sass.Options<'sync'>;
const dark = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-dark-theme/colors.scss', options);
const light = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-light-theme/colors.scss', options);
const print = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/print.scss', options);

fs.writeFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-dark-theme/colors-css.ts', cssToTs(dark.css + ' ' + print.css));
fs.writeFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-light-theme/colors-css.ts', cssToTs(light.css + ' ' + print.css));

const annotationLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/annotation-layer-builder.scss', options);
const xfaLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/xfa_layer_builder.scss', options);
const annotationEditorLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/annotation_editor_layer_builder.scss', options);

const acroLightCSS = [annotationLayerBuilder.css, xfaLayerBuilder.css, annotationEditorLayerBuilder.css].join(' ');
fs.writeFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/acroform-default-theme/pdf-acroform-default-colors-css.ts', cssToTs(acroLightCSS));

function cssToTs(css: string): string {
  return `export const css=\`${css}\`;`;
}
