# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = ᱢᱟᱲᱟᱝ ᱥᱟᱦᱴᱟ
pdfjs-previous-button-label = ᱢᱟᱲᱟᱝᱟᱜ
pdfjs-next-button =
    .title = ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ ᱥᱟᱦᱴᱟ
pdfjs-next-button-label = ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = ᱥᱟᱦᱴᱟ
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = ᱨᱮᱭᱟᱜ { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } ᱠᱷᱚᱱ { $pagesCount })
pdfjs-zoom-out-button =
    .title = ᱦᱤᱲᱤᱧ ᱛᱮᱭᱟᱨ
pdfjs-zoom-out-button-label = ᱦᱤᱲᱤᱧ ᱛᱮᱭᱟᱨ
pdfjs-zoom-in-button =
    .title = ᱢᱟᱨᱟᱝ ᱛᱮᱭᱟᱨ
pdfjs-zoom-in-button-label = ᱢᱟᱨᱟᱝ ᱛᱮᱭᱟᱨ
pdfjs-zoom-select =
    .title = ᱡᱩᱢ
pdfjs-presentation-mode-button =
    .title = ᱩᱫᱩᱜ ᱥᱚᱫᱚᱨ ᱚᱵᱚᱥᱛᱟ ᱨᱮ ᱚᱛᱟᱭ ᱢᱮ
pdfjs-presentation-mode-button-label = ᱩᱫᱩᱜ ᱥᱚᱫᱚᱨ ᱚᱵᱚᱥᱛᱟ ᱨᱮ
pdfjs-open-file-button =
    .title = ᱨᱮᱫ ᱡᱷᱤᱡᱽ ᱢᱮ
pdfjs-open-file-button-label = ᱡᱷᱤᱡᱽ ᱢᱮ
pdfjs-print-button =
    .title = ᱪᱷᱟᱯᱟ
pdfjs-print-button-label = ᱪᱷᱟᱯᱟ
pdfjs-save-button =
    .title = ᱥᱟᱺᱪᱟᱣ ᱢᱮ
pdfjs-save-button-label = ᱥᱟᱺᱪᱟᱣ ᱢᱮ
# Used in Firefox for Android as a tooltip for the download button (“download” is a verb).
pdfjs-download-button =
    .title = ᱰᱟᱣᱩᱱᱞᱚᱰ
# Used in Firefox for Android as a label for the download button (“download” is a verb).
# Length of the translation matters since we are in a mobile context, with limited screen estate.
pdfjs-download-button-label = ᱰᱟᱣᱩᱱᱞᱚᱰ
pdfjs-bookmark-button =
    .title = ᱱᱤᱛᱚᱜᱟᱜ ᱥᱟᱦᱴᱟ (ᱱᱤᱛᱚᱜᱟᱜ ᱥᱟᱦᱴᱟ ᱠᱷᱚᱱ URL ᱫᱮᱠᱷᱟᱣ ᱢᱮ)
pdfjs-bookmark-button-label = ᱱᱤᱛᱚᱜᱟᱜ ᱥᱟᱦᱴᱟ

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = ᱦᱟᱹᱛᱤᱭᱟᱹᱨ ᱠᱚ
pdfjs-tools-button-label = ᱦᱟᱹᱛᱤᱭᱟᱹᱨ ᱠᱚ
pdfjs-first-page-button =
    .title = ᱯᱩᱭᱞᱩ ᱥᱟᱦᱴᱟ ᱥᱮᱫ ᱪᱟᱞᱟᱜ ᱢᱮ
pdfjs-first-page-button-label = ᱯᱩᱭᱞᱩ ᱥᱟᱦᱴᱟ ᱥᱮᱫ ᱪᱟᱞᱟᱜ ᱢᱮ
pdfjs-last-page-button =
    .title = ᱢᱩᱪᱟᱹᱫ ᱥᱟᱦᱴᱟ ᱥᱮᱫ ᱪᱟᱞᱟᱜ ᱢᱮ
pdfjs-last-page-button-label = ᱢᱩᱪᱟᱹᱫ ᱥᱟᱦᱴᱟ ᱥᱮᱫ ᱪᱟᱞᱟᱜ ᱢᱮ
pdfjs-page-rotate-cw-button =
    .title = ᱜᱷᱚᱰᱤ ᱦᱤᱥᱟᱹᱵ ᱛᱮ ᱟᱹᱪᱩᱨ
