# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Նախորդ էջ
pdfjs-previous-button-label = Նախորդը
pdfjs-next-button =
    .title = Յաջորդ էջ
pdfjs-next-button-label = Յաջորդը
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = էջ
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = { $pagesCount }-ից
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
    .title = Խոշորացում
pdfjs-presentation-mode-button =
    .title = Անցնել ներկայացման եղանակին
pdfjs-presentation-mode-button-label = Ներկայացման եղանակ
pdfjs-open-file-button =
    .title = Բացել նիշքը
pdfjs-open-file-button-label = Բացել
pdfjs-print-button =
    .title = Տպել
pdfjs-print-button-label = Տպել

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Գործիքներ
pdfjs-tools-button-label = Գործիքներ
pdfjs-first-page-button =
    .title = Գնալ դէպի առաջին էջ
pdfjs-first-page-button-label = Գնալ դէպի առաջին էջ
pdfjs-last-page-button =
    .title = Գնալ դէպի վերջին էջ
pdfjs-last-page-button-label = Գնալ դէպի վերջին էջ
pdfjs-page-rotate-cw-button =
    .title = Պտտել ժամացոյցի սլաքի ուղղութեամբ
pdfjs-page-rotate-cw-button-label = Պտտել ժամացոյցի սլաքի ուղղութեամբ
pdfjs-page-rotate-ccw-button =
    .title = Պտտել ժամացոյցի սլաքի հակառակ ուղղութեամբ
pdfjs-page-rotate-ccw-button-label = Պտտել ժամացոյցի սլաքի հակառակ ուղղութեամբ
pdfjs-cursor-text-select-tool-button =
    .title = Միացնել գրոյթ ընտրելու գործիքը
pdfjs-cursor-text-select-tool-button-label = Գրուածք ընտրելու գործիք
pdfjs-cursor-hand-tool-button =
    .title = Միացնել ձեռքի գործիքը
pdfjs-cursor-hand-tool-button-label = Ձեռքի գործիք
pdfjs-scroll-page-button =
    .title = Աւգտագործել էջի ոլորում
pdfjs-scroll-page-button-label = Էջի ոլորում
pdfjs-scroll-vertical-button =
    .title = Աւգտագործել ուղղահայեաց ոլորում
pdfjs-scroll-vertical-button-label = Ուղղահայեաց ոլորում
pdfjs-scroll-horizontal-button =
    .title = Աւգտագործել հորիզոնական ոլորում
pdfjs-scroll-horizontal-button-label = Հորիզոնական ոլորում
pdfjs-scroll-wrapped-button =
    .title = Աւգտագործել փաթաթուած ոլորում
pdfjs-scroll-wrapped-button-label = Փաթաթուած ոլորում
pdfjs-spread-none-button =
    .title = Մի միացէք էջի կոնտեքստում
pdfjs-spread-none-button-label = Չկայ կոնտեքստ
pdfjs-spread-odd-button =
    .title = Միացէք էջի կոնտեքստին սկսելով՝ կենտ համարակալուած էջերով
pdfjs-spread-odd-button-label = Տարաւրինակ կոնտեքստ
pdfjs-spread-even-button =
    .title = Միացէք էջի կոնտեքստին սկսելով՝ զոյգ համարակալուած էջերով
pdfjs-spread-even-button-label = Հաւասար վերածածկեր

## Document properties dialog

pdfjs-document-properties-button =
    .title = Փաստաթղթի հատկութիւնները…
pdfjs-document-properties-button-label = Փաստաթղթի յատկութիւնները…
pdfjs-document-properties-file-name = Նիշքի անունը․
pdfjs-document-properties-file-size = Նիշք չափը.
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } ԿԲ ({ $size_b } բայթ)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } ՄԲ ({ $size_b } բայթ)
pdfjs-document-properties-title = Վերնագիր
pdfjs-document-properties-author = Հեղինակ․
pdfjs-document-properties-subject = առարկայ
pdfjs-document-properties-keywords = Հիմնաբառեր
pdfjs-document-properties-creation-date = Ստեղծման ամսաթիւ
pdfjs-document-properties-modification-date = Փոփոխութեան ամսաթիւ.
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Ստեղծող
pdfjs-document-properties-producer = PDF-ի Արտադրողը.
pdfjs-document-properties-version = PDF-ի տարբերակը.
pdfjs-document-properties-page-count = Էջերի քանակը.
pdfjs-document-properties-page-size = Էջի չափը.
pdfjs-document-properties-page-size-unit-inches = ում
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = ուղղաձիգ
pdfjs-document-properties-page-size-orientation-landscape = հորիզոնական
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Նամակ
pdfjs-document-properties-page-size-name-legal = Աւրինական

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

