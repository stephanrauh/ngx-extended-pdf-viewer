# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Pàgina anterior
pdfjs-previous-button-label = Anterior
pdfjs-next-button =
    .title = Pàgina següent
pdfjs-next-button-label = Següent
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Pàgina
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = de { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } de { $pagesCount })
pdfjs-zoom-out-button =
    .title = Redueix
pdfjs-zoom-out-button-label = Redueix
pdfjs-zoom-in-button =
    .title = Amplia
pdfjs-zoom-in-button-label = Amplia
pdfjs-zoom-select =
    .title = Escala
pdfjs-presentation-mode-button =
    .title = Canvia al mode de presentació
pdfjs-presentation-mode-button-label = Mode de presentació
pdfjs-open-file-button =
    .title = Obre el fitxer
pdfjs-open-file-button-label = Obre
pdfjs-print-button =
    .title = Imprimeix
pdfjs-print-button-label = Imprimeix
pdfjs-save-button =
    .title = Desa
pdfjs-save-button-label = Desa
pdfjs-bookmark-button =
    .title = Pàgina actual (mostra l'URL de la pàgina actual)
pdfjs-bookmark-button-label = Pàgina actual

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Eines
pdfjs-tools-button-label = Eines
pdfjs-first-page-button =
    .title = Vés a la primera pàgina
pdfjs-first-page-button-label = Vés a la primera pàgina
pdfjs-last-page-button =
    .title = Vés a l'última pàgina
pdfjs-last-page-button-label = Vés a l'última pàgina
pdfjs-page-rotate-cw-button =
    .title = Gira cap a la dreta
pdfjs-page-rotate-cw-button-label = Gira cap a la dreta
pdfjs-page-rotate-ccw-button =
    .title = Gira cap a l'esquerra
pdfjs-page-rotate-ccw-button-label = Gira cap a l'esquerra
pdfjs-cursor-text-select-tool-button =
    .title = Habilita l'eina de selecció de text
pdfjs-cursor-text-select-tool-button-label = Eina de selecció de text
pdfjs-cursor-hand-tool-button =
    .title = Habilita l'eina de mà
pdfjs-cursor-hand-tool-button-label = Eina de mà
pdfjs-scroll-page-button =
    .title = Usa el desplaçament de pàgina
pdfjs-scroll-page-button-label = Desplaçament de pàgina
pdfjs-scroll-vertical-button =
    .title = Utilitza el desplaçament vertical
pdfjs-scroll-vertical-button-label = Desplaçament vertical
pdfjs-scroll-horizontal-button =
    .title = Utilitza el desplaçament horitzontal
pdfjs-scroll-horizontal-button-label = Desplaçament horitzontal
pdfjs-scroll-wrapped-button =
    .title = Activa el desplaçament continu
pdfjs-scroll-wrapped-button-label = Desplaçament continu
pdfjs-spread-none-button =
    .title = No agrupis les pàgines de dues en dues
pdfjs-spread-none-button-label = Una sola pàgina
pdfjs-spread-odd-button =
    .title = Mostra dues pàgines començant per les pàgines de numeració senar
pdfjs-spread-odd-button-label = Doble pàgina (senar)
pdfjs-spread-even-button =
    .title = Mostra dues pàgines començant per les pàgines de numeració parell
pdfjs-spread-even-button-label = Doble pàgina (parell)

## Document properties dialog

pdfjs-document-properties-button =
    .title = Propietats del document…
pdfjs-document-properties-button-label = Propietats del document…
pdfjs-document-properties-file-name = Nom del fitxer:
pdfjs-document-properties-file-size = Mida del fitxer:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } bytes)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } bytes)
pdfjs-document-properties-title = Títol:
pdfjs-document-properties-author = Autor:
pdfjs-document-properties-subject = Assumpte:
pdfjs-document-properties-keywords = Paraules clau:
pdfjs-document-properties-creation-date = Data de creació:
pdfjs-document-properties-modification-date = Data de modificació:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Creador:
pdfjs-document-properties-producer = Generador de PDF:
pdfjs-document-properties-version = Versió de PDF:
pdfjs-document-properties-page-count = Nombre de pàgines:
pdfjs-document-properties-page-size = Mida de la pàgina:
pdfjs-document-properties-page-size-unit-inches = polzades
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = vertical
pdfjs-document-properties-page-size-orientation-landscape = apaïsat
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Carta
pdfjs-document-properties-page-size-name-legal = Legal

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })

