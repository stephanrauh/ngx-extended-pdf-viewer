import * as fs from 'fs';
import * as sass from 'sass';

// when debugging use { style: 'expanded' }
const options = {
  style: 'compressed',
  logger: {
    warn: (message) => {
      if (!message.includes('Deprecation Warning') && !message.includes('More info')) {
        console.warn(message); // Only log non-deprecation warnings
      }
    },
  },
} as sass.Options<'sync'>;
const dark = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-dark-theme/colors.scss', options);
const light = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-light-theme/colors.scss', options);
const print = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/print.scss', options);
const toggleButton = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/toggle_button.css', options);
const bookMode = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/book-mode.scss', options);
const dialog = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/dialog.scss', options);
const messageBar = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/message_bar.scss', options);

fs.writeFileSync(
  './projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-dark-theme/colors.css',
  dark.css + ' ' + print.css + ' ' + toggleButton.css + bookMode.css + dialog.css + messageBar.css, //
);
fs.writeFileSync(
  './projects/ngx-extended-pdf-viewer/src/lib/theme/pdf-light-theme/colors.css',
  light.css + ' ' + print.css + ' ' + toggleButton.css + bookMode.css + dialog.css + messageBar.css, //
);

const annotationLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/annotation-layer-builder.scss', options);
const xfaLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/xfa_layer_builder.scss', options);
const drawLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/draw_layer_builder.scss', options);
const annotationEditorLayerBuilder = sass.compile('./projects/ngx-extended-pdf-viewer/src/lib/theme/common/annotation_editor_layer_builder.scss', options);
const acroLightCSS = [annotationLayerBuilder.css, xfaLayerBuilder.css, drawLayerBuilder.css, annotationEditorLayerBuilder.css].join(' ');
fs.writeFileSync('./projects/ngx-extended-pdf-viewer/src/lib/theme/acroform-default-theme/pdf-acroform-default-colors.css', acroLightCSS);
