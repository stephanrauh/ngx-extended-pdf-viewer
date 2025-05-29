# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = आगोलनि बिलाइ
pdfjs-previous-button-label = आगोलनि
pdfjs-next-button =
    .title = उननि बिलाइ
pdfjs-next-button-label = उननि
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = बिलाइ
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = { $pagesCount } नि
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pagesCount } नि { $pageNumber })
pdfjs-zoom-out-button =
    .title = फिसायै जुम खालाम
pdfjs-zoom-out-button-label = फिसायै जुम खालाम
pdfjs-zoom-in-button =
    .title = गेदेरै जुम खालाम
pdfjs-zoom-in-button-label = गेदेरै जुम खालाम
pdfjs-zoom-select =
    .title = जुम खालाम
pdfjs-presentation-mode-button =
    .title = दिन्थिफुंनाय म'डआव थां
pdfjs-presentation-mode-button-label = दिन्थिफुंनाय म'ड
pdfjs-open-file-button =
    .title = फाइलखौ खेव
pdfjs-open-file-button-label = खेव
pdfjs-print-button =
    .title = साफाय
pdfjs-print-button-label = साफाय

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = टुल
pdfjs-tools-button-label = टुल
pdfjs-first-page-button =
    .title = गिबि बिलाइआव थां
pdfjs-first-page-button-label = गिबि बिलाइआव थां
pdfjs-last-page-button =
    .title = जोबथा बिलाइआव थां
pdfjs-last-page-button-label = जोबथा बिलाइआव थां
pdfjs-page-rotate-cw-button =
    .title = घरि गिदिंनाय फार्से फिदिं
pdfjs-page-rotate-cw-button-label = घरि गिदिंनाय फार्से फिदिं
pdfjs-page-rotate-ccw-button =
    .title = घरि गिदिंनाय उल्था फार्से फिदिं
pdfjs-page-rotate-ccw-button-label = घरि गिदिंनाय उल्था फार्से फिदिं

## Document properties dialog

pdfjs-document-properties-button =
    .title = फोरमान बिलाइनि आखुथाय...
pdfjs-document-properties-button-label = फोरमान बिलाइनि आखुथाय...
pdfjs-document-properties-file-name = फाइलनि मुं:
pdfjs-document-properties-file-size = फाइलनि महर:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } बाइट)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } बाइट)
pdfjs-document-properties-title = बिमुं:
pdfjs-document-properties-author = लिरगिरि:
pdfjs-document-properties-subject = आयदा:
pdfjs-document-properties-keywords = गाहाय सोदोब:
pdfjs-document-properties-creation-date = सोरजिनाय अक्ट':
pdfjs-document-properties-modification-date = सुद्रायनाय अक्ट':
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = सोरजिग्रा:
pdfjs-document-properties-producer = PDF दिहुनग्रा:
pdfjs-document-properties-version = PDF बिसान:
pdfjs-document-properties-page-count = बिलाइनि हिसाब:
pdfjs-document-properties-page-size-unit-inches = in
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = प'र्ट्रेट
pdfjs-document-properties-page-size-orientation-landscape = लेण्डस्केप
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = लायजाम

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })

##

pdfjs-document-properties-linearized-yes = नंगौ
pdfjs-document-properties-linearized-no = नङा
pdfjs-document-properties-close-button = बन्द खालाम

## Print

# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = नेवसि
pdfjs-printing-not-supported = सांग्रांथि: साफायनाया बे ब्राउजारजों आबुङै हेफाजाब होजाया।
pdfjs-printing-not-ready = सांग्रांथि: PDF खौ साफायनायनि थाखाय फुरायै ल'ड खालामाखै।

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = टग्गल साइडबार
pdfjs-toggle-sidebar-button-label = टग्गल साइडबार
pdfjs-document-outline-button-label = फोरमान बिलाइ सिमा हांखो
pdfjs-attachments-button =
    .title = नांजाब होनायखौ दिन्थि
pdfjs-attachments-button-label = नांजाब होनाय
pdfjs-thumbs-button =
    .title = थामनेइलखौ दिन्थि
pdfjs-thumbs-button-label = थामनेइल
pdfjs-findbar-button =
    .title = फोरमान बिलाइआव नागिरना दिहुन
