# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = ទំព័រ​មុន
pdfjs-previous-button-label = មុន
pdfjs-next-button =
    .title = ទំព័រ​បន្ទាប់
pdfjs-next-button-label = បន្ទាប់
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = ទំព័រ
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = នៃ { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } នៃ { $pagesCount })
pdfjs-zoom-out-button =
    .title = ​បង្រួម
pdfjs-zoom-out-button-label = ​បង្រួម
pdfjs-zoom-in-button =
    .title = ​ពង្រីក
pdfjs-zoom-in-button-label = ​ពង្រីក
pdfjs-zoom-select =
    .title = ពង្រីក
pdfjs-presentation-mode-button =
    .title = ប្ដូរ​ទៅ​របៀប​បទ​បង្ហាញ
pdfjs-presentation-mode-button-label = របៀប​បទ​បង្ហាញ
pdfjs-open-file-button =
    .title = បើក​ឯកសារ
pdfjs-open-file-button-label = បើក
pdfjs-print-button =
    .title = បោះពុម្ព
pdfjs-print-button-label = បោះពុម្ព

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = ឧបករណ៍
pdfjs-tools-button-label = ឧបករណ៍
pdfjs-first-page-button =
    .title = ទៅកាន់​ទំព័រ​ដំបូង​
pdfjs-first-page-button-label = ទៅកាន់​ទំព័រ​ដំបូង​
pdfjs-last-page-button =
    .title = ទៅកាន់​ទំព័រ​ចុងក្រោយ​
pdfjs-last-page-button-label = ទៅកាន់​ទំព័រ​ចុងក្រោយ
pdfjs-page-rotate-cw-button =
    .title = បង្វិល​ស្រប​ទ្រនិច​នាឡិកា
pdfjs-page-rotate-cw-button-label = បង្វិល​ស្រប​ទ្រនិច​នាឡិកា
pdfjs-page-rotate-ccw-button =
    .title = បង្វិល​ច្រាស​ទ្រនិច​នាឡិកា​​
pdfjs-page-rotate-ccw-button-label = បង្វិល​ច្រាស​ទ្រនិច​នាឡិកា​​
pdfjs-cursor-text-select-tool-button =
    .title = បើក​ឧបករណ៍​ជ្រើស​អត្ថបទ
pdfjs-cursor-text-select-tool-button-label = ឧបករណ៍​ជ្រើស​អត្ថបទ
pdfjs-cursor-hand-tool-button =
    .title = បើក​ឧបករណ៍​ដៃ
pdfjs-cursor-hand-tool-button-label = ឧបករណ៍​ដៃ

## Document properties dialog

pdfjs-document-properties-button =
    .title = លក្ខណ​សម្បត្តិ​ឯកសារ…
pdfjs-document-properties-button-label = លក្ខណ​សម្បត្តិ​ឯកសារ…
pdfjs-document-properties-file-name = ឈ្មោះ​ឯកសារ៖
pdfjs-document-properties-file-size = ទំហំ​ឯកសារ៖
pdfjs-document-properties-title = ចំណងជើង៖
pdfjs-document-properties-author = អ្នក​និពន្ធ៖
pdfjs-document-properties-subject = ប្រធានបទ៖
pdfjs-document-properties-keywords = ពាក្យ​គន្លឹះ៖
pdfjs-document-properties-creation-date = កាលបរិច្ឆេទ​បង្កើត៖
pdfjs-document-properties-modification-date = កាលបរិច្ឆេទ​កែប្រែ៖
pdfjs-document-properties-creator = អ្នក​បង្កើត៖
pdfjs-document-properties-producer = កម្មវិធី​បង្កើត PDF ៖
pdfjs-document-properties-version = កំណែ PDF ៖
pdfjs-document-properties-page-count = ចំនួន​ទំព័រ៖
pdfjs-document-properties-page-size-unit-inches = អ៊ីញ
pdfjs-document-properties-page-size-unit-millimeters = មម
pdfjs-document-properties-page-size-orientation-portrait = បញ្ឈរ
pdfjs-document-properties-page-size-orientation-landscape = ផ្តេក
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = សំបុត្រ

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })

##

pdfjs-document-properties-linearized-yes = បាទ/ចាស
pdfjs-document-properties-linearized-no = ទេ
pdfjs-document-properties-close-button = បិទ