pdfjs-page-rotate-cw-button-label = ᱜᱷᱚᱰᱤ ᱦᱤᱥᱟᱹᱵ ᱛᱮ ᱟᱹᱪᱩᱨ
pdfjs-page-rotate-ccw-button =
    .title = ᱜᱷᱚᱰᱤ ᱦᱤᱥᱟᱹᱵ ᱛᱮ ᱩᱞᱴᱟᱹ ᱟᱹᱪᱩᱨ
pdfjs-page-rotate-ccw-button-label = ᱜᱷᱚᱰᱤ ᱦᱤᱥᱟᱹᱵ ᱛᱮ ᱩᱞᱴᱟᱹ ᱟᱹᱪᱩᱨ
pdfjs-cursor-text-select-tool-button =
    .title = ᱚᱞ ᱵᱟᱪᱷᱟᱣ ᱦᱟᱹᱛᱤᱭᱟᱨ ᱮᱢ ᱪᱷᱚᱭ ᱢᱮ
pdfjs-cursor-text-select-tool-button-label = ᱚᱞ ᱵᱟᱪᱷᱟᱣ ᱦᱟᱹᱛᱤᱭᱟᱨ
pdfjs-cursor-hand-tool-button =
    .title = ᱛᱤ ᱦᱟᱹᱛᱤᱭᱟᱨ ᱮᱢ ᱪᱷᱚᱭ ᱢᱮ
pdfjs-cursor-hand-tool-button-label = ᱛᱤ ᱦᱟᱹᱛᱤᱭᱟᱨ
pdfjs-scroll-page-button =
    .title = ᱥᱟᱦᱴᱟ ᱜᱩᱲᱟᱹᱣ ᱵᱮᱵᱷᱟᱨ ᱢᱮ
pdfjs-scroll-page-button-label = ᱥᱟᱦᱴᱟ ᱜᱩᱲᱟᱹᱣ
pdfjs-scroll-vertical-button =
    .title = ᱥᱤᱫᱽ ᱜᱩᱲᱟᱹᱣ ᱵᱮᱵᱷᱟᱨ ᱢᱮ
pdfjs-scroll-vertical-button-label = ᱥᱤᱫᱽ ᱜᱩᱲᱟᱹᱣ
pdfjs-scroll-horizontal-button =
    .title = ᱜᱤᱛᱤᱡ ᱛᱮ ᱜᱩᱲᱟᱹᱣ ᱵᱮᱵᱷᱟᱨ ᱢᱮ
pdfjs-scroll-horizontal-button-label = ᱜᱤᱛᱤᱡ ᱛᱮ ᱜᱩᱲᱟᱹᱣ
pdfjs-scroll-wrapped-button =
    .title = ᱞᱤᱯᱴᱟᱹᱣ ᱜᱩᱰᱨᱟᱹᱣ ᱵᱮᱵᱷᱟᱨ ᱢᱮ
pdfjs-scroll-wrapped-button-label = ᱞᱤᱯᱴᱟᱣ ᱜᱩᱰᱨᱟᱹᱣ
pdfjs-spread-none-button =
    .title = ᱟᱞᱚᱢ ᱡᱚᱲᱟᱣ ᱟ ᱥᱟᱦᱴᱟ ᱫᱚ ᱯᱟᱥᱱᱟᱣᱜᱼᱟ
pdfjs-spread-none-button-label = ᱯᱟᱥᱱᱟᱣ ᱵᱟᱹᱱᱩᱜᱼᱟ
pdfjs-spread-odd-button =
    .title = ᱥᱟᱦᱴᱟ ᱯᱟᱥᱱᱟᱣ ᱡᱚᱲᱟᱣ ᱢᱮ ᱡᱟᱦᱟᱸ ᱫᱚ ᱚᱰᱼᱮᱞ ᱥᱟᱦᱴᱟᱠᱚ ᱥᱟᱞᱟᱜ ᱮᱛᱦᱚᱵᱚᱜ ᱠᱟᱱᱟ
