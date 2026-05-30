import * as fs from 'fs';
import * as sass from 'sass';
import postcss from 'postcss';
// @ts-ignore - no published type definitions
import postcssDirPseudoClass from 'postcss-dir-pseudo-class';
// @ts-ignore - no published type definitions
import postcssLightDark from '@csstools/postcss-light-dark-function';

function removeComments(code: string): string {
  // Remove single-line comments
  // code = code.replace(/\/\/.*?$/gm, '');

  // Remove multi-line comments
  code = code.replace(/\/\*[\s\S]*?\*\//g, '\n');

  return code.trim() + '\n';
}

// when debugging use { style: 'expanded' }
const options = {
  style: 'compressed',
  logger: {
    xwarn: (message: string) => {
      if (!message.includes('Deprecation Warning') && !message.includes('More info')) {
        console.warn(message); // Only log non-deprecation warnings
      }
    },
  },
} as sass.Options<'sync'>;

// PostCSS pipeline that downlevels two CSS features pdf.js v6 uses
// natively but which require very recent browsers:
//   - :dir() pseudo-class (Chrome 123+ / Safari 16.4+ / Firefox 49+)
//   - light-dark() CSS function (Chrome 123+ / Safari 17.5+ / Firefox 120+)
// CSS native '&' nesting is handled by Sass itself (same syntax as SCSS
// nesting), so postcss-nesting is not needed in this pipeline.
const polyfiller = postcss([
  postcssDirPseudoClass(),
  postcssLightDark({ preserve: true }),
]);

async function polyfillCss(css: string): Promise<string> {
  const result = await polyfiller.process(css, { from: undefined });
  return result.css;
}
const darkScss = removeComments(fs.readFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-dark-theme/colors.scss', 'utf8'));
const lightScss = removeComments(fs.readFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-light-theme/colors.scss', 'utf8'));
const textLayerBuildScss = removeComments(fs.readFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/text-layer-builder.scss', 'utf8'));
const viewerWithImageScss = removeComments(fs.readFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/viewer-with-images.scss', 'utf8'));
const componentScss = removeComments(fs.readFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/ngx-extended-pdf-viewer.component.scss', 'utf8'));

const signature_manager = removeComments(fs.readFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/signature_manager.scss', 'utf8'));
const viewsManagerScss = removeComments(fs.readFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/views_manager.scss', 'utf8'));
const menuScss = removeComments(fs.readFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/menu.scss', 'utf8'));
const dark = sass.compileString(darkScss + signature_manager + textLayerBuildScss + viewerWithImageScss + viewsManagerScss + menuScss + componentScss, options);
const light = sass.compileString(lightScss + signature_manager + textLayerBuildScss + viewerWithImageScss + viewsManagerScss + menuScss + componentScss, options);
const print = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/print.scss', options);
const toggleButton = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/toggle_button.css', options);
const bookMode = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/book-mode.scss', options);
const dialog = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/dialog.scss', options);
const messageBar = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/message_bar.scss', options);

const annotationLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/annotation-layer-builder.scss', options);
const xfaLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/xfa_layer_builder.scss', options);
const drawLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/draw_layer_builder.scss', options);
const annotationEditorLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/annotation_editor_layer_builder.scss', options);

(async () => {
  fs.writeFileSync(
    './projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-dark-theme/colors.css',
    await polyfillCss(dark.css + ' ' + print.css + ' ' + toggleButton.css + bookMode.css + dialog.css + messageBar.css),
  );
  fs.writeFileSync(
    './projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-light-theme/colors.css',
    await polyfillCss(light.css + ' ' + print.css + ' ' + toggleButton.css + bookMode.css + dialog.css + messageBar.css),
  );

  const acroLightCSS = [annotationLayerBuilder.css, xfaLayerBuilder.css, drawLayerBuilder.css, annotationEditorLayerBuilder.css].join(' ');
  fs.writeFileSync(
    './projects/ngx-extended-pdf-viewer/src/lib/theme/acroform-default-theme/pdf-acroform-default-colors.css',
    await polyfillCss(acroLightCSS),
  );
})();