##

# The linearization status of the document; usually called "Fast Web View" in
# English locales of Adobe software.
pdfjs-document-properties-linearized = Vista web ràpida:
pdfjs-document-properties-linearized-yes = Sí
pdfjs-document-properties-linearized-no = No
pdfjs-document-properties-close-button = Tanca

## Print

pdfjs-print-progress-message = S'està preparant la impressió del document…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Cancel·la
pdfjs-printing-not-supported = Avís: la impressió no és plenament funcional en aquest navegador.
pdfjs-printing-not-ready = Atenció: el PDF no s'ha acabat de carregar per imprimir-lo.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Mostra/amaga la barra lateral
pdfjs-toggle-sidebar-notification-button =
    .title = Mostra/amaga la barra lateral (el document conté un esquema, adjuncions o capes)
pdfjs-toggle-sidebar-button-label = Mostra/amaga la barra lateral
pdfjs-document-outline-button =
    .title = Mostra l'esquema del document (doble clic per ampliar/reduir tots els elements)
pdfjs-document-outline-button-label = Esquema del document
pdfjs-attachments-button =
    .title = Mostra les adjuncions
pdfjs-attachments-button-label = Adjuncions
pdfjs-layers-button =
    .title = Mostra les capes (doble clic per restablir totes les capes al seu estat per defecte)
pdfjs-layers-button-label = Capes
pdfjs-thumbs-button =
    .title = Mostra les miniatures
pdfjs-thumbs-button-label = Miniatures
pdfjs-current-outline-item-button =
    .title = Cerca l'element d'esquema actual
pdfjs-current-outline-item-button-label = Element d'esquema actual
pdfjs-findbar-button =
    .title = Cerca al document
pdfjs-findbar-button-label = Cerca
pdfjs-additional-layers = Capes addicionals

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Pàgina { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Miniatura de la pàgina { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Cerca
    .placeholder = Cerca al document…
pdfjs-find-previous-button =
    .title = Cerca l'anterior coincidència de l'expressió
pdfjs-find-previous-button-label = Anterior
pdfjs-find-next-button =
    .title = Cerca la següent coincidència de l'expressió
pdfjs-find-next-button-label = Següent
pdfjs-find-highlight-checkbox = Ressalta-ho tot
pdfjs-find-match-case-checkbox-label = Distingeix entre majúscules i minúscules
pdfjs-find-match-diacritics-checkbox-label = Respecta els diacrítics
pdfjs-find-entire-word-checkbox-label = Paraules senceres
pdfjs-find-reached-top = S'ha arribat al principi del document, es continua pel final
pdfjs-find-reached-bottom = S'ha arribat al final del document, es continua pel principi
pdfjs-find-not-found = No s'ha trobat l'expressió

## Predefined zoom values

pdfjs-page-scale-width = Amplada de la pàgina
pdfjs-page-scale-fit = Ajusta la pàgina
pdfjs-page-scale-auto = Zoom automàtic
pdfjs-page-scale-actual = Mida real
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = Pàgina { $page }

## Loading indicator messages

pdfjs-loading-error = S'ha produït un error en carregar el PDF.
pdfjs-invalid-file-error = El fitxer PDF no és vàlid o està malmès.
pdfjs-missing-file-error = Falta el fitxer PDF.
pdfjs-unexpected-response-error = Resposta inesperada del servidor.
pdfjs-rendering-error = S'ha produït un error mentre es renderitzava la pàgina.

## Annotations

# Variables:
#   $date (Date) - the modification date of the annotation
#   $time (Time) - the modification time of the annotation
pdfjs-annotation-date-string = { $date }, { $time }
# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [Anotació { $type }]

## Password

pdfjs-password-label = Introduïu la contrasenya per obrir aquest fitxer PDF.
pdfjs-password-invalid = La contrasenya no és vàlida. Torneu-ho a provar.
pdfjs-password-ok-button = D'acord
pdfjs-password-cancel-button = Cancel·la
pdfjs-web-fonts-disabled = Els tipus de lletra web estan desactivats: no es poden utilitzar els tipus de lletra incrustats al PDF.

## Editing

pdfjs-editor-free-text-button =
    .title = Text
pdfjs-editor-free-text-button-label = Text
pdfjs-editor-ink-button =
    .title = Dibuixa
pdfjs-editor-ink-button-label = Dibuixa

## Remove button for the various kind of editor.


##

# Editor Parameters
pdfjs-editor-free-text-color-input = Color
pdfjs-editor-free-text-size-input = Mida
pdfjs-editor-ink-color-input = Color
pdfjs-editor-ink-thickness-input = Gruix
pdfjs-editor-ink-opacity-input = Opacitat
pdfjs-free-text =
    .aria-label = Editor de text
pdfjs-free-text-default-content = Escriviu…
pdfjs-ink =
    .aria-label = Editor de dibuix
pdfjs-ink-canvas =
    .aria-label = Imatge creada per l'usuari

## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.


## Color picker


## Show all highlights
## This is a toggle button to show/hide all the highlights.


## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.


## Image alt-text settings


# Translations for ngx-extended-pdf-viewer additions only available in en-US
pdfjs-download-button =
    .title = Download
pdfjs-download-button-label = Download
pdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } KB ({ $b } bytes)
pdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } MB ({ $b } bytes)
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-find-match-count =
    { $total ->
        [one] { $current } of { $total } match
       *[other] { $current } of { $total } matches
    }
