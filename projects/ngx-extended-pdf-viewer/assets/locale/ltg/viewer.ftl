# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Īprīkšejā lopa
pdfjs-previous-button-label = Īprīkšejā
pdfjs-next-button =
    .title = Nuokomuo lopa
pdfjs-next-button-label = Nuokomuo
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Lopa
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = nu { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } nu { $pagesCount })
pdfjs-zoom-out-button =
    .title = Attuolynuot
pdfjs-zoom-out-button-label = Attuolynuot
pdfjs-zoom-in-button =
    .title = Pītuvynuot
pdfjs-zoom-in-button-label = Pītuvynuot
pdfjs-zoom-select =
    .title = Palelynuojums
pdfjs-presentation-mode-button =
    .title = Puorslēgtīs iz Prezentacejis režymu
pdfjs-presentation-mode-button-label = Prezentacejis režyms
pdfjs-open-file-button =
    .title = Attaiseit failu
pdfjs-open-file-button-label = Attaiseit
pdfjs-print-button =
    .title = Drukuošona
pdfjs-print-button-label = Drukōt

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Reiki
pdfjs-tools-button-label = Reiki
pdfjs-first-page-button =
    .title = Īt iz pyrmū lopu
pdfjs-first-page-button-label = Īt iz pyrmū lopu
pdfjs-last-page-button =
    .title = Īt iz piedejū lopu
pdfjs-last-page-button-label = Īt iz piedejū lopu
pdfjs-page-rotate-cw-button =
    .title = Pagrīzt pa pulksteni
pdfjs-page-rotate-cw-button-label = Pagrīzt pa pulksteni
pdfjs-page-rotate-ccw-button =
    .title = Pagrīzt pret pulksteni
pdfjs-page-rotate-ccw-button-label = Pagrīzt pret pulksteni
pdfjs-cursor-text-select-tool-button =
    .title = Aktivizēt teksta izvieles reiku
pdfjs-cursor-text-select-tool-button-label = Teksta izvieles reiks
pdfjs-cursor-hand-tool-button =
    .title = Aktivēt rūkys reiku
pdfjs-cursor-hand-tool-button-label = Rūkys reiks
pdfjs-scroll-vertical-button =
    .title = Izmontōt vertikalū ritinōšonu
pdfjs-scroll-vertical-button-label = Vertikalō ritinōšona
pdfjs-scroll-horizontal-button =
    .title = Izmontōt horizontalū ritinōšonu
pdfjs-scroll-horizontal-button-label = Horizontalō ritinōšona
pdfjs-scroll-wrapped-button =
    .title = Izmontōt mārūgojamū ritinōšonu
pdfjs-scroll-wrapped-button-label = Mārūgojamō ritinōšona
pdfjs-spread-none-button =
    .title = Naizmontōt lopu atvāruma režimu
pdfjs-spread-none-button-label = Bez atvārumim
pdfjs-spread-odd-button =
    .title = Izmontōt lopu atvārumus sōkut nu napōra numeru lopom
pdfjs-spread-odd-button-label = Napōra lopys pa kreisi
pdfjs-spread-even-button =
    .title = Izmontōt lopu atvārumus sōkut nu pōra numeru lopom
pdfjs-spread-even-button-label = Pōra lopys pa kreisi

## Document properties dialog

pdfjs-document-properties-button =
    .title = Dokumenta īstatiejumi…
pdfjs-document-properties-button-label = Dokumenta īstatiejumi…
pdfjs-document-properties-file-name = Faila nūsaukums:
pdfjs-document-properties-file-size = Faila izmārs:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } biti)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } biti)
pdfjs-document-properties-title = Nūsaukums:
pdfjs-document-properties-author = Autors:
pdfjs-document-properties-subject = Tema:
pdfjs-document-properties-keywords = Atslāgi vuordi:
pdfjs-document-properties-creation-date = Izveides datums:
pdfjs-document-properties-modification-date = lobuošonys datums:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Radeituojs:
pdfjs-document-properties-producer = PDF producents:
pdfjs-document-properties-version = PDF verseja:
pdfjs-document-properties-page-count = Lopu skaits:
pdfjs-document-properties-page-size = Lopas izmārs:
pdfjs-document-properties-page-size-unit-inches = collas
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = portreta orientaceja
pdfjs-document-properties-page-size-orientation-landscape = ainovys orientaceja
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
pdfjs-document-properties-linearized = Fast Web View:
pdfjs-document-properties-linearized-yes = Jā
pdfjs-document-properties-linearized-no = Nā
pdfjs-document-properties-close-button = Aiztaiseit

## Print

pdfjs-print-progress-message = Preparing document for printing…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Atceļt
pdfjs-printing-not-supported = Uzmaneibu: Drukuošona nu itei puorlūka dorbojās tikai daleji.
pdfjs-printing-not-ready = Uzmaneibu: PDF nav pilneibā īluodeits drukuošonai.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Puorslēgt suonu jūslu
pdfjs-toggle-sidebar-button-label = Puorslēgt suonu jūslu
pdfjs-document-outline-button =
    .title = Show Document Outline (double-click to expand/collapse all items)
pdfjs-document-outline-button-label = Dokumenta saturs
pdfjs-attachments-button =
    .title = Show Attachments
pdfjs-attachments-button-label = Attachments
pdfjs-thumbs-button =
    .title = Paruodeit seiktālus
pdfjs-thumbs-button-label = Seiktāli
pdfjs-findbar-button =
    .title = Mekleit dokumentā
pdfjs-findbar-button-label = Mekleit

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Lopa { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Lopys { $page } seiktāls

## Find panel button title and messages

pdfjs-find-input =
    .title = Mekleit
    .placeholder = Mekleit dokumentā…
pdfjs-find-previous-button =
    .title = Atrast īprīkšejū
pdfjs-find-previous-button-label = Īprīkšejā
pdfjs-find-next-button =
    .title = Atrast nuokamū
pdfjs-find-next-button-label = Nuokomuo
pdfjs-find-highlight-checkbox = Īkruosuot vysys
pdfjs-find-match-case-checkbox-label = Lelū, mozū burtu jiuteigs
pdfjs-find-reached-top = Sasnīgts dokumenta suokums, turpynojom nu beigom
pdfjs-find-reached-bottom = Sasnīgtys dokumenta beigys, turpynojom nu suokuma
pdfjs-find-not-found = Frāze nav atrosta

## Predefined zoom values

pdfjs-page-scale-width = Lopys plotumā
pdfjs-page-scale-fit = Ītylpynūt lopu
pdfjs-page-scale-auto = Automatiskais izmārs
pdfjs-page-scale-actual = Patīsais izmārs
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Īluodejūt PDF nūtyka klaida.
pdfjs-invalid-file-error = Nadereigs voi būjuots PDF fails.
pdfjs-missing-file-error = PDF fails nav atrosts.
pdfjs-unexpected-response-error = Unexpected server response.
pdfjs-rendering-error = Attālojūt lopu rodās klaida

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } Annotation]

## Password

pdfjs-password-label = Īvodit paroli, kab attaiseitu PDF failu.
pdfjs-password-invalid = Napareiza parole, raugit vēļreiz.
pdfjs-password-ok-button = Labi
pdfjs-password-cancel-button = Atceļt
pdfjs-web-fonts-disabled = Šķārsteikla fonti nav aktivizāti: Navar īgult PDF fontus.

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
pdfjs-find-entire-word-checkbox-label = Whole Words
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
pdfjs-find-multiple-checkbox-label = match each word
pdfjs-find-regexp-checkbox-label = regular expression