pdfjs-findbar-button-label = नायगिरना दिहुन

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = बिलाइ { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = बिलाइ { $page } नि थामनेइल

## Find panel button title and messages

pdfjs-find-input =
    .title = नायगिरना दिहुन
    .placeholder = फोरमान बिलाइआव नागिरना दिहुन...
pdfjs-find-previous-button =
    .title = बाथ्रा खोन्दोबनि सिगांनि नुजाथिनायखौ नागिर
pdfjs-find-previous-button-label = आगोलनि
pdfjs-find-next-button =
    .title = बाथ्रा खोन्दोबनि उननि नुजाथिनायखौ नागिर
pdfjs-find-next-button-label = उननि
pdfjs-find-highlight-checkbox = गासैखौबो हाइलाइट खालाम
pdfjs-find-match-case-checkbox-label = गोरोबनाय केस
pdfjs-find-reached-top = थालो निफ्राय जागायनानै फोरमान बिलाइनि बिजौआव सौहैबाय
pdfjs-find-reached-bottom = बिजौ निफ्राय जागायनानै फोरमान बिलाइनि बिजौआव सौहैबाय
pdfjs-find-not-found = बाथ्रा खोन्दोब मोनाखै

## Predefined zoom values

pdfjs-page-scale-width = बिलाइनि गुवार
pdfjs-page-scale-fit = बिलाइ गोरोबनाय
pdfjs-page-scale-auto = गावनोगाव जुम
pdfjs-page-scale-actual = थार महर
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = PDF ल'ड खालामनाय समाव मोनसे गोरोन्थि जाबाय।
pdfjs-invalid-file-error = बाहायजायै एबा गाज्रि जानाय PDF फाइल
pdfjs-missing-file-error = गोमानाय PDF फाइल
pdfjs-unexpected-response-error = मिजिंथियै सार्भार फिननाय।
pdfjs-rendering-error = बिलाइखौ राव सोलायनाय समाव मोनसे गोरोन्थि जादों।

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
    .alt = [{ $type } सोदोब बेखेवनाय]

## Password

pdfjs-password-label = बे PDF फाइलखौ खेवनो पासवार्ड हाबहो।
pdfjs-password-invalid = बाहायजायै पासवार्ड। अननानै फिन नाजा।
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = नेवसि
pdfjs-web-fonts-disabled = वेब फन्टखौ लोरबां खालामबाय: अरजाबहोनाय PDF फन्टखौ बाहायनो हायाखै।

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
pdfjs-cursor-text-select-tool-button =
    .title = Enable Text Selection Tool
pdfjs-cursor-text-select-tool-button-label = Text Selection Tool
pdfjs-cursor-hand-tool-button =
    .title = Enable Hand Tool
pdfjs-cursor-hand-tool-button-label = Hand Tool
pdfjs-scroll-page-button =
    .title = Use Page Scrolling
pdfjs-scroll-page-button-label = Page Scrolling
pdfjs-scroll-vertical-button =
    .title = Use Vertical Scrolling
pdfjs-scroll-vertical-button-label = Vertical Scrolling
pdfjs-scroll-horizontal-button =
    .title = Use Horizontal Scrolling
pdfjs-scroll-horizontal-button-label = Horizontal Scrolling
pdfjs-scroll-wrapped-button =
    .title = Use Wrapped Scrolling
pdfjs-scroll-wrapped-button-label = Wrapped Scrolling
pdfjs-spread-none-button =
    .title = Do not join page spreads
pdfjs-spread-none-button-label = No Spreads
pdfjs-spread-odd-button =
    .title = Join page spreads starting with odd-numbered pages
pdfjs-spread-odd-button-label = Odd Spreads
pdfjs-spread-even-button =
    .title = Join page spreads starting with even-numbered pages
pdfjs-spread-even-button-label = Even Spreads
pdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } KB ({ $b } bytes)
pdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } MB ({ $b } bytes)
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-document-properties-page-size-name-legal = Legal
pdfjs-print-progress-message = Preparing document for printing…
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
pdfjs-find-multiple-checkbox-label = Match Each Word
pdfjs-find-regexp-checkbox-label = Regular Expression