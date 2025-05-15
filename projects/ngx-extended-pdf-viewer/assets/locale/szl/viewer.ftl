# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Piyrwyjszo strōna
pdfjs-previous-button-label = Piyrwyjszo
pdfjs-next-button =
    .title = Nastympno strōna
pdfjs-next-button-label = Dalij
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Strōna
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = ze { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } ze { $pagesCount })
pdfjs-zoom-out-button =
    .title = Zmyńsz
pdfjs-zoom-out-button-label = Zmyńsz
pdfjs-zoom-in-button =
    .title = Zwiynksz
pdfjs-zoom-in-button-label = Zwiynksz
pdfjs-zoom-select =
    .title = Srogość
pdfjs-presentation-mode-button =
    .title = Przełōncz na tryb prezyntacyje
pdfjs-presentation-mode-button-label = Tryb prezyntacyje
pdfjs-open-file-button =
    .title = Ôdewrzij zbiōr
pdfjs-open-file-button-label = Ôdewrzij
pdfjs-print-button =
    .title = Durkuj
pdfjs-print-button-label = Durkuj

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Noczynia
pdfjs-tools-button-label = Noczynia
pdfjs-first-page-button =
    .title = Idź ku piyrszyj strōnie
pdfjs-first-page-button-label = Idź ku piyrszyj strōnie
pdfjs-last-page-button =
    .title = Idź ku ôstatnij strōnie
pdfjs-last-page-button-label = Idź ku ôstatnij strōnie
pdfjs-page-rotate-cw-button =
    .title = Zwyrtnij w prawo
pdfjs-page-rotate-cw-button-label = Zwyrtnij w prawo
pdfjs-page-rotate-ccw-button =
    .title = Zwyrtnij w lewo
pdfjs-page-rotate-ccw-button-label = Zwyrtnij w lewo
pdfjs-cursor-text-select-tool-button =
    .title = Załōncz noczynie ôbiyranio tekstu
pdfjs-cursor-text-select-tool-button-label = Noczynie ôbiyranio tekstu
pdfjs-cursor-hand-tool-button =
    .title = Załōncz noczynie rōnczka
pdfjs-cursor-hand-tool-button-label = Noczynie rōnczka
pdfjs-scroll-vertical-button =
    .title = Używej piōnowego przewijanio
pdfjs-scroll-vertical-button-label = Piōnowe przewijanie
pdfjs-scroll-horizontal-button =
    .title = Używej poziōmego przewijanio
pdfjs-scroll-horizontal-button-label = Poziōme przewijanie
pdfjs-scroll-wrapped-button =
    .title = Używej szichtowego przewijanio
pdfjs-scroll-wrapped-button-label = Szichtowe przewijanie
pdfjs-spread-none-button =
    .title = Niy dowej strōn w widoku po dwie
pdfjs-spread-none-button-label = Po jednyj strōnie
pdfjs-spread-odd-button =
    .title = Pokoż strōny po dwie; niyporziste po lewyj
pdfjs-spread-odd-button-label = Niyporziste po lewyj
pdfjs-spread-even-button =
    .title = Pokoż strōny po dwie; porziste po lewyj
pdfjs-spread-even-button-label = Porziste po lewyj

## Document properties dialog

pdfjs-document-properties-button =
    .title = Włosności dokumyntu…
pdfjs-document-properties-button-label = Włosności dokumyntu…
pdfjs-document-properties-file-name = Miano zbioru:
pdfjs-document-properties-file-size = Srogość zbioru:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } B)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } B)
pdfjs-document-properties-title = Tytuł:
pdfjs-document-properties-author = Autōr:
pdfjs-document-properties-subject = Tymat:
pdfjs-document-properties-keywords = Kluczowe słowa:
pdfjs-document-properties-creation-date = Data zrychtowanio:
pdfjs-document-properties-modification-date = Data zmiany:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Zrychtowane ôd:
pdfjs-document-properties-producer = PDF ôd:
pdfjs-document-properties-version = Wersyjo PDF:
pdfjs-document-properties-page-count = Wielość strōn:
pdfjs-document-properties-page-size = Srogość strōny:
pdfjs-document-properties-page-size-unit-inches = in
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = piōnowo
pdfjs-document-properties-page-size-orientation-landscape = poziōmo
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Letter
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
pdfjs-document-properties-linearized = Gibki necowy podglōnd:
pdfjs-document-properties-linearized-yes = Ja
pdfjs-document-properties-linearized-no = Niy
pdfjs-document-properties-close-button = Zawrzij

