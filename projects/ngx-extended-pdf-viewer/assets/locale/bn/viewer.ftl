# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = পূর্ববর্তী পাতা
pdfjs-previous-button-label = পূর্ববর্তী
pdfjs-next-button =
    .title = পরবর্তী পাতা
pdfjs-next-button-label = পরবর্তী
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = পাতা
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = { $pagesCount } এর
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pagesCount } এর { $pageNumber })
pdfjs-zoom-out-button =
    .title = ছোট আকারে প্রদর্শন
pdfjs-zoom-out-button-label = ছোট আকারে প্রদর্শন
pdfjs-zoom-in-button =
    .title = বড় আকারে প্রদর্শন
pdfjs-zoom-in-button-label = বড় আকারে প্রদর্শন
pdfjs-zoom-select =
    .title = বড় আকারে প্রদর্শন
pdfjs-presentation-mode-button =
    .title = উপস্থাপনা মোডে স্যুইচ করুন
pdfjs-presentation-mode-button-label = উপস্থাপনা মোড
pdfjs-open-file-button =
    .title = ফাইল খুলুন
pdfjs-open-file-button-label = খুলুন
pdfjs-print-button =
    .title = মুদ্রণ
pdfjs-print-button-label = মুদ্রণ

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = টুল
pdfjs-tools-button-label = টুল
pdfjs-first-page-button =
    .title = প্রথম পাতায় যাও
pdfjs-first-page-button-label = প্রথম পাতায় যাও
pdfjs-last-page-button =
    .title = শেষ পাতায় যাও
pdfjs-last-page-button-label = শেষ পাতায় যাও
pdfjs-page-rotate-cw-button =
    .title = ঘড়ির কাঁটার দিকে ঘোরাও
pdfjs-page-rotate-cw-button-label = ঘড়ির কাঁটার দিকে ঘোরাও
pdfjs-page-rotate-ccw-button =
    .title = ঘড়ির কাঁটার বিপরীতে ঘোরাও
pdfjs-page-rotate-ccw-button-label = ঘড়ির কাঁটার বিপরীতে ঘোরাও
pdfjs-cursor-text-select-tool-button =
    .title = লেখা নির্বাচক টুল সক্রিয় করুন
pdfjs-cursor-text-select-tool-button-label = লেখা নির্বাচক টুল
pdfjs-cursor-hand-tool-button =
    .title = হ্যান্ড টুল সক্রিয় করুন
pdfjs-cursor-hand-tool-button-label = হ্যান্ড টুল
pdfjs-scroll-vertical-button =
    .title = উলম্ব স্ক্রলিং ব্যবহার করুন
pdfjs-scroll-vertical-button-label = উলম্ব স্ক্রলিং
pdfjs-scroll-horizontal-button =
    .title = অনুভূমিক স্ক্রলিং ব্যবহার করুন
pdfjs-scroll-horizontal-button-label = অনুভূমিক স্ক্রলিং
pdfjs-scroll-wrapped-button =
    .title = Wrapped স্ক্রোলিং ব্যবহার করুন
pdfjs-scroll-wrapped-button-label = Wrapped স্ক্রোলিং
pdfjs-spread-none-button =
    .title = পেজ স্প্রেডগুলোতে যোগদান করবেন না
pdfjs-spread-none-button-label = Spreads নেই
pdfjs-spread-odd-button-label = বিজোড় Spreads
pdfjs-spread-even-button-label = জোড় Spreads

## Document properties dialog

pdfjs-document-properties-button =
    .title = নথি বৈশিষ্ট্য…
pdfjs-document-properties-button-label = নথি বৈশিষ্ট্য…
pdfjs-document-properties-file-name = ফাইলের নাম:
pdfjs-document-properties-file-size = ফাইলের আকার:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } কেবি ({ $size_b } বাইট)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } এমবি ({ $size_b } বাইট)
pdfjs-document-properties-title = শিরোনাম:
pdfjs-document-properties-author = লেখক:
pdfjs-document-properties-subject = বিষয়:
pdfjs-document-properties-keywords = কীওয়ার্ড:
pdfjs-document-properties-creation-date = তৈরির তারিখ:
pdfjs-document-properties-modification-date = পরিবর্তনের তারিখ:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = প্রস্তুতকারক:
pdfjs-document-properties-producer = পিডিএফ প্রস্তুতকারক:
pdfjs-document-properties-version = পিডিএফ সংষ্করণ:
pdfjs-document-properties-page-count = মোট পাতা:
pdfjs-document-properties-page-size = পাতার সাইজ:
pdfjs-document-properties-page-size-unit-inches = এর মধ্যে
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = উলম্ব
pdfjs-document-properties-page-size-orientation-landscape = অনুভূমিক
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = লেটার
pdfjs-document-properties-page-size-name-legal = লীগাল

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
pdfjs-document-properties-linearized-yes = হ্যাঁ
pdfjs-document-properties-linearized-no = না
pdfjs-document-properties-close-button = বন্ধ

