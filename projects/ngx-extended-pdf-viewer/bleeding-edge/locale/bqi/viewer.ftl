# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = بلگه دیندایی
pdfjs-previous-button-label = دیندایی
pdfjs-next-button =
    .title = بلگه نیایی
pdfjs-next-button-label = بئڌی
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = بلگه
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = ز { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } ز { $pagesCount })
pdfjs-zoom-out-button =
    .title = کۊچیر نمایی
pdfjs-zoom-out-button-label = کۊچیر نمایی
pdfjs-zoom-in-button =
    .title = گپ نمایی
pdfjs-zoom-in-button-label = گپ نمایی
pdfjs-zoom-select =
    .title = زۊم کردن
pdfjs-open-file-button =
    .title = گۊشیڌن فایل
pdfjs-open-file-button-label = گۊشیڌن
pdfjs-print-button =
    .title = چاپ
pdfjs-print-button-label = چاپ
pdfjs-save-button =
    .title = زفت
pdfjs-save-button-label = زفت
# Used in Firefox for Android as a tooltip for the download button (“download” is a verb).
pdfjs-download-button =
    .title = دانلود
# Used in Firefox for Android as a label for the download button (“download” is a verb).
# Length of the translation matters since we are in a mobile context, with limited screen estate.
pdfjs-download-button-label = دانلود
pdfjs-bookmark-button-label = بلگه هیم سکویی

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = ٱوزارا
pdfjs-tools-button-label = ٱوزارا
pdfjs-first-page-button =
    .title = رئڌن و بلگه نیایی
pdfjs-first-page-button-label = رئڌن و بلگه نیایی
pdfjs-last-page-button =
    .title = رئڌن و بلگه دیندایی
pdfjs-last-page-button-label = رئڌن و بلگه دیندایی
pdfjs-page-rotate-cw-button =
    .title = لر خردن ساعتگرد
pdfjs-page-rotate-cw-button-label = لر خردن ساعتگرد
pdfjs-page-rotate-ccw-button =
    .title = لر خردن خلاف ساعتگرد
pdfjs-page-rotate-ccw-button-label = لر خردن خلاف ساعتگرد
pdfjs-cursor-text-select-tool-button =
    .title = فعال کردن ٱوزار پسند هؽل
pdfjs-cursor-text-select-tool-button-label = ٱوزار پسند هؽل
pdfjs-cursor-hand-tool-button =
    .title = فعال کردن ٱوزار دست
pdfjs-cursor-hand-tool-button-label = ٱوزار دست
pdfjs-scroll-page-button =
    .title = و کار گرؽڌن اسکرۊل بلگه
pdfjs-scroll-page-button-label = اسکرۊل بلگه
pdfjs-scroll-vertical-button =
    .title = و کار گرؽڌن اسکرۊل عمۊدی
pdfjs-scroll-vertical-button-label = اسکرۊل عمۊدی
pdfjs-scroll-horizontal-button =
    .title = و کار گرؽڌن اسکرۊل اوفوقی
pdfjs-scroll-horizontal-button-label = اسکرۊل اوفوقی
pdfjs-scroll-wrapped-button =
    .title = و کار گرؽڌن اسکرۊل پؽچسته
pdfjs-scroll-wrapped-button-label = اسکرۊل پؽچسته

## Document properties dialog

pdfjs-document-properties-button =
    .title = خۊسۊسیات سند…
pdfjs-document-properties-button-label = خۊسۊسیات سند…
pdfjs-document-properties-file-name = نوم فایل:
pdfjs-document-properties-file-size = هندا فایل:
pdfjs-document-properties-title = عونوان:
pdfjs-document-properties-author = هؽل کوݩ:
pdfjs-document-properties-subject = سرتال:
pdfjs-document-properties-creation-date = تاریخ وورکل وابیڌن:
pdfjs-document-properties-modification-date = تاریخ آلشتکاری:
# Variables:
#   $dateObj (Date) - the creation/modification date and time of the PDF file
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-document-properties-creator = وورکل کون:
pdfjs-document-properties-producer = وورکل کون PDF:
pdfjs-document-properties-version = نوسخه PDF:
pdfjs-document-properties-page-count = تئداد بلگه یل:
pdfjs-document-properties-page-size = هندا بلگه:
pdfjs-document-properties-page-size-unit-inches = اینچ
pdfjs-document-properties-page-size-unit-millimeters = میلی متر
pdfjs-document-properties-page-size-orientation-portrait = portrait
pdfjs-document-properties-page-size-orientation-landscape = landscape
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = نامه
pdfjs-document-properties-page-size-name-legal = هۊقۊقی

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
pdfjs-document-properties-linearized = نیشتن زل وب:
pdfjs-document-properties-linearized-yes = هری
pdfjs-document-properties-linearized-no = ن
pdfjs-document-properties-close-button = بستن