## Print

pdfjs-print-progress-message = កំពុង​រៀបចំ​ឯកសារ​សម្រាប់​បោះពុម្ព…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = បោះបង់
pdfjs-printing-not-supported = ការ​ព្រមាន ៖ កា​រ​បោះពុម្ព​មិន​ត្រូវ​បាន​គាំទ្រ​ពេញលេញ​ដោយ​កម្មវិធី​រុករក​នេះ​ទេ ។
pdfjs-printing-not-ready = ព្រមាន៖ PDF មិន​ត្រូវ​បាន​ផ្ទុក​ទាំងស្រុង​ដើម្បី​បោះពុម្ព​ទេ។

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = បិទ/បើក​គ្រាប់​រំកិល
pdfjs-toggle-sidebar-button-label = បិទ/បើក​គ្រាប់​រំកិល
pdfjs-document-outline-button =
    .title = បង្ហាញ​គ្រោង​ឯកសារ (ចុច​ទ្វេ​ដង​ដើម្បី​ពង្រីក/បង្រួម​ធាតុ​ទាំងអស់)
pdfjs-document-outline-button-label = គ្រោង​ឯកសារ
pdfjs-attachments-button =
    .title = បង្ហាញ​ឯកសារ​ភ្ជាប់
pdfjs-attachments-button-label = ឯកសារ​ភ្ជាប់
pdfjs-thumbs-button =
    .title = បង្ហាញ​រូបភាព​តូចៗ
pdfjs-thumbs-button-label = រួបភាព​តូចៗ
pdfjs-findbar-button =
    .title = រក​នៅ​ក្នុង​ឯកសារ
pdfjs-findbar-button-label = រក

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = ទំព័រ { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = រូបភាព​តូច​របស់​ទំព័រ { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = រក
    .placeholder = រក​នៅ​ក្នុង​ឯកសារ...
pdfjs-find-previous-button =
    .title = រក​ពាក្យ ឬ​ឃ្លា​ដែល​បាន​ជួប​មុន
pdfjs-find-previous-button-label = មុន
pdfjs-find-next-button =
    .title = រក​ពាក្យ ឬ​ឃ្លា​ដែល​បាន​ជួប​បន្ទាប់
pdfjs-find-next-button-label = បន្ទាប់
pdfjs-find-highlight-checkbox = បន្លិច​ទាំងអស់
pdfjs-find-match-case-checkbox-label = ករណី​ដំណូច
pdfjs-find-reached-top = បាន​បន្ត​ពី​ខាង​ក្រោម ទៅ​ដល់​ខាង​​លើ​នៃ​ឯកសារ
pdfjs-find-reached-bottom = បាន​បន្ត​ពី​ខាងលើ ទៅដល់​ចុង​​នៃ​ឯកសារ
pdfjs-find-not-found = រក​មិន​ឃើញ​ពាក្យ ឬ​ឃ្លា

## Predefined zoom values

pdfjs-page-scale-width = ទទឹង​ទំព័រ
pdfjs-page-scale-fit = សម​ទំព័រ
pdfjs-page-scale-auto = ពង្រីក​ស្វ័យប្រវត្តិ
pdfjs-page-scale-actual = ទំហំ​ជាក់ស្ដែង
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## Loading indicator messages

pdfjs-loading-error = មាន​កំហុស​បាន​កើតឡើង​ពេល​កំពុង​ផ្ទុក PDF ។
pdfjs-invalid-file-error = ឯកសារ PDF ខូច ឬ​មិន​ត្រឹមត្រូវ ។
pdfjs-missing-file-error = បាត់​ឯកសារ PDF
pdfjs-unexpected-response-error = ការ​ឆ្លើយ​តម​ម៉ាស៊ីន​មេ​ដែល​មិន​បាន​រំពឹង។
pdfjs-rendering-error = មាន​កំហុស​បាន​កើតឡើង​ពេល​បង្ហាញ​ទំព័រ ។

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } ចំណារ​ពន្យល់]

## Password

