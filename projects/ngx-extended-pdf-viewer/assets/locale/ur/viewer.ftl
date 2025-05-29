# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = پچھلا صفحہ
pdfjs-previous-button-label = پچھلا
pdfjs-next-button =
    .title = اگلا صفحہ
pdfjs-next-button-label = آگے
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = صفحہ
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = { $pagesCount } کا
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } کا { $pagesCount })
pdfjs-zoom-out-button =
    .title = باہر زوم کریں
pdfjs-zoom-out-button-label = باہر زوم کریں
pdfjs-zoom-in-button =
    .title = اندر زوم کریں
pdfjs-zoom-in-button-label = اندر زوم کریں
pdfjs-zoom-select =
    .title = زوم
pdfjs-presentation-mode-button =
    .title = پیشکش موڈ میں چلے جائیں
pdfjs-presentation-mode-button-label = پیشکش موڈ
pdfjs-open-file-button =
    .title = مسل کھولیں
pdfjs-open-file-button-label = کھولیں
pdfjs-print-button =
    .title = چھاپیں
pdfjs-print-button-label = چھاپیں

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = آلات
pdfjs-tools-button-label = آلات
pdfjs-first-page-button =
    .title = پہلے صفحہ پر جائیں
pdfjs-first-page-button-label = پہلے صفحہ پر جائیں
pdfjs-last-page-button =
    .title = آخری صفحہ پر جائیں
pdfjs-last-page-button-label = آخری صفحہ پر جائیں
pdfjs-page-rotate-cw-button =
    .title = گھڑی وار گھمائیں
pdfjs-page-rotate-cw-button-label = گھڑی وار گھمائیں
pdfjs-page-rotate-ccw-button =
    .title = ضد گھڑی وار گھمائیں
pdfjs-page-rotate-ccw-button-label = ضد گھڑی وار گھمائیں
pdfjs-cursor-text-select-tool-button =
    .title = متن کے انتخاب کے ٹول کو فعال بناے
pdfjs-cursor-text-select-tool-button-label = متن کے انتخاب کا آلہ
pdfjs-cursor-hand-tool-button =
    .title = ہینڈ ٹول کو فعال بناییں
pdfjs-cursor-hand-tool-button-label = ہاتھ کا آلہ
pdfjs-scroll-vertical-button =
    .title = عمودی اسکرولنگ کا استعمال کریں
pdfjs-scroll-vertical-button-label = عمودی اسکرولنگ
pdfjs-scroll-horizontal-button =
    .title = افقی سکرولنگ کا استعمال کریں
pdfjs-scroll-horizontal-button-label = افقی سکرولنگ
pdfjs-spread-none-button =
    .title = صفحہ پھیلانے میں شامل نہ ہوں
pdfjs-spread-none-button-label = کوئی پھیلاؤ نہیں
pdfjs-spread-odd-button-label = تاک پھیلاؤ
pdfjs-spread-even-button-label = جفت پھیلاؤ

## Document properties dialog

pdfjs-document-properties-button =
    .title = دستاویز خواص…
pdfjs-document-properties-button-label = دستاویز خواص…
pdfjs-document-properties-file-name = نام مسل:
pdfjs-document-properties-file-size = مسل سائز:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } bytes)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } bytes)
pdfjs-document-properties-title = عنوان:
pdfjs-document-properties-author = تخلیق کار:
pdfjs-document-properties-subject = موضوع:
pdfjs-document-properties-keywords = کلیدی الفاظ:
pdfjs-document-properties-creation-date = تخلیق کی تاریخ:
pdfjs-document-properties-modification-date = ترمیم کی تاریخ:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }، { $time }
pdfjs-document-properties-creator = تخلیق کار:
pdfjs-document-properties-producer = PDF پیدا کار:
pdfjs-document-properties-version = PDF ورژن:
pdfjs-document-properties-page-count = صفحہ شمار:
pdfjs-document-properties-page-size = صفہ کی لمبائ:
pdfjs-document-properties-page-size-unit-inches = میں
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = عمودی انداز
pdfjs-document-properties-page-size-orientation-landscape = افقى انداز
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = خط
pdfjs-document-properties-page-size-name-legal = قانونی

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } { $name } { $orientation }

##