## Print

pdfjs-print-progress-message = ٱماڌه کردن سند سی چاپ کردن…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = لقو

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = آلشت هالت نوار کلی
pdfjs-toggle-sidebar-button-label = آلشت هالت نوار کلی
pdfjs-document-outline-button-label = تئر سند
pdfjs-attachments-button =
    .title = نشووݩ داڌن پیوستا
pdfjs-attachments-button-label = پیوستا
pdfjs-layers-button-label = لایه یل
pdfjs-thumbs-button =
    .title = نشووݩ داڌن شؽواتا کۊچیر
pdfjs-thumbs-button-label = شؽواتا کۊچیر
pdfjs-findbar-button =
    .title = جوستن من سند
pdfjs-findbar-button-label = جوستن
pdfjs-additional-layers = لایه یل ازافه

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = بلگه { $page }

## Find panel button title and messages

pdfjs-find-previous-button-label = دیندایی
pdfjs-find-next-button-label = بئڌی
pdfjs-find-highlight-checkbox = هایلایت کردن پوی

## Predefined zoom values

pdfjs-page-scale-width = پئنا بلگه
pdfjs-page-scale-fit = هندا کردن بلگه
pdfjs-page-scale-auto = زۊم کردن خوتکار
pdfjs-page-scale-actual = هندا واقعی‌
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = بلگه { $page }

## Annotations

# Variables:
#   $dateObj (Date) - the modification date and time of the annotation
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }

## Password

pdfjs-password-ok-button = خا
pdfjs-password-cancel-button = لقو

## Editing

pdfjs-editor-free-text-button =
    .title = هؽل
pdfjs-editor-free-text-button-label = هؽل
pdfjs-editor-ink-button =
    .title = کشیڌن
pdfjs-editor-ink-button-label = کشیڌن
pdfjs-editor-stamp-button =
    .title = ٱووردن یا آلشت شؽواتا
pdfjs-editor-stamp-button-label = ٱووردن یا آلشت شؽواتا

## Default editor aria labels

pdfjs-editor-stamp-editor =
    .aria-label = آلشتگر شؽوات

##

# Editor Parameters
pdfjs-editor-free-text-color-input = رنگ
pdfjs-editor-free-text-size-input = هندا
pdfjs-editor-ink-color-input = رنگ
pdfjs-editor-ink-thickness-input = کۊلۊفتی
pdfjs-editor-ink-opacity-input = کر بیڌن
# This refers to the thickness of the line used for free highlighting (not bound to text)
pdfjs-editor-free-highlight-thickness-input = کۊلۊفتی
# .default-content is used as a placeholder in an empty text editor.
pdfjs-free-text2 =
    .aria-label = آلشتگر هؽل
    .default-content = ناهاڌن پا هؽل کردن...
pdfjs-editor-comments-sidebar-no-comments-link = قلوه دووسته بۊین

## Alt-text dialog

pdfjs-editor-alt-text-cancel-button = لقو
pdfjs-editor-alt-text-save-button = زفت

## Color picker

pdfjs-editor-colorpicker-yellow =
    .title = هیل
pdfjs-editor-colorpicker-green =
    .title = ساوز
pdfjs-editor-colorpicker-blue =
    .title = کوۊ
pdfjs-editor-colorpicker-pink =
    .title = آل
pdfjs-editor-colorpicker-red =
    .title = سوئر

## Show all highlights
## This is a toggle button to show/hide all the highlights.

