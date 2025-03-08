# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = صفحهٔ قبلی
pdfjs-previous-button-label = قبلی
pdfjs-next-button =
    .title = صفحهٔ بعدی
pdfjs-next-button-label = بعدی
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = صفحه
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = از { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber }از { $pagesCount })
pdfjs-zoom-out-button =
    .title = کوچک‌نمایی
pdfjs-zoom-out-button-label = کوچک‌نمایی
pdfjs-zoom-in-button =
    .title = بزرگ‌نمایی
pdfjs-zoom-in-button-label = بزرگ‌نمایی
pdfjs-zoom-select =
    .title = زوم
pdfjs-presentation-mode-button =
    .title = تغییر به حالت ارائه
pdfjs-presentation-mode-button-label = حالت ارائه
pdfjs-open-file-button =
    .title = باز کردن پرونده
pdfjs-open-file-button-label = باز کردن
pdfjs-print-button =
    .title = چاپ
pdfjs-print-button-label = چاپ
pdfjs-save-button =
    .title = ذخیره
pdfjs-save-button-label = ذخیره
# Used in Firefox for Android as a tooltip for the download button (“download” is a verb).
pdfjs-download-button =
    .title = دریافت
# Used in Firefox for Android as a label for the download button (“download” is a verb).
# Length of the translation matters since we are in a mobile context, with limited screen estate.
pdfjs-download-button-label = دریافت
pdfjs-bookmark-button =
    .title = صفحه فعلی (مشاهده نشانی اینترنتی از صفحه فعلی)
pdfjs-bookmark-button-label = صفحه فعلی

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = ابزارها
pdfjs-tools-button-label = ابزارها
pdfjs-first-page-button =
    .title = برو به اولین صفحه
pdfjs-first-page-button-label = برو به اولین صفحه
pdfjs-last-page-button =
    .title = برو به آخرین صفحه
pdfjs-last-page-button-label = برو به آخرین صفحه
pdfjs-page-rotate-cw-button =
    .title = چرخش ساعتگرد
pdfjs-page-rotate-cw-button-label = چرخش ساعتگرد
pdfjs-page-rotate-ccw-button =
    .title = چرخش پاد ساعتگرد
pdfjs-page-rotate-ccw-button-label = چرخش پاد ساعتگرد
pdfjs-cursor-text-select-tool-button =
    .title = فعال کردن ابزارِ انتخابِ متن
pdfjs-cursor-text-select-tool-button-label = ابزارِ انتخابِ متن
pdfjs-cursor-hand-tool-button =
    .title = فعال کردن ابزارِ دست
pdfjs-cursor-hand-tool-button-label = ابزار دست
pdfjs-scroll-page-button =
    .title = استفاده از پیمایش صفحه
pdfjs-scroll-page-button-label = پیمایش صفحه
pdfjs-scroll-vertical-button =
    .title = استفاده از پیمایش عمودی
pdfjs-scroll-vertical-button-label = پیمایش عمودی
pdfjs-scroll-horizontal-button =
    .title = استفاده از پیمایش افقی
pdfjs-scroll-horizontal-button-label = پیمایش افقی
pdfjs-spread-none-button =
    .title = صفحات پیوسته را یکی نکنید
pdfjs-spread-none-button-label = بدون صفحات پیوسته

## Document properties dialog

pdfjs-document-properties-button =
    .title = خصوصیات سند...
pdfjs-document-properties-button-label = خصوصیات سند...
pdfjs-document-properties-file-name = نام پرونده:
pdfjs-document-properties-file-size = حجم پرونده:
# Variables:
#   $kb (Number) - the PDF file size in kilobytes
#   $b (Number) - the PDF file size in bytes
pdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } کیلوبایت ({ $b } بایت)
# Variables:
#   $mb (Number) - the PDF file size in megabytes
#   $b (Number) - the PDF file size in bytes
pdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } مگابایت ({ $b } بایت)
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } کیلوبایت ({ $size_b } بایت)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } مگابایت ({ $size_b } بایت)
pdfjs-document-properties-title = عنوان:
pdfjs-document-properties-author = نویسنده:
pdfjs-document-properties-subject = موضوع:
pdfjs-document-properties-keywords = کلیدواژه‌ها:
pdfjs-document-properties-creation-date = تاریخ ایجاد:
pdfjs-document-properties-modification-date = تاریخ ویرایش:
# Variables:
#   $dateObj (Date) - the creation/modification date and time of the PDF file
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }، { $time }
pdfjs-document-properties-creator = ایجاد کننده:
pdfjs-document-properties-producer = ایجاد کننده PDF:
pdfjs-document-properties-version = نسخه PDF:
pdfjs-document-properties-page-count = تعداد صفحات:
pdfjs-document-properties-page-size = اندازه صفحه:
pdfjs-document-properties-page-size-unit-inches = اینچ
pdfjs-document-properties-page-size-unit-millimeters = میلی‌متر
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = نامه
pdfjs-document-properties-page-size-name-legal = حقوقی

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })

##

pdfjs-document-properties-linearized-yes = بله
pdfjs-document-properties-linearized-no = خیر
pdfjs-document-properties-close-button = بستن

## Print

pdfjs-print-progress-message = آماده سازی مدارک برای چاپ کردن…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = لغو
pdfjs-printing-not-supported = هشدار: قابلیت چاپ به‌طور کامل در این مرورگر پشتیبانی نمی‌شود.
pdfjs-printing-not-ready = اخطار: پرونده PDF بطور کامل بارگیری نشده و امکان چاپ وجود ندارد.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = باز و بسته کردن نوار کناری
pdfjs-toggle-sidebar-button-label = تغییرحالت نوارکناری
pdfjs-document-outline-button =
    .title = نمایش رئوس مطالب مدارک(برای بازشدن/جمع شدن همه موارد دوبار کلیک کنید)
pdfjs-document-outline-button-label = طرح نوشتار
pdfjs-attachments-button =
    .title = نمایش پیوست‌ها
pdfjs-attachments-button-label = پیوست‌ها
pdfjs-layers-button-label = لایه‌ها
pdfjs-thumbs-button =
    .title = نمایش تصاویر بندانگشتی
pdfjs-thumbs-button-label = تصاویر بندانگشتی
pdfjs-findbar-button =
    .title = جستجو در سند