pdfjs-spread-odd-button-label = ᱚᱰ ᱯᱟᱥᱱᱟᱣ
pdfjs-spread-even-button =
    .title = ᱥᱟᱦᱴᱟ ᱯᱟᱥᱱᱟᱣ ᱡᱚᱲᱟᱣ ᱢᱮ ᱡᱟᱦᱟᱸ ᱫᱚ ᱤᱣᱮᱱᱼᱮᱞ ᱥᱟᱦᱴᱟᱠᱚ ᱥᱟᱞᱟᱜ ᱮᱛᱦᱚᱵᱚᱜ ᱠᱟᱱᱟ
pdfjs-spread-even-button-label = ᱯᱟᱥᱱᱟᱣ ᱤᱣᱮᱱ

## Document properties dialog

pdfjs-document-properties-button =
    .title = ᱫᱚᱞᱤᱞ ᱜᱩᱱᱠᱚ …
pdfjs-document-properties-button-label = ᱫᱚᱞᱤᱞ ᱜᱩᱱᱠᱚ …
pdfjs-document-properties-file-name = ᱨᱮᱫᱽ ᱧᱩᱛᱩᱢ :
pdfjs-document-properties-file-size = ᱨᱮᱫᱽ ᱢᱟᱯ :
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } ᱵᱟᱭᱤᱴ ᱠᱚ)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } ᱵᱟᱭᱤᱴ ᱠᱚ)
pdfjs-document-properties-title = ᱧᱩᱛᱩᱢ :
pdfjs-document-properties-author = ᱚᱱᱚᱞᱤᱭᱟᱹ :
pdfjs-document-properties-subject = ᱵᱤᱥᱚᱭ :
pdfjs-document-properties-keywords = ᱠᱟᱹᱴᱷᱤ ᱥᱟᱵᱟᱫᱽ :
pdfjs-document-properties-creation-date = ᱛᱮᱭᱟᱨ ᱢᱟᱸᱦᱤᱛ :
pdfjs-document-properties-modification-date = ᱵᱚᱫᱚᱞ ᱦᱚᱪᱚ ᱢᱟᱹᱦᱤᱛ :
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = ᱵᱮᱱᱟᱣᱤᱡ :
pdfjs-document-properties-producer = PDF ᱛᱮᱭᱟᱨ ᱚᱰᱚᱠᱤᱡ :
pdfjs-document-properties-version = PDF ᱵᱷᱟᱹᱨᱥᱚᱱ :
pdfjs-document-properties-page-count = ᱥᱟᱦᱴᱟ ᱞᱮᱠᱷᱟ :
pdfjs-document-properties-page-size = ᱥᱟᱦᱴᱟ ᱢᱟᱯ :
pdfjs-document-properties-page-size-unit-inches = ᱤᱧᱪ
pdfjs-document-properties-page-size-unit-millimeters = ᱢᱤᱢᱤ
pdfjs-document-properties-page-size-orientation-portrait = ᱯᱚᱴᱨᱮᱴ
pdfjs-document-properties-page-size-orientation-landscape = ᱞᱮᱱᱰᱥᱠᱮᱯ
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = ᱪᱤᱴᱷᱤ
pdfjs-document-properties-page-size-name-legal = ᱠᱟᱹᱱᱩᱱᱤ

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
pdfjs-document-properties-linearized = ᱞᱚᱜᱚᱱ ᱣᱮᱵᱽ ᱧᱮᱞ :
pdfjs-document-properties-linearized-yes = ᱦᱚᱭ
pdfjs-document-properties-linearized-no = ᱵᱟᱝ
pdfjs-document-properties-close-button = ᱵᱚᱸᱫᱚᱭ ᱢᱮ

## Print