pdfjs-password-label = បញ្ចូល​ពាក្យសម្ងាត់​ដើម្បី​បើក​ឯកសារ PDF នេះ។
pdfjs-password-invalid = ពាក្យសម្ងាត់​មិន​ត្រឹមត្រូវ។ សូម​ព្យាយាម​ម្ដងទៀត។
pdfjs-password-ok-button = យល់​ព្រម
pdfjs-password-cancel-button = បោះបង់
pdfjs-web-fonts-disabled = បាន​បិទ​ពុម្ពអក្សរ​បណ្ដាញ ៖ មិន​អាច​ប្រើ​ពុម្ពអក្សរ PDF ដែល​បាន​បង្កប់​បាន​ទេ ។

## Editing

pdfjs-editor-highlight-button =
    .title = រំលេច
pdfjs-editor-highlight-button-label = រំលេច
pdfjs-highlight-floating-button-label = រំលេច

## Alt-text dialog

pdfjs-editor-alt-text-cancel-button = បោះបង់

## Show all highlights
## This is a toggle button to show/hide all the highlights.

pdfjs-editor-highlight-show-all-button-label = បង្ហាញ​ទាំងអស់
pdfjs-editor-highlight-show-all-button =
    .title = បង្ហាញ​ទាំងអស់

## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.

pdfjs-editor-new-alt-text-not-now-button = មិន​មែន​ឥឡូវ

## Image alt-text settings

pdfjs-editor-alt-text-settings-delete-model-button = លុប

## Dialog buttons

pdfjs-editor-add-signature-cancel-button = បោះបង់

##  Edit a comment dialog

pdfjs-editor-edit-comment-dialog-cancel-button = បោះបង់

## The view manager is a sidebar displaying different views:
##  - thumbnails;
##  - outline;
##  - attachments;
##  - layers.
## The thumbnails view is used to edit the pdf: remove/insert pages, ...

pdfjs-views-manager-pages-status-delete-button-label = លុប

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
pdfjs-current-outline-item-button =
    .title = Find Current Outline Item
pdfjs-current-outline-item-button-label = Current Outline Item
pdfjs-additional-layers = Additional Layers
pdfjs-thumb-page-title1 =
    .title = Page { $page } of { $total }
pdfjs-thumb-page-checkbox1 =
    .title = Select page { $page }
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
pdfjs-editor-color-picker-free-text-input =
    .title = Change text color
pdfjs-editor-free-text-button-label = Text
pdfjs-editor-ink-button =
    .title = Draw
pdfjs-editor-color-picker-ink-input =
    .title = Change drawing color
pdfjs-editor-ink-button-label = Draw
pdfjs-editor-stamp-button =
    .title = Add or edit images
pdfjs-editor-stamp-button-label = Add or edit images
pdfjs-highlight-floating-button1 =
    .title = Highlight
    .aria-label = Highlight
pdfjs-comment-floating-button =
    .title = Comment
    .aria-label = Comment
pdfjs-comment-floating-button-label = Comment
pdfjs-editor-comment-button =
    .title = Comment
    .aria-label = Comment
pdfjs-editor-comment-button-label = Comment
pdfjs-editor-signature-button =
    .title = Add signature
pdfjs-editor-signature-button-label = Add signature
pdfjs-editor-highlight-editor =
    .aria-label = Highlight editor
pdfjs-editor-ink-editor =
    .aria-label = Drawing editor
pdfjs-editor-signature-editor1 =
    .aria-description = Signature editor: { $description }
pdfjs-editor-stamp-editor =
    .aria-label = Image editor
pdfjs-editor-remove-ink-button =
    .title = Remove drawing
pdfjs-editor-remove-freetext-button =
    .title = Remove text
pdfjs-editor-remove-stamp-button =
    .title = Remove image
pdfjs-editor-remove-highlight-button =
    .title = Remove highlight
pdfjs-editor-remove-signature-button =
    .title = Remove signature
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
pdfjs-editor-add-signature-container =
    .aria-label = Signature controls and saved signatures
pdfjs-editor-signature-add-signature-button =
    .title = Add new signature
pdfjs-editor-signature-add-signature-button-label = Add new signature
pdfjs-editor-add-saved-signature-button =
    .title = Saved signature: { $description }
pdfjs-free-text2 =
    .aria-label = Text Editor
    .default-content = Start typing…
pdfjs-editor-comments-sidebar-title =
    { $count ->
        [one] Comment
       *[other] Comments
    }