# The linearization status of the document; usually called "Fast Web View" in
# English locales of Adobe software.
pdfjs-document-properties-linearized = تیز ویب دیکھیں:
pdfjs-document-properties-linearized-yes = ہاں
pdfjs-document-properties-linearized-no = نہیں
pdfjs-document-properties-close-button = بند کریں

## Print

pdfjs-print-progress-message = چھاپنے کرنے کے لیے دستاویز تیار کیے جا رھے ھیں
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = *{ $progress }%*
pdfjs-print-progress-close-button = منسوخ کریں
pdfjs-printing-not-supported = تنبیہ:چھاپنا اس براؤزر پر پوری طرح معاونت شدہ نہیں ہے۔
pdfjs-printing-not-ready = تنبیہ: PDF چھپائی کے لیے پوری طرح لوڈ نہیں ہوئی۔

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = سلائیڈ ٹوگل کریں
pdfjs-toggle-sidebar-button-label = سلائیڈ ٹوگل کریں
pdfjs-document-outline-button =
    .title = دستاویز کی سرخیاں دکھایں (تمام اشیاء وسیع / غائب کرنے کے لیے ڈبل کلک کریں)
pdfjs-document-outline-button-label = دستاویز آؤٹ لائن
pdfjs-attachments-button =
    .title = منسلکات دکھائیں
pdfjs-attachments-button-label = منسلکات
pdfjs-thumbs-button =
    .title = تھمبنیل دکھائیں
pdfjs-thumbs-button-label = مجمل
pdfjs-findbar-button =
    .title = دستاویز میں ڈھونڈیں
pdfjs-findbar-button-label = ڈھونڈیں

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = صفحہ { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = صفحے کا مجمل { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = ڈھونڈیں
    .placeholder = دستاویز… میں ڈھونڈیں
pdfjs-find-previous-button =
    .title = فقرے کا پچھلا وقوع ڈھونڈیں
pdfjs-find-previous-button-label = پچھلا
pdfjs-find-next-button =
    .title = فقرے کا اگلہ وقوع ڈھونڈیں
pdfjs-find-next-button-label = آگے
pdfjs-find-highlight-checkbox = تمام نمایاں کریں
pdfjs-find-match-case-checkbox-label = حروف مشابہ کریں
pdfjs-find-entire-word-checkbox-label = تمام الفاظ
pdfjs-find-reached-top = صفحہ کے شروع پر پہنچ گیا، نیچے سے جاری کیا
pdfjs-find-reached-bottom = صفحہ کے اختتام پر پہنچ گیا، اوپر سے جاری کیا
pdfjs-find-not-found = فقرا نہیں ملا

## Predefined zoom values

pdfjs-page-scale-width = صفحہ چوڑائی
pdfjs-page-scale-fit = صفحہ فٹنگ
pdfjs-page-scale-auto = خودکار زوم
pdfjs-page-scale-actual = اصل سائز
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = صفحہ { $page }

## Loading indicator messages

pdfjs-loading-error = PDF لوڈ کرتے وقت نقص آ گیا۔
pdfjs-invalid-file-error = ناجائز یا خراب PDF مسل
pdfjs-missing-file-error = PDF مسل غائب ہے۔
pdfjs-unexpected-response-error = غیرمتوقع پیش کار جواب
pdfjs-rendering-error = صفحہ بناتے ہوئے نقص آ گیا۔

## Annotations

# Variables:
#   $date (Date) - the modification date of the annotation
#   $time (Time) - the modification time of the annotation
pdfjs-annotation-date-string = { $date }.{ $time }
# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } نوٹ]

## Password

pdfjs-password-label = PDF مسل کھولنے کے لیے پاس ورڈ داخل کریں.
pdfjs-password-invalid = ناجائز پاس ورڈ. براےؑ کرم دوبارہ کوشش کریں.
pdfjs-password-ok-button = ٹھیک ہے
pdfjs-password-cancel-button = منسوخ کریں
pdfjs-web-fonts-disabled = ویب فانٹ نا اہل ہیں: شامل PDF فانٹ استعمال کرنے میں ناکام۔

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
pdfjs-scroll-wrapped-button =
    .title = Use Wrapped Scrolling
pdfjs-scroll-wrapped-button-label = Wrapped Scrolling
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