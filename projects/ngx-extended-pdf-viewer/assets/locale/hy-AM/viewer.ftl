# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Նախորդ էջը
pdfjs-previous-button-label = Նախորդը
pdfjs-next-button =
    .title = Հաջորդ էջը
pdfjs-next-button-label = Հաջորդը
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Էջ.
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = -ը՝ { $pagesCount }-ից
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber }-ը { $pagesCount })-ից
pdfjs-zoom-out-button =
    .title = Փոքրացնել
pdfjs-zoom-out-button-label = Փոքրացնել
pdfjs-zoom-in-button =
    .title = Խոշորացնել
pdfjs-zoom-in-button-label = Խոշորացնել
pdfjs-zoom-select =
    .title = Դիտափոխում
pdfjs-presentation-mode-button =
    .title = Անցնել Ներկայացման եղանակին
pdfjs-presentation-mode-button-label = Ներկայացման եղանակ
pdfjs-open-file-button =
    .title = Բացել նիշք
pdfjs-open-file-button-label = Բացել
pdfjs-print-button =
    .title = Տպել
pdfjs-print-button-label = Տպել
# Used in Firefox for Android as a label for the download button (“download” is a verb).
# Length of the translation matters since we are in a mobile context, with limited screen estate.
pdfjs-download-button-label = Ներբեռնել
pdfjs-bookmark-button-label = Ընթացիկ էջ

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Գործիքներ
pdfjs-tools-button-label = Գործիքներ
pdfjs-first-page-button =
    .title = Անցնել առաջին էջին
pdfjs-first-page-button-label = Անցնել առաջին էջին
pdfjs-last-page-button =
    .title = Անցնել վերջին էջին
pdfjs-last-page-button-label = Անցնել վերջին էջին
pdfjs-page-rotate-cw-button =
    .title = Պտտել ըստ ժամացույցի սլաքի
pdfjs-page-rotate-cw-button-label = Պտտել ըստ ժամացույցի սլաքի
pdfjs-page-rotate-ccw-button =
    .title = Պտտել հակառակ ժամացույցի սլաքի
pdfjs-page-rotate-ccw-button-label = Պտտել հակառակ ժամացույցի սլաքի
pdfjs-cursor-text-select-tool-button =
    .title = Միացնել գրույթ ընտրելու գործիքը
pdfjs-cursor-text-select-tool-button-label = Գրույթը ընտրելու գործիք
pdfjs-cursor-hand-tool-button =
    .title = Միացնել Ձեռքի գործիքը
pdfjs-cursor-hand-tool-button-label = Ձեռքի գործիք
pdfjs-scroll-vertical-button =
    .title = Օգտագործել ուղղահայաց ոլորում
pdfjs-scroll-vertical-button-label = Ուղղահայաց ոլորում
pdfjs-scroll-horizontal-button =
    .title = Օգտագործել հորիզոնական ոլորում
pdfjs-scroll-horizontal-button-label = Հորիզոնական ոլորում
pdfjs-scroll-wrapped-button =
    .title = Օգտագործել փաթաթված ոլորում
pdfjs-scroll-wrapped-button-label = Փաթաթված ոլորում
pdfjs-spread-none-button =
    .title = Մի միացեք էջի վերածածկերին
pdfjs-spread-none-button-label = Չկա վերածածկեր
pdfjs-spread-odd-button =
    .title = Միացեք էջի վերածածկերին սկսելով՝ կենտ համարակալված էջերով
pdfjs-spread-odd-button-label = Կենտ վերածածկեր
pdfjs-spread-even-button =
    .title = Միացեք էջի վերածածկերին սկսելով՝ զույգ համարակալված էջերով
pdfjs-spread-even-button-label = Զույգ վերածածկեր

## Document properties dialog

pdfjs-document-properties-button =
    .title = Փաստաթղթի հատկությունները…
pdfjs-document-properties-button-label = Փաստաթղթի հատկությունները…
pdfjs-document-properties-file-name = Նիշքի անունը.
pdfjs-document-properties-file-size = Նիշք չափը.
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } ԿԲ ({ $size_b } բայթ)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } ՄԲ ({ $size_b } բայթ)
pdfjs-document-properties-title = Վերնագիր.
pdfjs-document-properties-author = Հեղինակ․
pdfjs-document-properties-subject = Վերնագիր.
pdfjs-document-properties-keywords = Հիմնաբառ.
pdfjs-document-properties-creation-date = Ստեղծելու ամսաթիվը.
pdfjs-document-properties-modification-date = Փոփոխելու ամսաթիվը.
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Ստեղծող.
pdfjs-document-properties-producer = PDF-ի հեղինակը.
pdfjs-document-properties-version = PDF-ի տարբերակը.
pdfjs-document-properties-page-count = Էջերի քանակը.
pdfjs-document-properties-page-size = Էջի չափը.
pdfjs-document-properties-page-size-unit-inches = ում
pdfjs-document-properties-page-size-unit-millimeters = մմ
pdfjs-document-properties-page-size-orientation-portrait = ուղղաձիգ
pdfjs-document-properties-page-size-orientation-landscape = հորիզոնական
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Նամակ
pdfjs-document-properties-page-size-name-legal = Օրինական

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
pdfjs-document-properties-linearized = Արագ վեբ դիտում․
pdfjs-document-properties-linearized-yes = Այո
pdfjs-document-properties-linearized-no = Ոչ
pdfjs-document-properties-close-button = Փակել

