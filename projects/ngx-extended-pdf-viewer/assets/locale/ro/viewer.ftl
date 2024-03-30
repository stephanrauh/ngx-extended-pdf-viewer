# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Pagina precedentă
pdfjs-previous-button-label = Înapoi
pdfjs-next-button =
    .title = Pagina următoare
pdfjs-next-button-label = Înainte
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Pagina
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = din { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } din { $pagesCount })
pdfjs-zoom-out-button =
    .title = Micșorează
pdfjs-zoom-out-button-label = Micșorează
pdfjs-zoom-in-button =
    .title = Mărește
pdfjs-zoom-in-button-label = Mărește
pdfjs-zoom-select =
    .title = Zoom
pdfjs-presentation-mode-button =
    .title = Comută la modul de prezentare
pdfjs-presentation-mode-button-label = Mod de prezentare
pdfjs-open-file-button =
    .title = Deschide un fișier
pdfjs-open-file-button-label = Deschide
pdfjs-print-button =
    .title = Tipărește
pdfjs-print-button-label = Tipărește

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Instrumente
pdfjs-tools-button-label = Instrumente
pdfjs-first-page-button =
    .title = Mergi la prima pagină
pdfjs-first-page-button-label = Mergi la prima pagină
pdfjs-last-page-button =
    .title = Mergi la ultima pagină
pdfjs-last-page-button-label = Mergi la ultima pagină
pdfjs-page-rotate-cw-button =
    .title = Rotește în sensul acelor de ceas
pdfjs-page-rotate-cw-button-label = Rotește în sensul acelor de ceas
pdfjs-page-rotate-ccw-button =
    .title = Rotește în sens invers al acelor de ceas
pdfjs-page-rotate-ccw-button-label = Rotește în sens invers al acelor de ceas
pdfjs-cursor-text-select-tool-button =
    .title = Activează instrumentul de selecție a textului
pdfjs-cursor-text-select-tool-button-label = Instrumentul de selecție a textului
pdfjs-cursor-hand-tool-button =
    .title = Activează instrumentul mână
pdfjs-cursor-hand-tool-button-label = Unealta mână
pdfjs-scroll-vertical-button =
    .title = Folosește derularea verticală
pdfjs-scroll-vertical-button-label = Derulare verticală
pdfjs-scroll-horizontal-button =
    .title = Folosește derularea orizontală
pdfjs-scroll-horizontal-button-label = Derulare orizontală
pdfjs-scroll-wrapped-button =
    .title = Folosește derularea încadrată
pdfjs-scroll-wrapped-button-label = Derulare încadrată
pdfjs-spread-none-button =
    .title = Nu uni paginile broșate
pdfjs-spread-none-button-label = Fără pagini broșate
pdfjs-spread-odd-button =
    .title = Unește paginile broșate începând cu cele impare
pdfjs-spread-odd-button-label = Broșare pagini impare
pdfjs-spread-even-button =
    .title = Unește paginile broșate începând cu cele pare
pdfjs-spread-even-button-label = Broșare pagini pare

## Document properties dialog

pdfjs-document-properties-button =
    .title = Proprietățile documentului…
pdfjs-document-properties-button-label = Proprietățile documentului…
pdfjs-document-properties-file-name = Numele fișierului:
pdfjs-document-properties-file-size = Mărimea fișierului:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } byți)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } byți)
pdfjs-document-properties-title = Titlu:
pdfjs-document-properties-author = Autor:
pdfjs-document-properties-subject = Subiect:
pdfjs-document-properties-keywords = Cuvinte cheie:
pdfjs-document-properties-creation-date = Data creării:
pdfjs-document-properties-modification-date = Data modificării:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Autor:
pdfjs-document-properties-producer = Producător PDF:
pdfjs-document-properties-version = Versiune PDF:
pdfjs-document-properties-page-count = Număr de pagini:
pdfjs-document-properties-page-size = Mărimea paginii:
pdfjs-document-properties-page-size-unit-inches = in
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = verticală
pdfjs-document-properties-page-size-orientation-landscape = orizontală
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Literă
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
pdfjs-document-properties-linearized = Vizualizare web rapidă:
pdfjs-document-properties-linearized-yes = Da
pdfjs-document-properties-linearized-no = Nu
pdfjs-document-properties-close-button = Închide

## Print

pdfjs-print-progress-message = Se pregătește documentul pentru tipărire…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Renunță
pdfjs-printing-not-supported = Avertisment: Tipărirea nu este suportată în totalitate de acest browser.
pdfjs-printing-not-ready = Avertisment: PDF-ul nu este încărcat complet pentru tipărire.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Comută bara laterală
pdfjs-toggle-sidebar-button-label = Comută bara laterală
pdfjs-document-outline-button =
    .title = Afișează schița documentului (dublu-clic pentru a extinde/restrânge toate elementele)
pdfjs-document-outline-button-label = Schița documentului
pdfjs-attachments-button =
    .title = Afișează atașamentele
pdfjs-attachments-button-label = Atașamente
pdfjs-thumbs-button =
    .title = Afișează miniaturi