pdfjs-editor-comments-sidebar-close-button =
    .title = Close the sidebar
    .aria-label = Close the sidebar
pdfjs-editor-comments-sidebar-close-button-label = Close the sidebar
pdfjs-editor-comments-sidebar-no-comments1 = See something noteworthy? Highlight it and leave a comment.
pdfjs-editor-comments-sidebar-no-comments-link = Learn more
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
pdfjs-editor-alt-text-settings-editor-title = Alt text editor
pdfjs-editor-alt-text-settings-show-dialog-button-label = Show alt text editor right away when adding an image
pdfjs-editor-alt-text-settings-show-dialog-description = Helps you make sure all your images have alt text.
pdfjs-editor-alt-text-settings-close-button = Close
pdfjs-editor-highlight-added-alert = Highlight added
pdfjs-editor-freetext-added-alert = Text added
pdfjs-editor-ink-added-alert = Drawing added
pdfjs-editor-stamp-added-alert = Image added
pdfjs-editor-signature-added-alert = Signature added
pdfjs-editor-undo-bar-message-highlight = Highlight removed
pdfjs-editor-undo-bar-message-freetext = Text removed
pdfjs-editor-undo-bar-message-ink = Drawing removed
pdfjs-editor-undo-bar-message-stamp = Image removed
pdfjs-editor-undo-bar-message-signature = Signature removed
pdfjs-editor-undo-bar-message-comment = Comment removed
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
pdfjs-editor-add-signature-dialog-label = This modal allows the user to create a signature to add to a PDF document. The user can edit the name (which also serves as the alt text), and optionally save the signature for repeated use.
pdfjs-editor-add-signature-dialog-title = Add a signature
pdfjs-editor-add-signature-type-button = Type
    .title = Type
pdfjs-editor-add-signature-draw-button = Draw
    .title = Draw
pdfjs-editor-add-signature-image-button = Image
    .title = Image
pdfjs-editor-add-signature-type-input =
    .aria-label = Type your signature
    .placeholder = Type your signature
pdfjs-editor-add-signature-draw-placeholder = Draw your signature
pdfjs-editor-add-signature-draw-thickness-range-label = Thickness
pdfjs-editor-add-signature-draw-thickness-range =
    .title = Drawing thickness: { $thickness }
pdfjs-editor-add-signature-image-placeholder = Drag a file here to upload
pdfjs-editor-add-signature-image-browse-link =
    { PLATFORM() ->
        [macos] Or choose image files
       *[other] Or browse image files
    }
pdfjs-editor-add-signature-description-label = Description (alt text)
pdfjs-editor-add-signature-description-input =
    .title = Description (alt text)
pdfjs-editor-add-signature-description-default-when-drawing = Signature
pdfjs-editor-add-signature-clear-button-label = Clear signature
pdfjs-editor-add-signature-clear-button =
    .title = Clear signature
pdfjs-editor-add-signature-save-checkbox = Save signature
pdfjs-editor-add-signature-save-warning-message = You’ve reached the limit of 5 saved signatures. Remove one to save more.
pdfjs-editor-add-signature-image-upload-error-title = Couldn’t upload image
pdfjs-editor-add-signature-image-upload-error-description = Check your network connection or try another image.
pdfjs-editor-add-signature-image-no-data-error-title = Can’t convert this image into a signature
pdfjs-editor-add-signature-image-no-data-error-description = Please try uploading a different image.
pdfjs-editor-add-signature-error-close-button = Close
pdfjs-editor-add-signature-add-button = Add
pdfjs-editor-delete-signature-button1 =
    .title = Remove saved signature
pdfjs-editor-delete-signature-button-label1 = Remove saved signature
pdfjs-editor-add-signature-edit-button-label = Edit description
pdfjs-editor-edit-signature-dialog-title = Edit description
pdfjs-editor-edit-signature-update-button = Update
pdfjs-show-comment-button =
    .title = Show comment
pdfjs-editor-edit-comment-popup-button-label = Edit comment
pdfjs-editor-edit-comment-popup-button =
    .title = Edit comment
pdfjs-editor-delete-comment-popup-button-label = Remove comment
pdfjs-editor-delete-comment-popup-button =
    .title = Remove comment