## Print

pdfjs-print-progress-message = Rychtowanie dokumyntu do durku…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Pociep
pdfjs-printing-not-supported = Pozōr: Ta przeglōndarka niy cołkiym ôbsuguje durk.
pdfjs-printing-not-ready = Pozōr: Tyn PDF niy ma za tela zaladowany do durku.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Przełōncz posek na rancie
pdfjs-toggle-sidebar-notification-button =
    .title = Przełōncz posek na rancie (dokumynt mo struktura/przidowki/warstwy)
pdfjs-toggle-sidebar-button-label = Przełōncz posek na rancie
pdfjs-document-outline-button =
    .title = Pokoż struktura dokumyntu (tuplowane klikniyncie rozszyrzo/swijo wszyskie elymynta)
pdfjs-document-outline-button-label = Struktura dokumyntu
pdfjs-attachments-button =
    .title = Pokoż przidowki
pdfjs-attachments-button-label = Przidowki
pdfjs-layers-button =
    .title = Pokoż warstwy (tuplowane klikniyncie resetuje wszyskie warstwy do bazowego stanu)
pdfjs-layers-button-label = Warstwy
pdfjs-thumbs-button =
    .title = Pokoż miniatury
pdfjs-thumbs-button-label = Miniatury
pdfjs-findbar-button =
    .title = Znojdź w dokumyncie
pdfjs-findbar-button-label = Znojdź
pdfjs-additional-layers = Nadbytnie warstwy

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Strōna { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Miniatura strōny { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Znojdź
    .placeholder = Znojdź w dokumyncie…
pdfjs-find-previous-button =
    .title = Znojdź piyrwyjsze pokozanie sie tyj frazy
pdfjs-find-previous-button-label = Piyrwyjszo
pdfjs-find-next-button =
    .title = Znojdź nastympne pokozanie sie tyj frazy
pdfjs-find-next-button-label = Dalij
pdfjs-find-highlight-checkbox = Zaznacz wszysko
pdfjs-find-match-case-checkbox-label = Poznowej srogość liter
pdfjs-find-entire-word-checkbox-label = Cołke słowa
pdfjs-find-reached-top = Doszło do samego wiyrchu strōny, dalij ôd spodku
pdfjs-find-reached-bottom = Doszło do samego spodku strōny, dalij ôd wiyrchu
pdfjs-find-not-found = Fraza niy znaleziōno

## Predefined zoom values

pdfjs-page-scale-width = Szyrzka strōny
pdfjs-page-scale-fit = Napasowanie strōny
pdfjs-page-scale-auto = Autōmatyczno srogość
pdfjs-page-scale-actual = Aktualno srogość
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Przi ladowaniu PDFa pokozoł sie feler.
pdfjs-invalid-file-error = Zły abo felerny zbiōr PDF.
pdfjs-missing-file-error = Chybio zbioru PDF.
pdfjs-unexpected-response-error = Niyôczekowano ôdpowiydź serwera.
pdfjs-rendering-error = Przi renderowaniu strōny pokozoł sie feler.

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
    .alt = [Anotacyjo typu { $type }]

## Password

pdfjs-password-label = Wkludź hasło, coby ôdewrzić tyn zbiōr PDF.
pdfjs-password-invalid = Hasło je złe. Sprōbuj jeszcze roz.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = Pociep
pdfjs-web-fonts-disabled = Necowe fōnty sōm zastawiōne: niy idzie użyć wkludzōnych fōntōw PDF.

## Editing


## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.


# Translations for ngx-extended-pdf-viewer additions only available in en-US
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
pdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } KB ({ $b } bytes)
pdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } MB ({ $b } bytes)
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-current-outline-item-button =
    .title = Find Current Outline Item
pdfjs-current-outline-item-button-label = Current Outline Item
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
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
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
pdfjs-free-text2 =
    .aria-label = Text Editor
    .default-content = Start typing…
pdfjs-ink =
    .aria-label = Draw Editor
pdfjs-ink-canvas =
    .aria-label = User-created image
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
pdfjs-find-regexp-checkbox-label = regular expression