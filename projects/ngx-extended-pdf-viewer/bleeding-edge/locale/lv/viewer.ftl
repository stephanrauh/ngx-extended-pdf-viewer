# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Iepriekšējā lapa
pdfjs-previous-button-label = Iepriekšējā
pdfjs-next-button =
    .title = Nākamā lapa
pdfjs-next-button-label = Nākamā
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Lapa
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = no { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } no { $pagesCount })
pdfjs-zoom-out-button =
    .title = Attālināt
pdfjs-zoom-out-button-label = Attālināt
pdfjs-zoom-in-button =
    .title = Pietuvināt
pdfjs-zoom-in-button-label = Pietuvināt
pdfjs-zoom-select =
    .title = Palielinājums
pdfjs-presentation-mode-button =
    .title = Pārslēgties uz Prezentācijas režīmu
pdfjs-presentation-mode-button-label = Prezentācijas režīms
pdfjs-open-file-button =
    .title = Atvērt failu
pdfjs-open-file-button-label = Atvērt
pdfjs-print-button =
    .title = Drukāšana
pdfjs-print-button-label = Drukāt

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Rīki
pdfjs-tools-button-label = Rīki
pdfjs-first-page-button =
    .title = Iet uz pirmo lapu
pdfjs-first-page-button-label = Iet uz pirmo lapu
pdfjs-last-page-button =
    .title = Iet uz pēdējo lapu
pdfjs-last-page-button-label = Iet uz pēdējo lapu
pdfjs-page-rotate-cw-button =
    .title = Pagriezt pa pulksteni
pdfjs-page-rotate-cw-button-label = Pagriezt pa pulksteni
pdfjs-page-rotate-ccw-button =
    .title = Pagriezt pret pulksteni
pdfjs-page-rotate-ccw-button-label = Pagriezt pret pulksteni
pdfjs-cursor-text-select-tool-button =
    .title = Aktivizēt teksta izvēles rīku
pdfjs-cursor-text-select-tool-button-label = Teksta izvēles rīks
pdfjs-cursor-hand-tool-button =
    .title = Aktivēt rokas rīku
pdfjs-cursor-hand-tool-button-label = Rokas rīks
pdfjs-scroll-vertical-button =
    .title = Izmantot vertikālo ritināšanu
pdfjs-scroll-vertical-button-label = Vertikālā ritināšana
pdfjs-scroll-horizontal-button =
    .title = Izmantot horizontālo ritināšanu
pdfjs-scroll-horizontal-button-label = Horizontālā ritināšana
pdfjs-scroll-wrapped-button =
    .title = Izmantot apkļauto ritināšanu
pdfjs-scroll-wrapped-button-label = Apkļautā ritināšana
pdfjs-spread-none-button =
    .title = Nepievienoties lapu izpletumiem
pdfjs-spread-none-button-label = Neizmantot izpletumus
pdfjs-spread-odd-button =
    .title = Izmantot lapu izpletumus sākot ar nepāra numuru lapām
pdfjs-spread-odd-button-label = Nepāra izpletumi
pdfjs-spread-even-button =
    .title = Izmantot lapu izpletumus sākot ar pāra numuru lapām
pdfjs-spread-even-button-label = Pāra izpletumi

## Document properties dialog

pdfjs-document-properties-button =
    .title = Dokumenta iestatījumi…
pdfjs-document-properties-button-label = Dokumenta iestatījumi…
pdfjs-document-properties-file-name = Faila nosaukums:
pdfjs-document-properties-file-size = Faila izmērs:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } biti)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } biti)
pdfjs-document-properties-title = Nosaukums:
pdfjs-document-properties-author = Autors:
pdfjs-document-properties-subject = Tēma:
pdfjs-document-properties-keywords = Atslēgas vārdi:
pdfjs-document-properties-creation-date = Izveides datums:
pdfjs-document-properties-modification-date = LAbošanas datums:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Radītājs:
pdfjs-document-properties-producer = PDF producents:
pdfjs-document-properties-version = PDF versija:
pdfjs-document-properties-page-count = Lapu skaits:
pdfjs-document-properties-page-size = Papīra izmērs:
pdfjs-document-properties-page-size-unit-inches = collas
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = portretorientācija
pdfjs-document-properties-page-size-orientation-landscape = ainavorientācija
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Vēstule
pdfjs-document-properties-page-size-name-legal = Juridiskie teksti

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
pdfjs-document-properties-linearized = Ātrā tīmekļa skats:
pdfjs-document-properties-linearized-yes = Jā
pdfjs-document-properties-linearized-no = Nē
pdfjs-document-properties-close-button = Aizvērt

## Print

pdfjs-print-progress-message = Gatavo dokumentu drukāšanai...
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Atcelt
pdfjs-printing-not-supported = Uzmanību: Drukāšana no šī pārlūka darbojas tikai daļēji.
pdfjs-printing-not-ready = Uzmanību: PDF nav pilnībā ielādēts drukāšanai.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Pārslēgt sānu joslu
pdfjs-toggle-sidebar-button-label = Pārslēgt sānu joslu
pdfjs-document-outline-button =
    .title = Rādīt dokumenta struktūru (veiciet dubultklikšķi lai izvērstu/sakļautu visus vienumus)
pdfjs-document-outline-button-label = Dokumenta saturs
pdfjs-attachments-button =
    .title = Rādīt pielikumus
pdfjs-attachments-button-label = Pielikumi
pdfjs-thumbs-button =
    .title = Parādīt sīktēlus
pdfjs-thumbs-button-label = Sīktēli
pdfjs-findbar-button =
    .title = Meklēt dokumentā
pdfjs-findbar-button-label = Meklēt

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Lapa { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Lapas { $page } sīktēls

## Find panel button title and messages

pdfjs-find-input =
    .title = Meklēt
    .placeholder = Meklēt dokumentā…
pdfjs-find-previous-button =
    .title = Atrast iepriekšējo
pdfjs-find-previous-button-label = Iepriekšējā
pdfjs-find-next-button =
    .title = Atrast nākamo
pdfjs-find-next-button-label = Nākamā
pdfjs-find-highlight-checkbox = Iekrāsot visas
pdfjs-find-match-case-checkbox-label = Lielo, mazo burtu jutīgs
pdfjs-find-entire-word-checkbox-label = Veselus vārdus
pdfjs-find-reached-top = Sasniegts dokumenta sākums, turpinām no beigām
pdfjs-find-reached-bottom = Sasniegtas dokumenta beigas, turpinām no sākuma
pdfjs-find-not-found = Frāze nav atrasta

## Predefined zoom values

pdfjs-page-scale-width = Lapas platumā
pdfjs-page-scale-fit = Ietilpinot lapu
pdfjs-page-scale-auto = Automātiskais izmērs
pdfjs-page-scale-actual = Patiesais izmērs
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Ielādējot PDF notika kļūda.
pdfjs-invalid-file-error = Nederīgs vai bojāts PDF fails.
pdfjs-missing-file-error = PDF fails nav atrasts.
pdfjs-unexpected-response-error = Negaidīa servera atbilde.
pdfjs-rendering-error = Attēlojot lapu radās kļūda

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } anotācija]

## Password

pdfjs-password-label = Ievadiet paroli, lai atvērtu PDF failu.
pdfjs-password-invalid = Nepareiza parole, mēģiniet vēlreiz.
pdfjs-password-ok-button = Labi
pdfjs-password-cancel-button = Atcelt
pdfjs-web-fonts-disabled = Tīmekļa fonti nav aktivizēti: Nevar iegult PDF fontus.

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
pdfjs-find-regexp-checkbox-label = Regular Expression