pdfjs-print-progress-message = ᱪᱷᱟᱯᱟ ᱞᱟᱹᱜᱤᱫ ᱫᱚᱞᱤᱞ ᱛᱮᱭᱟᱨᱚᱜ ᱠᱟᱱᱟ …
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = ᱵᱟᱹᱰᱨᱟᱹ
pdfjs-printing-not-supported = ᱦᱚᱥᱤᱭᱟᱨ : ᱪᱷᱟᱯᱟ ᱱᱚᱣᱟ ᱯᱟᱱᱛᱮᱭᱟᱜ ᱫᱟᱨᱟᱭ ᱛᱮ ᱯᱩᱨᱟᱹᱣ ᱵᱟᱭ ᱜᱚᱲᱚᱣᱟᱠᱟᱱᱟ ᱾
pdfjs-printing-not-ready = ᱦᱩᱥᱤᱭᱟᱹᱨ : ᱪᱷᱟᱯᱟ ᱞᱟᱹᱜᱤᱫ PDF ᱯᱩᱨᱟᱹ ᱵᱟᱭ ᱞᱟᱫᱮ ᱟᱠᱟᱱᱟ ᱾

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = ᱫᱷᱟᱨᱮᱵᱟᱨ ᱥᱮᱫ ᱩᱪᱟᱹᱲᱚᱜ ᱢᱮ
pdfjs-toggle-sidebar-notification-button =
    .title = ᱫᱷᱟᱨᱮᱵᱟᱨ ᱥᱮᱫ ᱩᱪᱟᱹᱲᱚᱜ ᱢᱮ  (ᱫᱚᱞᱤᱞ ᱨᱮ ᱟᱣᱴᱞᱟᱭᱤᱢ ᱢᱮᱱᱟᱜᱼᱟ/ᱞᱟᱪᱷᱟᱠᱚ/ᱯᱚᱨᱚᱛᱠᱚ)
pdfjs-toggle-sidebar-button-label = ᱫᱷᱟᱨᱮᱵᱟᱨ ᱥᱮᱫ ᱩᱪᱟᱹᱲᱚᱜ ᱢᱮ
pdfjs-document-outline-button =
    .title = ᱫᱚᱞᱚᱞ ᱟᱣᱴᱞᱟᱭᱤᱱ ᱫᱮᱠᱷᱟᱣ ᱢᱮ (ᱡᱷᱚᱛᱚ ᱡᱤᱱᱤᱥᱠᱚ ᱵᱟᱨ ᱡᱮᱠᱷᱟ ᱚᱛᱟ ᱠᱮᱛᱮ ᱡᱷᱟᱹᱞ/ᱦᱩᱰᱤᱧ ᱪᱷᱚᱭ ᱢᱮ)
pdfjs-document-outline-button-label = ᱫᱚᱞᱤᱞ ᱛᱮᱭᱟᱨ ᱛᱮᱫ
pdfjs-attachments-button =
    .title = ᱞᱟᱴᱷᱟ ᱥᱮᱞᱮᱫ ᱠᱚ ᱩᱫᱩᱜᱽ ᱢᱮ
pdfjs-attachments-button-label = ᱞᱟᱴᱷᱟ ᱥᱮᱞᱮᱫ ᱠᱚ
pdfjs-layers-button =
    .title = ᱯᱚᱨᱚᱛ ᱫᱮᱠᱷᱟᱣ ᱢᱮ (ᱢᱩᱞ ᱡᱟᱭᱜᱟ ᱛᱮ ᱡᱷᱚᱛᱚ ᱯᱚᱨᱚᱛᱠᱚ ᱨᱤᱥᱮᱴ ᱞᱟᱹᱜᱤᱫ ᱵᱟᱨ ᱡᱮᱠᱷᱟ ᱚᱛᱚᱭ ᱢᱮ)
pdfjs-layers-button-label = ᱯᱚᱨᱚᱛᱠᱚ
pdfjs-thumbs-button =
    .title = ᱪᱤᱛᱟᱹᱨ ᱟᱦᱞᱟ ᱠᱚ ᱩᱫᱩᱜᱽ ᱢᱮ
pdfjs-thumbs-button-label = ᱪᱤᱛᱟᱹᱨ ᱟᱦᱞᱟ ᱠᱚ
pdfjs-current-outline-item-button =
    .title = ᱱᱤᱛᱚᱜᱟᱜ ᱟᱣᱴᱞᱟᱭᱤᱱ ᱡᱟᱱᱤᱥ ᱯᱟᱱᱛᱮ ᱢᱮ
pdfjs-current-outline-item-button-label = ᱱᱤᱛᱚᱜᱟᱜ ᱟᱣᱴᱞᱟᱭᱤᱱ ᱡᱟᱱᱤᱥ
pdfjs-findbar-button =
    .title = ᱫᱚᱞᱤᱞ ᱨᱮ ᱯᱟᱱᱛᱮ
pdfjs-findbar-button-label = ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ
pdfjs-additional-layers = ᱵᱟᱹᱲᱛᱤ ᱯᱚᱨᱚᱛᱠᱚ

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = { $page } ᱥᱟᱦᱴᱟ
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = { $page } ᱥᱟᱦᱴᱟ ᱨᱮᱭᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱟᱦᱞᱟ

## Find panel button title and messages

pdfjs-find-input =
    .title = ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ
    .placeholder = ᱫᱚᱞᱤᱞ ᱨᱮ ᱯᱟᱱᱛᱮ ᱢᱮ …
pdfjs-find-previous-button =
    .title = ᱟᱭᱟᱛ ᱦᱤᱸᱥ ᱨᱮᱭᱟᱜ ᱯᱟᱹᱦᱤᱞ ᱥᱮᱫᱟᱜ ᱚᱰᱚᱠ ᱧᱟᱢ ᱢᱮ
pdfjs-find-previous-button-label = ᱢᱟᱲᱟᱝᱟᱜ
pdfjs-find-next-button =
    .title = ᱟᱭᱟᱛ ᱦᱤᱸᱥ ᱨᱮᱭᱟᱜ ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ ᱚᱰᱚᱠ ᱧᱟᱢ ᱢᱮ
pdfjs-find-next-button-label = ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ
pdfjs-find-highlight-checkbox = ᱡᱷᱚᱛᱚ ᱩᱫᱩᱜ ᱨᱟᱠᱟᱵ
pdfjs-find-match-case-checkbox-label = ᱡᱚᱲ ᱠᱟᱛᱷᱟ
pdfjs-find-match-diacritics-checkbox-label = ᱵᱤᱥᱮᱥᱚᱠ ᱠᱚ ᱢᱮᱲᱟᱣ ᱢᱮ
pdfjs-find-entire-word-checkbox-label = ᱡᱷᱚᱛᱚ ᱟᱹᱲᱟᱹᱠᱚ
pdfjs-find-reached-top = ᱫᱚᱞᱤᱞ ᱨᱮᱭᱟᱜ ᱪᱤᱴ ᱨᱮ ᱥᱮᱴᱮᱨ, ᱞᱟᱛᱟᱨ ᱠᱷᱚᱱ ᱞᱮᱛᱟᱲ
pdfjs-find-reached-bottom = ᱫᱚᱞᱤᱞ ᱨᱮᱭᱟᱜ ᱢᱩᱪᱟᱹᱫ ᱨᱮ ᱥᱮᱴᱮᱨ, ᱪᱚᱴ ᱠᱷᱚᱱ ᱞᱮᱛᱟᱲ
pdfjs-find-not-found = ᱛᱚᱯᱚᱞ ᱫᱚᱱᱚᱲ ᱵᱟᱝ ᱧᱟᱢ ᱞᱮᱱᱟ

## Predefined zoom values

pdfjs-page-scale-width = ᱥᱟᱦᱴᱟ ᱚᱥᱟᱨ
pdfjs-page-scale-fit = ᱥᱟᱦᱴᱟ ᱠᱷᱟᱯ
pdfjs-page-scale-auto = ᱟᱡᱼᱟᱡ ᱛᱮ ᱦᱩᱰᱤᱧ ᱞᱟᱹᱴᱩ ᱛᱮᱭᱟᱨ
pdfjs-page-scale-actual = ᱴᱷᱤᱠ ᱢᱟᱨᱟᱝ ᱛᱮᱫ
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = { $page } ᱥᱟᱦᱴᱟ

## Loading indicator messages

pdfjs-loading-error = PDF ᱞᱟᱫᱮ ᱡᱚᱦᱚᱜ ᱢᱤᱫ ᱵᱷᱩᱞ ᱦᱩᱭ ᱮᱱᱟ ᱾
pdfjs-invalid-file-error = ᱵᱟᱝ ᱵᱟᱛᱟᱣ ᱟᱨᱵᱟᱝᱠᱷᱟᱱ ᱰᱤᱜᱟᱹᱣ PDF ᱨᱮᱫᱽ ᱾
pdfjs-missing-file-error = ᱟᱫᱟᱜ PDF ᱨᱮᱫᱽ ᱾
pdfjs-unexpected-response-error = ᱵᱟᱝᱵᱩᱡᱷ ᱥᱚᱨᱵᱷᱚᱨ ᱛᱮᱞᱟ ᱾
pdfjs-rendering-error = ᱥᱟᱦᱴᱟ ᱮᱢ ᱡᱚᱦᱚᱠ ᱢᱤᱫ ᱵᱷᱩᱞ ᱦᱩᱭ ᱮᱱᱟ ᱾

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
    .alt = [{ $type } ᱢᱚᱱᱛᱚ ᱮᱢ]