pdfjs-thumbs-button-label = Miniaturi
pdfjs-findbar-button =
    .title = Caută în document
pdfjs-findbar-button-label = Caută

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Pagina { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Miniatura paginii { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Caută
    .placeholder = Caută în document…
pdfjs-find-previous-button =
    .title = Mergi la apariția anterioară a textului
pdfjs-find-previous-button-label = Înapoi
pdfjs-find-next-button =
    .title = Mergi la apariția următoare a textului
pdfjs-find-next-button-label = Înainte
pdfjs-find-highlight-checkbox = Evidențiază toate aparițiile
pdfjs-find-match-case-checkbox-label = Ține cont de majuscule și minuscule
pdfjs-find-entire-word-checkbox-label = Cuvinte întregi
pdfjs-find-reached-top = Am ajuns la începutul documentului, continuă de la sfârșit
pdfjs-find-reached-bottom = Am ajuns la sfârșitul documentului, continuă de la început
pdfjs-find-not-found = Nu s-a găsit textul

## Predefined zoom values

pdfjs-page-scale-width = Lățime pagină
pdfjs-page-scale-fit = Potrivire la pagină
pdfjs-page-scale-auto = Zoom automat
pdfjs-page-scale-actual = Mărime reală
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = A intervenit o eroare la încărcarea PDF-ului.
pdfjs-invalid-file-error = Fișier PDF nevalid sau corupt.
pdfjs-missing-file-error = Fișier PDF lipsă.
pdfjs-unexpected-response-error = Răspuns neașteptat de la server.
pdfjs-rendering-error = A intervenit o eroare la randarea paginii.

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
    .alt = [Adnotare { $type }]

## Password

pdfjs-password-label = Introdu parola pentru a deschide acest fișier PDF.
pdfjs-password-invalid = Parolă nevalidă. Te rugăm să încerci din nou.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = Renunță
pdfjs-web-fonts-disabled = Fonturile web sunt dezactivate: nu se pot folosi fonturile PDF încorporate.

## Editing


## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.


pdfjs-save-button =
    .title = Save
pdfjs-save-button-label = Save
pdfjs-download-button =
    .title = Download
pdfjs-download-button-label = Download
pdfjs-bookmark-button =
    .title = Current Page (View URL from Current Page)
pdfjs-bookmark-button-label = Current Page
pdfjs-scroll-page-button =
    .title = Use Page Scrolling
pdfjs-scroll-page-button-label = Page Scrolling
pdfjs-toggle-sidebar-notification-button =
    .title = Toggle Sidebar (document contains outline/attachments/layers)
pdfjs-layers-button =
    .title = Show Layers (double-click to reset all layers to the default state)
pdfjs-layers-button-label = Layers
pdfjs-current-outline-item-button =
    .title = Find Current Outline Item
pdfjs-current-outline-item-button-label = Current Outline Item
pdfjs-additional-layers = Additional Layers
pdfjs-find-match-diacritics-checkbox-label = Match Diacritics
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
pdfjs-page-landmark =
    .aria-label = Page { $page }
pdfjs-editor-free-text-button =
    .title = Text
pdfjs-editor-free-text-button-label = Text
pdfjs-editor-ink-button =
    .title = Draw
pdfjs-editor-ink-button-label = Draw
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
pdfjs-editor-free-text-color-input = Color
pdfjs-editor-free-text-size-input = Size
pdfjs-editor-ink-color-input = Color
pdfjs-editor-ink-thickness-input = Thickness
pdfjs-editor-ink-opacity-input = Opacity
pdfjs-editor-stamp-add-image-button =
    .title = Add image
pdfjs-editor-stamp-add-image-button-label = Add image
pdfjs-editor-free-highlight-thickness-input = Thickness
pdfjs-editor-free-highlight-thickness-title =
    .title = Change thickness when highlighting items other than text
pdfjs-free-text =
    .aria-label = Text Editor
pdfjs-free-text-default-content = Start typing…
pdfjs-ink =
    .aria-label = Draw Editor
pdfjs-ink-canvas =
    .aria-label = User-created image
pdfjs-editor-alt-text-button-label = Alt text
pdfjs-editor-alt-text-edit-button-label = Edit alt text
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
pdfjs-editor-resizer-label-top-left = Top left corner — resize
pdfjs-editor-resizer-label-top-middle = Top middle — resize
pdfjs-editor-resizer-label-top-right = Top right corner — resize
pdfjs-editor-resizer-label-middle-right = Middle right — resize
pdfjs-editor-resizer-label-bottom-right = Bottom right corner — resize
pdfjs-editor-resizer-label-bottom-middle = Bottom middle — resize
pdfjs-editor-resizer-label-bottom-left = Bottom left corner — resize
pdfjs-editor-resizer-label-middle-left = Middle left — resize
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
unverified-signature-warning = This PDF file contains a digital signature. The PDF viewer can't verify if the signature is valid. Please download the file and open it in Acrobat Reader to verify the signature is valid.
pdfjs-infinite-scroll-button-label = Infinite scroll
pdfjs-open-in-app-button =
    .title = Open in app
pdfjs-open-in-app-button-label = Open in app