# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Hello Ɓennungo
pdfjs-previous-button-label = Ɓennuɗo
pdfjs-next-button =
    .title = Hello faango
pdfjs-next-button-label = Yeeso
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Hello
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = e nder { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } of { $pagesCount })
pdfjs-zoom-out-button =
    .title = Lonngo Woɗɗa
pdfjs-zoom-out-button-label = Lonngo Woɗɗa
pdfjs-zoom-in-button =
    .title = Lonngo Ara
pdfjs-zoom-in-button-label = Lonngo Ara
pdfjs-zoom-select =
    .title = Lonngo
pdfjs-presentation-mode-button =
    .title = Faytu to  Presentation Mode
pdfjs-presentation-mode-button-label = Presentation Mode
pdfjs-open-file-button =
    .title = Uddit Fiilde
pdfjs-open-file-button-label = Uddit
pdfjs-print-button =
    .title = Winndito
pdfjs-print-button-label = Winndito

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Kuutorɗe
pdfjs-tools-button-label = Kuutorɗe
pdfjs-first-page-button =
    .title = Yah to hello adanngo
pdfjs-first-page-button-label = Yah to hello adanngo
pdfjs-last-page-button =
    .title = Yah to hello wattindiingo
pdfjs-last-page-button-label = Yah to hello wattindiingo
pdfjs-page-rotate-cw-button =
    .title = Yiiltu Faya Ñaamo
pdfjs-page-rotate-cw-button-label = Yiiltu Faya Ñaamo
pdfjs-page-rotate-ccw-button =
    .title = Yiiltu Faya Nano
pdfjs-page-rotate-ccw-button-label = Yiiltu Faya Nano
pdfjs-cursor-text-select-tool-button =
    .title = Gollin kaɓirgel cuɓirgel binndi
pdfjs-cursor-text-select-tool-button-label = Kaɓirgel cuɓirgel binndi
pdfjs-cursor-hand-tool-button =
    .title = Hurmin kuutorgal junngo
pdfjs-cursor-hand-tool-button-label = Kaɓirgel junngo
pdfjs-scroll-vertical-button =
    .title = Huutoro gorwitol daringol
pdfjs-scroll-vertical-button-label = Gorwitol daringol
pdfjs-scroll-horizontal-button =
    .title = Huutoro gorwitol lelingol
pdfjs-scroll-horizontal-button-label = Gorwitol daringol
pdfjs-scroll-wrapped-button =
    .title = Huutoro gorwitol coomingol
pdfjs-scroll-wrapped-button-label = Gorwitol coomingol
pdfjs-spread-none-button =
    .title = Hoto tawtu kelle kelle
pdfjs-spread-none-button-label = Alaa Spreads
pdfjs-spread-odd-button =
    .title = Tawtu kelle puɗɗortooɗe kelle teelɗe
pdfjs-spread-odd-button-label = Kelle teelɗe
pdfjs-spread-even-button =
    .title = Tawtu ɗereeji kelle puɗɗoriiɗi kelle teeltuɗe
pdfjs-spread-even-button-label = Kelle teeltuɗe

## Document properties dialog

pdfjs-document-properties-button =
    .title = Keeroraaɗi Winndannde…
pdfjs-document-properties-button-label = Keeroraaɗi Winndannde…
pdfjs-document-properties-file-name = Innde fiilde:
pdfjs-document-properties-file-size = Ɓetol fiilde:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } bite)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } bite)
pdfjs-document-properties-title = Tiitoonde:
pdfjs-document-properties-author = Binnduɗo:
pdfjs-document-properties-subject = Toɓɓere:
pdfjs-document-properties-keywords = Kelmekele jiytirɗe:
pdfjs-document-properties-creation-date = Ñalnde Sosaa:
pdfjs-document-properties-modification-date = Ñalnde Waylaa:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Cosɗo:
pdfjs-document-properties-producer = Paggiiɗo PDF:
pdfjs-document-properties-version = Yamre PDF:
pdfjs-document-properties-page-count = Limoore Kelle:
pdfjs-document-properties-page-size = Ɓeto Hello:
pdfjs-document-properties-page-size-unit-inches = nder
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = dariingo
pdfjs-document-properties-page-size-orientation-landscape = wertiingo
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Ɓataake
pdfjs-document-properties-page-size-name-legal = Laawol

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
pdfjs-document-properties-linearized = Ɗisngo geese yaawngo:
pdfjs-document-properties-linearized-yes = Eey
pdfjs-document-properties-linearized-no = Alaa
pdfjs-document-properties-close-button = Uddu

## Print

pdfjs-print-progress-message = Nana heboo winnditaade fiilannde…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Haaytu
pdfjs-printing-not-supported = Reentino: Winnditagol tammbitaaka no feewi e ndee wanngorde.
pdfjs-printing-not-ready = Reentino: PDF oo loowaaki haa timmi ngam winnditagol.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Toggilo Palal Sawndo
pdfjs-toggle-sidebar-button-label = Toggilo Palal Sawndo
pdfjs-document-outline-button =
    .title = Hollu Ƴiyal Fiilannde (dobdobo ngam wertude/taggude teme fof)
pdfjs-document-outline-button-label = Toɓɓe Fiilannde
pdfjs-attachments-button =
    .title = Hollu Ɗisanɗe
pdfjs-attachments-button-label = Ɗisanɗe
pdfjs-thumbs-button =
    .title = Hollu Dooɓe
pdfjs-thumbs-button-label = Dooɓe
pdfjs-findbar-button =
    .title = Yiylo e fiilannde
pdfjs-findbar-button-label = Yiytu

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Hello { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Dooɓre Hello { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Yiytu
    .placeholder = Yiylo nder dokimaa
pdfjs-find-previous-button =
    .title = Yiylo cilol ɓennugol konngol ngol
pdfjs-find-previous-button-label = Ɓennuɗo
pdfjs-find-next-button =
    .title = Yiylo cilol garowol konngol ngol
pdfjs-find-next-button-label = Yeeso
pdfjs-find-highlight-checkbox = Jalbin fof
pdfjs-find-match-case-checkbox-label = Jaaɓnu darnde
pdfjs-find-entire-word-checkbox-label = Kelme timmuɗe tan
pdfjs-find-reached-top = Heɓii fuɗɗorde fiilannde, jokku faya les
pdfjs-find-reached-bottom = Heɓii hoore fiilannde, jokku faya les
pdfjs-find-not-found = Konngi njiyataa

## Predefined zoom values

pdfjs-page-scale-width = Njaajeendi Hello
pdfjs-page-scale-fit = Keƴeendi Hello
pdfjs-page-scale-auto = Loongorde Jaajol
pdfjs-page-scale-actual = Ɓetol Jaati
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Juumre waɗii tuma nde loowata PDF oo.
pdfjs-invalid-file-error = Fiilde PDF moƴƴaani walla jiibii.
pdfjs-missing-file-error = Fiilde PDF ena ŋakki.
pdfjs-unexpected-response-error = Jaabtol sarworde tijjinooka.
pdfjs-rendering-error = Juumre waɗii tuma nde yoŋkittoo hello.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } Siiftannde]

## Password

pdfjs-password-label = Naatu finnde ngam uddite ndee fiilde PDF.
pdfjs-password-invalid = Finnde moƴƴaani. Tiiɗno eto kadi.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = Haaytu
pdfjs-web-fonts-disabled = Ponte geese ko daaƴaaɗe: horiima huutoraade ponte PDF coomtoraaɗe.

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
pdfjs-find-multiple-checkbox-label = match each word
pdfjs-find-regexp-checkbox-label = regular expression