## Print

pdfjs-print-progress-message = Նախապատրաստում է փաստաթուղթը տպելուն...
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Չեղարկել
pdfjs-printing-not-supported = Զգուշացում. Տպելը ամբողջությամբ չի աջակցվում դիտարկիչի կողմից։
pdfjs-printing-not-ready = Զգուշացում. PDF-ը ամբողջությամբ չի բեռնավորվել տպելու համար:

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Բացել/Փակել Կողային վահանակը
pdfjs-toggle-sidebar-button-label = Բացել/Փակել Կողային վահանակը
pdfjs-document-outline-button =
    .title = Ցուցադրել փաստաթղթի ուրվագիծը (կրկնակի սեղմեք՝ միավորները ընդարձակելու/կոծկելու համար)
pdfjs-document-outline-button-label = Փաստաթղթի բովանդակությունը
pdfjs-attachments-button =
    .title = Ցուցադրել կցորդները
pdfjs-attachments-button-label = Կցորդներ
pdfjs-thumbs-button =
    .title = Ցուցադրել Մանրապատկերը
pdfjs-thumbs-button-label = Մանրապատկերը
pdfjs-findbar-button =
    .title = Գտնել փաստաթղթում
pdfjs-findbar-button-label = Որոնում

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Էջը { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Էջի մանրապատկերը { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Որոնում
    .placeholder = Գտնել փաստաթղթում...
pdfjs-find-previous-button =
    .title = Գտնել անրահայտության նախորդ հանդիպումը
pdfjs-find-previous-button-label = Նախորդը
pdfjs-find-next-button =
    .title = Գտիր արտահայտության հաջորդ հանդիպումը
pdfjs-find-next-button-label = Հաջորդը
pdfjs-find-highlight-checkbox = Գունանշել բոլորը
pdfjs-find-match-case-checkbox-label = Մեծ(փոքր)ատառ հաշվի առնել
pdfjs-find-entire-word-checkbox-label = Ամբողջ բառերը
pdfjs-find-reached-top = Հասել եք փաստաթղթի վերևին, կշարունակվի ներքևից
pdfjs-find-reached-bottom = Հասել եք փաստաթղթի վերջին, կշարունակվի վերևից
pdfjs-find-not-found = Արտահայտությունը չգտնվեց

## Predefined zoom values

pdfjs-page-scale-width = Էջի լայնքը
pdfjs-page-scale-fit = Ձգել էջը
pdfjs-page-scale-auto = Ինքնաշխատ
pdfjs-page-scale-actual = Իրական չափը
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Սխալ՝ PDF ֆայլը բացելիս։
pdfjs-invalid-file-error = Սխալ կամ վնասված PDF ֆայլ:
pdfjs-missing-file-error = PDF ֆայլը բացակայում է:
pdfjs-unexpected-response-error = Սպասարկիչի անսպասելի պատասխան:
pdfjs-rendering-error = Սխալ՝ էջը ստեղծելիս:

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
    .alt = [{ $type } Ծանոթություն]

## Password

pdfjs-password-label = Մուտքագրեք PDF-ի գաղտնաբառը:
pdfjs-password-invalid = Գաղտնաբառը սխալ է: Կրկին փորձեք:
pdfjs-password-ok-button = Լավ
pdfjs-password-cancel-button = Չեղարկել
pdfjs-web-fonts-disabled = Վեբ-տառատեսակները անջատված են. հնարավոր չէ օգտագործել ներկառուցված PDF տառատեսակները:

## Editing


## Remove button for the various kind of editor.


##

pdfjs-free-text-default-content = Սկսել մուտքագրումը…

## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.


## Color picker


## Show all highlights
## This is a toggle button to show/hide all the highlights.

pdfjs-editor-highlight-show-all-button-label = Ցուցադրել բոլորը
pdfjs-editor-highlight-show-all-button =
    .title = Ցուցադրել բոլորը

# Translations for ngx-extended-pdf-viewer additions only available in en-US
pdfjs-save-button =
    .title = Save
pdfjs-save-button-label = Save
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