pdfjs-editor-highlight-show-all-button-label = نشووݩ داڌن پوی
pdfjs-editor-highlight-show-all-button =
    .title = نشووݩ داڌن پوی

## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.

pdfjs-editor-new-alt-text-disclaimer-learn-more-url = قلوه دووسته بۊین
pdfjs-editor-new-alt-text-not-now-button = سکو ن
pdfjs-editor-new-alt-text-error-close-button = بستن

## "Annotations removed" bar

pdfjs-editor-undo-bar-undo-button-label = وورگندن
pdfjs-editor-undo-bar-close-button =
    .title = بستن
pdfjs-editor-undo-bar-close-button-label = بستن

## Tab panels

pdfjs-editor-add-signature-draw-thickness-range-label = کۊلۊفتی

## Controls

pdfjs-editor-add-signature-error-close-button = بستن

## Dialog buttons

pdfjs-editor-add-signature-cancel-button = لقو
pdfjs-editor-add-signature-add-button = ٱووردن
pdfjs-editor-edit-signature-update-button = ورۊ رسۊوی

## Comment popup

pdfjs-editor-edit-comment-popup-button-label = آلشت منشڌ
pdfjs-editor-edit-comment-popup-button =
    .title = آلشت منشڌ

##  Edit a comment dialog

# An existing comment is edited
pdfjs-editor-edit-comment-dialog-title-when-editing = آلشت منشڌ
pdfjs-editor-edit-comment-dialog-save-button-when-editing = ورۊ رسۊوی
pdfjs-editor-edit-comment-dialog-save-button-when-adding = ٱووردن
pdfjs-editor-edit-comment-dialog-text-input =
    .placeholder = ناهاڌن پا هؽل کردن…
pdfjs-editor-edit-comment-dialog-cancel-button = لقو

## The view manager is a sidebar displaying different views:
##  - thumbnails;
##  - outline;
##  - attachments;
##  - layers.
## The thumbnails view is used to edit the pdf: remove/insert pages, ...

pdfjs-views-manager-sidebar =
    .aria-label = نوار کلی
pdfjs-views-manager-layers-option-label = لایه یل
pdfjs-views-manager-pages-status-action-button-label = دؽوۉداری
pdfjs-views-manager-pages-status-copy-button-label = لف گیری
pdfjs-views-manager-pages-status-cut-button-label = بۊریڌن
pdfjs-views-manager-pages-status-delete-button-label = پاک کردن
pdfjs-views-manager-status-undo-button-label = وورگندن
pdfjs-views-manager-status-done-button-label = ٱنجوم وابی
pdfjs-views-manager-status-close-button =
    .title = بستن
pdfjs-views-manager-status-close-button-label = بستن
pdfjs-views-manager-paste-button-label = جا وندن
# Badge used to promote a new feature in the UI, keep it as short as possible.
# It's spelled uppercase for English, but it can be translated as usual.
pdfjs-new-badge-content = نۊ

# Translations for ngx-extended-pdf-viewer additions only available in en-US
pdfjs-presentation-mode-button =
    .title = Switch to Presentation Mode
pdfjs-presentation-mode-button-label = Presentation Mode
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
pdfjs-document-properties-keywords = Keywords:
pdfjs-printing-not-supported = Warning: Printing is not fully supported by this browser.
pdfjs-printing-not-ready = Warning: The PDF is not fully loaded for printing.
pdfjs-current-outline-item-button =
    .title = Find Current Outline Item
pdfjs-current-outline-item-button-label = Current Outline Item
pdfjs-thumb-page-title1 =
    .title = Page { $page } of { $total }
pdfjs-thumb-page-canvas =
    .aria-label = Thumbnail of Page { $page }
pdfjs-thumb-page-checkbox1 =
    .title = Select page { $page }
pdfjs-find-input =
    .title = Find
    .placeholder = Find in document…