pdfjs-find-match-count-limit =
    { $limit ->
        [one] More than { $limit } match
       *[other] More than { $limit } matches
    }
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-editor-stamp-button =
    .title = Add or edit images
pdfjs-editor-stamp-button-label = Add or edit images
pdfjs-editor-highlight-button =
    .title = Highlight
pdfjs-editor-highlight-button-label = Highlight
pdfjs-highlight-floating-button1 =
    .title = Highlight
    .aria-label = Highlight
pdfjs-highlight-floating-button-label = Highlight
pdfjs-editor-remove-ink-button =
    .title = Remove drawing
pdfjs-editor-remove-freetext-button =
    .title = Remove text
pdfjs-editor-remove-stamp-button =
    .title = Remove image
pdfjs-editor-remove-highlight-button =
    .title = Remove highlight
pdfjs-editor-stamp-add-image-button =
    .title = Add image
pdfjs-editor-stamp-add-image-button-label = Add image
pdfjs-editor-free-highlight-thickness-input = Thickness
pdfjs-editor-free-highlight-thickness-title =
    .title = Change thickness when highlighting items other than text
pdfjs-free-text2 =
    .aria-label = Text Editor
    .default-content = Start typing…
pdfjs-editor-alt-text-button =
    .aria-label = Alt text
pdfjs-editor-alt-text-button-label = Alt text
pdfjs-editor-alt-text-edit-button =
    .aria-label = Edit alt text
pdfjs-editor-alt-text-dialog-label = Choose an option
pdfjs-editor-alt-text-dialog-description = Alt text (alternative text) helps when people can’t see the image or when it doesn’t load.
pdfjs-editor-alt-text-add-description-label = Add a description
pdfjs-editor-alt-text-add-description-description = Aim for 1-2 sentences that describe the subject, setting, or actions.
pdfjs-editor-alt-text-mark-decorative-label = Mark as decorative
pdfjs-editor-alt-text-mark-decorative-description = This is used for ornamental images, like borders or watermarks.
pdfjs-editor-alt-text-cancel-button = Cancel
pdfjs-editor-alt-text-save-button = Save
pdfjs-editor-alt-text-decorative-tooltip = Marked as decorative
pdfjs-editor-alt-text-textarea =
    .placeholder = For example, “A young man sits down at a table to eat a meal”
pdfjs-editor-resizer-top-left =
    .aria-label = Top left corner — resize
pdfjs-editor-resizer-top-middle =
    .aria-label = Top middle — resize
pdfjs-editor-resizer-top-right =
    .aria-label = Top right corner — resize
pdfjs-editor-resizer-middle-right =
    .aria-label = Middle right — resize
pdfjs-editor-resizer-bottom-right =
    .aria-label = Bottom right corner — resize
pdfjs-editor-resizer-bottom-middle =
    .aria-label = Bottom middle — resize
pdfjs-editor-resizer-bottom-left =
    .aria-label = Bottom left corner — resize
pdfjs-editor-resizer-middle-left =
    .aria-label = Middle left — resize
pdfjs-editor-highlight-colorpicker-label = Highlight color
pdfjs-editor-colorpicker-button =
    .title = Change color
pdfjs-editor-colorpicker-dropdown =
    .aria-label = Color choices
pdfjs-editor-colorpicker-yellow =
    .title = Yellow
pdfjs-editor-colorpicker-green =
    .title = Green