pdfjs-print-progress-message = Նախապատրաստում է փաստաթուղթը տպելուն…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Չեղարկել
pdfjs-printing-not-supported = Զգուշացում. Տպելը ամբողջութեամբ չի աջակցուում զննարկիչի կողմից։
pdfjs-printing-not-ready = Զգուշացում. PDF֊ը ամբողջութեամբ չի բեռնաւորուել տպելու համար։

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Փոխարկել կողային վահանակը
pdfjs-toggle-sidebar-notification-button =
    .title = Փոխանջատել կողմնասիւնը (փաստաթուղթը պարունակում է ուրուագիծ/կցորդներ/շերտեր)
pdfjs-toggle-sidebar-button-label = Փոխարկել կողային վահանակը
pdfjs-document-outline-button =
    .title = Ցուցադրել փաստաթղթի ուրուագիծը (կրկնակի սեղմէք՝ միաւորները ընդարձակելու/կոծկելու համար)
pdfjs-document-outline-button-label = Փաստաթղթի ուրուագիծ
pdfjs-attachments-button =
    .title = Ցուցադրել կցորդները
pdfjs-attachments-button-label = Կցորդներ
pdfjs-layers-button =
    .title = Ցուցադրել շերտերը (կրկնահպել վերակայելու բոլոր շերտերը սկզբնադիր վիճակի)
pdfjs-layers-button-label = Շերտեր
pdfjs-thumbs-button =
    .title = Ցուցադրել մանրապատկերը
pdfjs-thumbs-button-label = Մանրապատկեր
pdfjs-current-outline-item-button =
    .title = Գտէք ընթացիկ գծագրման տարրը
pdfjs-current-outline-item-button-label = Ընթացիկ գծագրման տարր
pdfjs-findbar-button =
    .title = Գտնել փաստաթղթում
pdfjs-findbar-button-label = Որոնում
pdfjs-additional-layers = Լրացուցիչ շերտեր

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
    .placeholder = Գտնել փաստաթղթում…
pdfjs-find-previous-button =
    .title = Գտնել արտայայտութեան նախորդ արտայայտութիւնը
pdfjs-find-previous-button-label = Նախորդը
pdfjs-find-next-button =
    .title = Գտիր արտայայտութեան յաջորդ արտայայտութիւնը
pdfjs-find-next-button-label = Հաջորդը
pdfjs-find-highlight-checkbox = Գունանշել բոլորը
pdfjs-find-match-case-checkbox-label = Հաշուի առնել հանգամանքը
pdfjs-find-match-diacritics-checkbox-label = Հնչիւնատարբերիչ նշանների համապատասխանեցում
pdfjs-find-entire-word-checkbox-label = Ամբողջ բառերը
pdfjs-find-reached-top = Հասել եք փաստաթղթի վերեւին,շարունակել ներքեւից
pdfjs-find-reached-bottom = Հասել էք փաստաթղթի վերջին, շարունակել վերեւից
pdfjs-find-not-found = Արտայայտութիւնը չգտնուեց

## Predefined zoom values

pdfjs-page-scale-width = Էջի լայնութիւն
pdfjs-page-scale-fit = Հարմարեցնել էջը
pdfjs-page-scale-auto = Ինքնաշխատ խոշորացում
pdfjs-page-scale-actual = Իրական չափը
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = Էջ { $page }

## Loading indicator messages

pdfjs-loading-error = PDF նիշքը բացելիս սխալ է տեղի ունեցել։
pdfjs-invalid-file-error = Սխալ կամ վնասուած PDF նիշք։
pdfjs-missing-file-error = PDF նիշքը բացակաիւմ է։
pdfjs-unexpected-response-error = Սպասարկիչի անսպասելի պատասխան։
pdfjs-rendering-error = Սխալ է տեղի ունեցել էջի մեկնաբանման ժամանակ

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
    .alt = [{ $type } Ծանոթութիւն]

## Password

pdfjs-password-label = Մուտքագրէք  գաղտնաբառը այս PDF նիշքը բացելու համար
pdfjs-password-invalid = Գաղտնաբառը սխալ է: Կրկին փորձէք:
pdfjs-password-ok-button = Լաւ
pdfjs-password-cancel-button = Չեղարկել
pdfjs-web-fonts-disabled = Վեբ-տառատեսակները անջատուած են. հնարաւոր չէ աւգտագործել ներկառուցուած PDF տառատեսակները։

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