pdfjs-find-match-case-checkbox-label = Match Case
pdfjs-find-match-diacritics-checkbox-label = Match Diacritics
pdfjs-find-entire-word-checkbox-label = Whole Words
pdfjs-find-reached-top = Reached top of document, continued from bottom
pdfjs-find-reached-bottom = Reached end of document, continued from top
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
pdfjs-find-not-found = Phrase not found
pdfjs-loading-error = An error occurred while loading the PDF.
pdfjs-invalid-file-error = Invalid or corrupted PDF file.
pdfjs-missing-file-error = Missing PDF file.
pdfjs-unexpected-response-error = Unexpected server response.
pdfjs-rendering-error = An error occurred while rendering the page.
pdfjs-text-annotation-type =
    .alt = [{ $type } Annotation]
pdfjs-password-label = Enter the password to open this PDF file.
pdfjs-password-invalid = Invalid password. Please try again.
pdfjs-web-fonts-disabled = Web fonts are disabled: unable to use embedded PDF fonts.
pdfjs-editor-color-picker-free-text-input =
    .title = Change text color
pdfjs-editor-color-picker-ink-input =
    .title = Change drawing color
pdfjs-editor-eraser-button =
    .title = Erase
pdfjs-editor-eraser-button-label = Erase
pdfjs-editor-highlight-button =
    .title = Highlight
pdfjs-editor-highlight-button-label = Highlight
pdfjs-highlight-floating-button1 =
    .title = Highlight
    .aria-label = Highlight
pdfjs-highlight-floating-button-label = Highlight
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
pdfjs-editor-eraser-editor =
    .aria-label = Eraser
pdfjs-editor-signature-editor1 =
    .aria-description = Signature editor: { $description }
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
pdfjs-editor-stamp-add-image-button =
    .title = Add image
pdfjs-editor-stamp-add-image-button-label = Add image
pdfjs-editor-free-highlight-thickness-title =
    .title = Change thickness when highlighting items other than text
pdfjs-editor-add-signature-container =
    .aria-label = Signature controls and saved signatures
pdfjs-editor-signature-add-signature-button =
    .title = Add new signature
pdfjs-editor-signature-add-signature-button-label = Add new signature
pdfjs-editor-add-saved-signature-button =
    .title = Saved signature: { $description }
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
pdfjs-editor-new-alt-text-dialog-edit-label = Edit alt text (image description)
pdfjs-editor-new-alt-text-dialog-add-label = Add alt text (image description)
pdfjs-editor-new-alt-text-textarea =
    .placeholder = Write your description here…
pdfjs-editor-new-alt-text-description = Short description for people who can’t see the image or when the image doesn’t load.
pdfjs-editor-new-alt-text-disclaimer1 = This alt text was created automatically and may be inaccurate.
pdfjs-editor-new-alt-text-create-automatically-button-label = Create alt text automatically
pdfjs-editor-new-alt-text-error-title = Couldn’t create alt text automatically
pdfjs-editor-new-alt-text-error-description = Please write your own alt text or try again later.
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
pdfjs-editor-undo-button =
    .title = Undo
pdfjs-editor-undo-button-label = Undo
pdfjs-editor-redo-button =
    .title = Redo
pdfjs-editor-redo-button-label = Redo
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
pdfjs-editor-delete-signature-button1 =
    .title = Remove saved signature
pdfjs-editor-delete-signature-button-label1 = Remove saved signature
pdfjs-editor-add-signature-edit-button-label = Edit description
pdfjs-editor-edit-signature-dialog-title = Edit description
pdfjs-show-comment-button =
    .title = Show comment
pdfjs-editor-delete-comment-popup-button-label = Remove comment
pdfjs-editor-delete-comment-popup-button =
    .title = Remove comment
pdfjs-editor-edit-comment-dialog-title-when-adding = Add comment
pdfjs-editor-add-comment-button =
    .title = Add comment
pdfjs-toggle-views-manager-button1 =
    .title = Manage pages
pdfjs-toggle-views-manager-notification-button =
    .title = Toggle Sidebar (document contains thumbnails/outline/attachments/layers)
pdfjs-toggle-views-manager-button1-label = Manage pages
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
pdfjs-views-manager-add-file-button =
    .title = Add file
pdfjs-views-manager-add-file-button-label = Add file
pdfjs-views-manager-pages-status-action-label =
    { $count ->
        [one] { $count } selected
        *[other] { $count } selected
    }