pdfjs-findbar-button-label = پیدا کردن

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = صفحه { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = تصویر بند‌ انگشتی صفحه { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = پیدا کردن
    .placeholder = پیدا کردن در سند…
pdfjs-find-previous-button =
    .title = پیدا کردن رخداد قبلی عبارت
pdfjs-find-previous-button-label = قبلی
pdfjs-find-next-button =
    .title = پیدا کردن رخداد بعدی عبارت
pdfjs-find-next-button-label = بعدی
pdfjs-find-highlight-checkbox = برجسته و هایلایت کردن همه موارد
pdfjs-find-match-case-checkbox-label = تطبیق کوچکی و بزرگی حروف
pdfjs-find-entire-word-checkbox-label = تمام کلمه‌ها
pdfjs-find-reached-top = به بالای صفحه رسیدیم، از پایین ادامه می‌دهیم
pdfjs-find-reached-bottom = به آخر صفحه رسیدیم، از بالا ادامه می‌دهیم
pdfjs-find-not-found = عبارت پیدا نشد

## Predefined zoom values

pdfjs-page-scale-width = عرض صفحه
pdfjs-page-scale-fit = اندازه کردن صفحه
pdfjs-page-scale-auto = بزرگنمایی خودکار
pdfjs-page-scale-actual = اندازه واقعی‌
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = صفحهٔ { $page }

## Loading indicator messages

pdfjs-loading-error = هنگام بارگیری پرونده PDF خطایی رخ داد.
pdfjs-invalid-file-error = پرونده PDF نامعتبر یامعیوب می‌باشد.
pdfjs-missing-file-error = پرونده PDF یافت نشد.
pdfjs-unexpected-response-error = پاسخ پیش بینی نشده سرور
pdfjs-rendering-error = هنگام بارگیری صفحه خطایی رخ داد.

## Annotations

# Variables:
#   $date (Date) - the modification date of the annotation
#   $time (Time) - the modification time of the annotation
pdfjs-annotation-date-string = { $date }، { $time }
# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } Annotation]
# Variables:
#   $dateObj (Date) - the modification date and time of the annotation
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }

## Password

pdfjs-password-label = جهت باز کردن پرونده PDF گذرواژه را وارد نمائید.
pdfjs-password-invalid = گذرواژه نامعتبر. لطفا مجددا تلاش کنید.
pdfjs-password-ok-button = تأیید
pdfjs-password-cancel-button = لغو
pdfjs-web-fonts-disabled = فونت های تحت وب غیر فعال شده اند: امکان استفاده از نمایش دهنده داخلی PDF وجود ندارد.

## Editing

pdfjs-editor-free-text-button =
    .title = متن
pdfjs-editor-free-text-button-label = متن
pdfjs-editor-ink-button =
    .title = کشیدن
pdfjs-editor-ink-button-label = کشیدن
pdfjs-editor-stamp-button =
    .title = افزودن یا ویرایش تصاویر
pdfjs-editor-stamp-button-label = افزودن یا ویرایش تصاویر
pdfjs-editor-highlight-button =
    .title = برجسته کردن
pdfjs-editor-highlight-button-label = برجسته کردن
pdfjs-highlight-floating-button1 =
    .title = برجسته کردن
    .aria-label = برجسته کردن
pdfjs-highlight-floating-button-label = برجسته کردن

## Remove button for the various kind of editor.


##

# Editor Parameters
pdfjs-editor-free-text-color-input = رنگ
pdfjs-editor-free-text-size-input = اندازه
pdfjs-editor-ink-color-input = رنگ
pdfjs-editor-stamp-add-image-button =
    .title = افزودن تصویر
pdfjs-editor-stamp-add-image-button-label = افزودن تصویر
# .default-content is used as a placeholder in an empty text editor.
pdfjs-free-text2 =
    .aria-label = ویرایشگر متن
    .default-content = شروع به نوشتن کنید…
pdfjs-free-text =
    .aria-label = ویرایشگر متن
pdfjs-free-text-default-content = شروع به نوشتن کنید…

## Alt-text dialog

pdfjs-editor-alt-text-add-description-label = افزودن توضیحات
pdfjs-editor-alt-text-cancel-button = انصراف
pdfjs-editor-alt-text-save-button = ذخیره

## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.


## Color picker

pdfjs-editor-colorpicker-button =
    .title = تغییر رنگ
pdfjs-editor-colorpicker-dropdown =
    .aria-label = انتخاب رنگ
pdfjs-editor-colorpicker-yellow =
    .title = زرد
pdfjs-editor-colorpicker-green =
    .title = سبز
pdfjs-editor-colorpicker-blue =
    .title = آبی
pdfjs-editor-colorpicker-pink =
    .title = صورتی
pdfjs-editor-colorpicker-red =
    .title = قرمز

## Show all highlights
## This is a toggle button to show/hide all the highlights.

pdfjs-editor-highlight-show-all-button-label = نمایش همه
pdfjs-editor-highlight-show-all-button =
    .title = نمایش همه

## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.

pdfjs-editor-new-alt-text-disclaimer-learn-more-url = بیشتر بدانید
pdfjs-editor-new-alt-text-not-now-button = اکنون نه
pdfjs-editor-new-alt-text-error-close-button = بستن

## Image alt-text settings

pdfjs-editor-alt-text-settings-delete-model-button = حذف
pdfjs-editor-alt-text-settings-download-model-button = دریافت
pdfjs-editor-alt-text-settings-downloading-model-button = در حال دریافت…
pdfjs-editor-alt-text-settings-close-button = بستن

# Translations for ngx-extended-pdf-viewer additions only available in en-US
pdfjs-scroll-wrapped-button =
    .title = Use Wrapped Scrolling
pdfjs-scroll-wrapped-button-label = Wrapped Scrolling
pdfjs-spread-odd-button =
    .title = Join page spreads starting with odd-numbered pages
pdfjs-spread-odd-button-label = Odd Spreads
pdfjs-spread-even-button =
    .title = Join page spreads starting with even-numbered pages
pdfjs-spread-even-button-label = Even Spreads
pdfjs-document-properties-page-size-orientation-portrait = portrait
pdfjs-document-properties-page-size-orientation-landscape = landscape
pdfjs-toggle-sidebar-notification-button =
    .title = Toggle Sidebar (document contains outline/attachments/layers)
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
pdfjs-editor-remove-ink-button =
    .title = Remove drawing
pdfjs-editor-remove-freetext-button =
    .title = Remove text
pdfjs-editor-remove-stamp-button =
    .title = Remove image
pdfjs-editor-remove-highlight-button =
    .title = Remove highlight
pdfjs-editor-ink-thickness-input = Thickness
pdfjs-editor-ink-opacity-input = Opacity
pdfjs-editor-free-highlight-thickness-input = Thickness
pdfjs-editor-free-highlight-thickness-title =
    .title = Change thickness when highlighting items other than text
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
pdfjs-editor-alt-text-settings-download-model-label = Alt text AI model ({ $totalSize } MB)
pdfjs-editor-alt-text-settings-ai-model-description = Runs locally on your device so your data stays private. Required for automatic alt text.
pdfjs-editor-alt-text-settings-editor-title = Alt text editor
pdfjs-editor-alt-text-settings-show-dialog-button-label = Show alt text editor right away when adding an image
pdfjs-editor-alt-text-settings-show-dialog-description = Helps you make sure all your images have alt text.
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