pdfjs-editor-edit-comment-dialog-title-when-editing = Edit comment
pdfjs-editor-edit-comment-dialog-save-button-when-editing = Update
pdfjs-editor-edit-comment-dialog-title-when-adding = Add comment
pdfjs-editor-edit-comment-dialog-save-button-when-adding = Add
pdfjs-editor-edit-comment-dialog-text-input =
    .placeholder = Start typing…
pdfjs-editor-add-comment-button =
    .title = Add comment
pdfjs-toggle-views-manager-button1 =
    .title = Manage pages
pdfjs-toggle-views-manager-notification-button =
    .title = Toggle Sidebar (document contains thumbnails/outline/attachments/layers)
pdfjs-toggle-views-manager-button1-label = Manage pages
pdfjs-views-manager-sidebar =
    .aria-label = Sidebar
pdfjs-views-manager-sidebar-resizer =
    .aria-label = Sidebar resizer
pdfjs-views-manager-view-selector-button =
    .title = Views
pdfjs-views-manager-view-selector-button-label = Views
pdfjs-views-manager-pages-title = Pages
pdfjs-views-manager-outlines-title1 = Document outline
    .title = Document outline (double-click to expand/collapse all items)
pdfjs-views-manager-attachments-title = Attachments
pdfjs-views-manager-layers-title1 = Layers
    .title = Layers (double-click to reset all layers to the default state)
pdfjs-views-manager-pages-option-label = Pages
pdfjs-views-manager-outlines-option-label = Document outline
pdfjs-views-manager-attachments-option-label = Attachments
pdfjs-views-manager-layers-option-label = Layers
pdfjs-views-manager-add-file-button =
    .title = Add file
pdfjs-views-manager-add-file-button-label = Add file
pdfjs-views-manager-pages-status-action-label =
    { $count ->
        [one] { $count } selected
        *[other] { $count } selected
    }
pdfjs-views-manager-pages-status-none-action-label = Select pages
pdfjs-views-manager-pages-status-action-button-label = Manage
pdfjs-views-manager-pages-status-copy-button-label = Copy
pdfjs-views-manager-pages-status-cut-button-label = Cut
pdfjs-views-manager-pages-status-export-selected-button-label = Export selected…
pdfjs-views-manager-status-undo-cut-label =
    { $count ->
        [one] 1 page cut
        *[other] { $count } pages cut
    }
pdfjs-views-manager-pages-status-undo-copy-label =
    { $count ->
        [one] 1 page copied
        *[other] { $count } pages copied
    }
pdfjs-views-manager-pages-status-undo-delete-label =
    { $count ->
        [one] 1 page deleted
        *[other] { $count } pages deleted
    }
pdfjs-views-manager-pages-status-waiting-ready-label = Getting your file ready…
pdfjs-views-manager-pages-status-waiting-uploading-label = Uploading file…
pdfjs-views-manager-status-warning-cut-label = Couldn’t cut. Refresh page and try again.
pdfjs-views-manager-status-warning-copy-label = Couldn’t copy. Refresh page and try again.
pdfjs-views-manager-status-warning-delete-label = Couldn’t delete. Refresh page and try again.
pdfjs-views-manager-status-warning-save-label = Couldn’t save. Refresh page and try again.
pdfjs-views-manager-status-undo-button-label = Undo
pdfjs-views-manager-status-done-button-label = Done
pdfjs-views-manager-status-close-button =
    .title = Close
pdfjs-views-manager-status-close-button-label = Close
pdfjs-views-manager-paste-button-label = Paste
pdfjs-views-manager-paste-button-before =
    .title = Paste before the first page
pdfjs-views-manager-paste-button-after =
    .title = Paste after page { $page }
pdfjs-new-badge-content = NEW
unverified-signature-warning = This PDF file contains a digital signature. The PDF viewer can't verify if the signature is valid. Please download the file and open it in Acrobat Reader to verify the signature is valid.
pdfjs-infinite-scroll-button-label = Infinite scroll
pdfjs-find-multiple-checkbox-label = Match Each Word
pdfjs-find-regexp-checkbox-label = Regular Expression
pdfjs-editor-movePageUp-button = Move Page Up
pdfjs-editor-movePageUp-button-label = Move Page Up
pdfjs-editor-movePageDown-button = Move Page Down
pdfjs-editor-movePageDown-button-label = Move Page Down