pdfjs-views-manager-pages-status-none-action-label = Select pages
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
pdfjs-views-manager-paste-button-before =
    .title = Paste before the first page
pdfjs-views-manager-paste-button-after =
    .title = Paste after page { $page }
pdfjs-views-manager-waiting-for-file = Uploading file…
pdfjs-digital-signature-properties-button =
    .title = Digital signature properties
    .aria-label = Digital signature properties
pdfjs-digital-signature-properties-button-label = Digital signature properties
pdfjs-digital-signature-properties-banner-verified = Document was signed with a valid digital signature
pdfjs-digital-signature-properties-banner-unknown =
    { $count ->
        [one] Document signed but { $count } digital signature could not be verified
       *[other] Document signed but { $count } digital signatures could not be verified
    }
pdfjs-digital-signature-properties-banner-untrusted =
    { $count ->
        [one] Document signed with { $count } certificate that is not trusted
       *[other] Document signed with { $count } certificates that are not trusted
    }
pdfjs-digital-signature-properties-banner-expired =
    { $count ->
        [one] Document signed with { $count } expired certificate
       *[other] Document signed with { $count } expired certificates
    }
pdfjs-digital-signature-properties-banner-invalid =
    { $count ->
        [one] Document has { $count } invalid digital signature
       *[other] Document has { $count } invalid digital signatures
    }
pdfjs-digital-signature-properties-banner-revoked =
    { $count ->
        [one] Document signed with { $count } revoked certificate
       *[other] Document signed with { $count } revoked certificates
    }
pdfjs-digital-signature-properties-status-verified = Status: Signature verified
pdfjs-digital-signature-properties-status-invalid = Status: Signature invalid
pdfjs-digital-signature-properties-status-unknown = Status: Unable to verify (unsupported)
pdfjs-digital-signature-properties-certificate-trusted = Certificate: Trusted ({ $issuer })
pdfjs-digital-signature-properties-certificate-unknown = Certificate: Unavailable
pdfjs-digital-signature-properties-certificate-untrusted = Certificate: Untrusted
pdfjs-digital-signature-properties-certificate-untrusted-unknown-issuer = Certificate: Unknown issuer ({ $issuer })
pdfjs-digital-signature-properties-certificate-untrusted-self-signed = Certificate: Self-signed ({ $issuer })
pdfjs-digital-signature-properties-certificate-untrusted-untrusted-issuer = Certificate: Untrusted issuer ({ $issuer })
pdfjs-digital-signature-properties-certificate-expired = Certificate: Expired
pdfjs-digital-signature-properties-certificate-expired-with-date = Certificate: Expired ({ DATETIME($dateObj, dateStyle: "medium") })
pdfjs-digital-signature-properties-certificate-revoked = Certificate: Revoked
pdfjs-digital-signature-properties-view-certificate = View certificate
pdfjs-digital-signature-properties-reason = Reason: { $reason }
pdfjs-digital-signature-properties-timestamp = Timestamp: { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-digital-signature-properties-sub-signatures =
    { $count ->
        [one] Sub-signature ({ $count })
       *[other] Sub-signatures ({ $count })
    }
unverified-signature-warning = This PDF file contains a digital signature. The PDF viewer can't verify if the signature is valid. Please download the file and open it in Acrobat Reader to verify the signature is valid.
pdfjs-infinite-scroll-button-label = Infinite scroll
pdfjs-find-multiple-checkbox-label = Match Each Word
pdfjs-find-regexp-checkbox-label = Regular Expression
pdfjs-editor-movePageUp-button =
    .title = Move Page Up
pdfjs-editor-movePageUp-button-label = Move Page Up
pdfjs-editor-movePageDown-button =
    .title = Move Page Down
pdfjs-editor-movePageDown-button-label = Move Page Down
pdfjs-cursor-page-flip-tool-button =
    .title = Page Flip
pdfjs-cursor-page-flip-tool-button-label = Page Flip
# Translations for ngx-extended-pdf-viewer additions only available in en-US
pdfjs-loading-error-more-info = More Information
pdfjs-loading-error-less-info = Less Information
pdfjs-loading-error-close = Close