## Password

pdfjs-password-label = ᱱᱚᱶᱟ PDF ᱨᱮᱫᱽ ᱡᱷᱤᱡᱽ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱱᱟᱝ ᱥᱟᱵᱟᱫᱽ ᱟᱫᱮᱨ ᱢᱮ ᱾
pdfjs-password-invalid = ᱵᱷᱩᱞ ᱫᱟᱱᱟᱝ ᱥᱟᱵᱟᱫᱽ ᱾ ᱫᱟᱭᱟᱠᱟᱛᱮ ᱫᱩᱦᱲᱟᱹ ᱪᱮᱥᱴᱟᱭ ᱢᱮ ᱾
pdfjs-password-ok-button = ᱴᱷᱤᱠ
pdfjs-password-cancel-button = ᱵᱟᱹᱰᱨᱟᱹ
pdfjs-web-fonts-disabled = ᱣᱮᱵᱽ ᱪᱤᱠᱤ ᱵᱟᱝ ᱦᱩᱭ ᱦᱚᱪᱚ ᱠᱟᱱᱟ : ᱵᱷᱤᱛᱤᱨ ᱛᱷᱟᱯᱚᱱ PDF ᱪᱤᱠᱤ ᱵᱮᱵᱷᱟᱨ ᱵᱟᱝ ᱦᱩᱭ ᱠᱮᱭᱟ ᱾

## Editing

pdfjs-editor-free-text-button =
    .title = ᱚᱞ
pdfjs-editor-free-text-button-label = ᱚᱞ
pdfjs-editor-ink-button =
    .title = ᱛᱮᱭᱟᱨ
pdfjs-editor-ink-button-label = ᱛᱮᱭᱟᱨ
pdfjs-editor-stamp-button =
    .title = ᱪᱤᱛᱟᱹᱨᱠᱚ ᱥᱮᱞᱮᱫ ᱥᱮ ᱥᱟᱯᱲᱟᱣ ᱢᱮ
pdfjs-editor-stamp-button-label = ᱪᱤᱛᱟᱹᱨᱠᱚ ᱥᱮᱞᱮᱫ ᱥᱮ ᱥᱟᱯᱲᱟᱣ ᱢᱮ

## Remove button for the various kind of editor.


##

# Editor Parameters
pdfjs-editor-free-text-color-input = ᱨᱚᱝ
pdfjs-editor-free-text-size-input = ᱢᱟᱯ
pdfjs-editor-ink-color-input = ᱨᱚᱝ
pdfjs-editor-ink-thickness-input = ᱢᱚᱴᱟ
pdfjs-editor-ink-opacity-input = ᱟᱨᱯᱟᱨ
pdfjs-editor-stamp-add-image-button =
    .title = ᱪᱤᱛᱟᱹᱨ ᱥᱮᱞᱮᱫ ᱢᱮ
pdfjs-editor-stamp-add-image-button-label = ᱪᱤᱛᱟᱹᱨ ᱥᱮᱞᱮᱫ ᱢᱮ
pdfjs-free-text =
    .aria-label = ᱚᱞ ᱥᱟᱯᱲᱟᱣᱤᱭᱟᱹ
pdfjs-free-text-default-content = ᱚᱞ ᱮᱛᱦᱚᱵ ᱢᱮ …
pdfjs-ink =
    .aria-label = ᱛᱮᱭᱟᱨ ᱥᱟᱯᱲᱟᱣᱤᱭᱟᱹ
pdfjs-ink-canvas =
    .aria-label = ᱵᱮᱵᱷᱟᱨᱤᱭᱟᱹ ᱛᱮᱭᱟᱨ ᱠᱟᱫ ᱪᱤᱛᱟᱹᱨ

## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.


## Color picker


## Show all highlights
## This is a toggle button to show/hide all the highlights.


## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.


## Image alt-text settings


# Translations for ngx-extended-pdf-viewer additions only available in en-US
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
pdfjs-editor-free-highlight-thickness-input = Thickness
pdfjs-editor-free-highlight-thickness-title =
    .title = Change thickness when highlighting items other than text
pdfjs-free-text2 =
    .aria-label = Text Editor
    .default-content = Start typing…
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