## Print

pdfjs-print-progress-message = মুদ্রণের জন্য নথি প্রস্তুত করা হচ্ছে…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = বাতিল
pdfjs-printing-not-supported = সতর্কতা: এই ব্রাউজারে মুদ্রণ সম্পূর্ণভাবে সমর্থিত নয়।
pdfjs-printing-not-ready = সতর্কীকরণ: পিডিএফটি মুদ্রণের জন্য সম্পূর্ণ লোড হয়নি।

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = সাইডবার টগল করুন
pdfjs-toggle-sidebar-button-label = সাইডবার টগল করুন
pdfjs-document-outline-button =
    .title = নথির আউটলাইন দেখাও (সব আইটেম প্রসারিত/সঙ্কুচিত করতে ডবল ক্লিক করুন)
pdfjs-document-outline-button-label = নথির রূপরেখা
pdfjs-attachments-button =
    .title = সংযুক্তি দেখাও
pdfjs-attachments-button-label = সংযুক্তি
pdfjs-thumbs-button =
    .title = থাম্বনেইল সমূহ প্রদর্শন করুন
pdfjs-thumbs-button-label = থাম্বনেইল সমূহ
pdfjs-findbar-button =
    .title = নথির মধ্যে খুঁজুন
pdfjs-findbar-button-label = খুঁজুন

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = পাতা { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = { $page } পাতার থাম্বনেইল

## Find panel button title and messages

pdfjs-find-input =
    .title = খুঁজুন
    .placeholder = নথির মধ্যে খুঁজুন…
pdfjs-find-previous-button =
    .title = বাক্যাংশের পূর্ববর্তী উপস্থিতি অনুসন্ধান
pdfjs-find-previous-button-label = পূর্ববর্তী
pdfjs-find-next-button =
    .title = বাক্যাংশের পরবর্তী উপস্থিতি অনুসন্ধান
pdfjs-find-next-button-label = পরবর্তী
pdfjs-find-highlight-checkbox = সব হাইলাইট করুন
pdfjs-find-match-case-checkbox-label = অক্ষরের ছাঁদ মেলানো
pdfjs-find-entire-word-checkbox-label = সম্পূর্ণ শব্দ
pdfjs-find-reached-top = পাতার শুরুতে পৌছে গেছে, নীচ থেকে আরম্ভ করা হয়েছে
pdfjs-find-reached-bottom = পাতার শেষে পৌছে গেছে, উপর থেকে আরম্ভ করা হয়েছে
pdfjs-find-not-found = বাক্যাংশ পাওয়া যায়নি

## Predefined zoom values

pdfjs-page-scale-width = পাতার প্রস্থ
pdfjs-page-scale-fit = পাতা ফিট করুন
pdfjs-page-scale-auto = স্বয়ংক্রিয় জুম
pdfjs-page-scale-actual = প্রকৃত আকার
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = পিডিএফ লোড করার সময় ত্রুটি দেখা দিয়েছে।
pdfjs-invalid-file-error = অকার্যকর অথবা ক্ষতিগ্রস্ত পিডিএফ ফাইল।
pdfjs-missing-file-error = নিখোঁজ PDF ফাইল।
pdfjs-unexpected-response-error = অপ্রত্যাশীত সার্ভার প্রতিক্রিয়া।
pdfjs-rendering-error = পাতা উপস্থাপনার সময় ত্রুটি দেখা দিয়েছে।

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
    .alt = [{ $type } টীকা]

## Password

pdfjs-password-label = পিডিএফ ফাইলটি ওপেন করতে পাসওয়ার্ড দিন।
pdfjs-password-invalid = ভুল পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।
pdfjs-password-ok-button = ঠিক আছে
pdfjs-password-cancel-button = বাতিল
pdfjs-web-fonts-disabled = ওয়েব ফন্ট নিষ্ক্রিয়: সংযুক্ত পিডিএফ ফন্ট ব্যবহার করা যাচ্ছে না।

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