pdfjs-editor-colorpicker-blue =
    .title = Blue
pdfjs-editor-colorpicker-pink =
    .title = Pink
pdfjs-editor-colorpicker-red =
    .title = Red
pdfjs-editor-highlight-show-all-button-label = Show all
pdfjs-editor-highlight-show-all-button =
    .title = Show all
pdfjs-editor-new-alt-text-dialog-edit-label = Edit alt text (image description)
pdfjs-editor-new-alt-text-dialog-add-label = Add alt text (image description)
pdfjs-editor-new-alt-text-textarea =
    .placeholder = Write your description here…
pdfjs-editor-new-alt-text-description = Short description for people who can’t see the image or when the image doesn’t load.
pdfjs-editor-new-alt-text-disclaimer1 = This alt text was created automatically and may be inaccurate.
pdfjs-editor-new-alt-text-disclaimer-learn-more-url = Learn more
pdfjs-editor-new-alt-text-create-automatically-button-label = Create alt text automatically
pdfjs-editor-new-alt-text-not-now-button = Not now
pdfjs-editor-new-alt-text-error-title = Couldn’t create alt text automatically
pdfjs-editor-new-alt-text-error-description = Please write your own alt text or try again later.
pdfjs-editor-new-alt-text-error-close-button = Close
pdfjs-editor-new-alt-text-ai-model-downloading-progress = Downloading alt text AI model ({ $downloadedSize } of { $totalSize } MB)
    .aria-valuetext = Downloading alt text AI model ({ $downloadedSize } of { $totalSize } MB)
pdfjs-editor-new-alt-text-added-button =
    .aria-label = Alt text added
pdfjs-editor-new-alt-text-added-button-label = Alt text added
pdfjs-editor-new-alt-text-missing-button =
    .aria-label = Missing alt text
pdfjs-editor-new-alt-text-missing-button-label = Missing alt text
pdfjs-editor-new-alt-text-to-review-button =
    .aria-label = Review alt text
pdfjs-editor-new-alt-text-to-review-button-label = Review alt text
pdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer = Created automatically: { $generatedAltText }
pdfjs-image-alt-text-settings-button =
    .title = Image alt text settings
pdfjs-image-alt-text-settings-button-label = Image alt text settings
pdfjs-editor-alt-text-settings-dialog-label = Image alt text settings
pdfjs-editor-alt-text-settings-automatic-title = Automatic alt text
pdfjs-editor-alt-text-settings-create-model-button-label = Create alt text automatically
pdfjs-editor-alt-text-settings-create-model-description = Suggests descriptions to help people who can’t see the image or when the image doesn’t load.
pdfjs-editor-alt-text-settings-download-model-label = Alt text AI model ({ $totalSize } MB)
pdfjs-editor-alt-text-settings-ai-model-description = Runs locally on your device so your data stays private. Required for automatic alt text.
pdfjs-editor-alt-text-settings-delete-model-button = Delete
pdfjs-editor-alt-text-settings-download-model-button = Download
pdfjs-editor-alt-text-settings-downloading-model-button = Downloading…
pdfjs-editor-alt-text-settings-editor-title = Alt text editor
pdfjs-editor-alt-text-settings-show-dialog-button-label = Show alt text editor right away when adding an image
pdfjs-editor-alt-text-settings-show-dialog-description = Helps you make sure all your images have alt text.
pdfjs-editor-alt-text-settings-close-button = Close
pdfjs-editor-undo-bar-message-highlight = Highlight removed
pdfjs-editor-undo-bar-message-freetext = Text removed
pdfjs-editor-undo-bar-message-ink = Drawing removed
pdfjs-editor-undo-bar-message-stamp = Image removed
pdfjs-editor-undo-bar-message-multiple =
    { $count ->
        [one] { $count } annotation removed
       *[other] { $count } annotations removed
    }
pdfjs-editor-undo-bar-undo-button =
    .title = Undo
pdfjs-editor-undo-bar-undo-button-label = Undo
pdfjs-editor-undo-bar-close-button =
    .title = Close
pdfjs-editor-undo-bar-close-button-label = Close
unverified-signature-warning = This PDF file contains a digital signature. The PDF viewer can't verify if the signature is valid. Please download the file and open it in Acrobat Reader to verify the signature is valid.
pdfjs-infinite-scroll-button-label = Infinite scroll
pdfjs-find-multiple-checkbox-label = Match Each Word
pdfjs-find-regexp-checkbox-label = Regular Expression