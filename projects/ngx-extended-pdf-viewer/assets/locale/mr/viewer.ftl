# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = मागील पृष्ठ
pdfjs-previous-button-label = मागील
pdfjs-next-button =
    .title = पुढील पृष्ठ
pdfjs-next-button-label = पुढील
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = पृष्ठ
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = { $pagesCount }पैकी
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pagesCount } पैकी { $pageNumber })
pdfjs-zoom-out-button =
    .title = छोटे करा
pdfjs-zoom-out-button-label = छोटे करा
pdfjs-zoom-in-button =
    .title = मोठे करा
pdfjs-zoom-in-button-label = मोठे करा
pdfjs-zoom-select =
    .title = लहान किंवा मोठे करा
pdfjs-presentation-mode-button =
    .title = प्रस्तुतिकरण मोडचा वापर करा
pdfjs-presentation-mode-button-label = प्रस्तुतिकरण मोड
pdfjs-open-file-button =
    .title = फाइल उघडा
pdfjs-open-file-button-label = उघडा
pdfjs-print-button =
    .title = छपाई करा
pdfjs-print-button-label = छपाई करा

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = साधने
pdfjs-tools-button-label = साधने
pdfjs-first-page-button =
    .title = पहिल्या पृष्ठावर जा
pdfjs-first-page-button-label = पहिल्या पृष्ठावर जा
pdfjs-last-page-button =
    .title = शेवटच्या पृष्ठावर जा
pdfjs-last-page-button-label = शेवटच्या पृष्ठावर जा
pdfjs-page-rotate-cw-button =
    .title = घड्याळाच्या काट्याच्या दिशेने फिरवा
pdfjs-page-rotate-cw-button-label = घड्याळाच्या काट्याच्या दिशेने फिरवा
pdfjs-page-rotate-ccw-button =
    .title = घड्याळाच्या काट्याच्या उलट दिशेने फिरवा
pdfjs-page-rotate-ccw-button-label = घड्याळाच्या काट्याच्या उलट दिशेने फिरवा
pdfjs-cursor-text-select-tool-button =
    .title = मजकूर निवड साधन कार्यान्वयीत करा
pdfjs-cursor-text-select-tool-button-label = मजकूर निवड साधन
pdfjs-cursor-hand-tool-button =
    .title = हात साधन कार्यान्वित करा
pdfjs-cursor-hand-tool-button-label = हस्त साधन
pdfjs-scroll-vertical-button =
    .title = अनुलंब स्क्रोलिंग वापरा
pdfjs-scroll-vertical-button-label = अनुलंब स्क्रोलिंग
pdfjs-scroll-horizontal-button =
    .title = क्षैतिज स्क्रोलिंग वापरा
pdfjs-scroll-horizontal-button-label = क्षैतिज स्क्रोलिंग

## Document properties dialog

pdfjs-document-properties-button =
    .title = दस्तऐवज गुणधर्म…
pdfjs-document-properties-button-label = दस्तऐवज गुणधर्म…
pdfjs-document-properties-file-name = फाइलचे नाव:
pdfjs-document-properties-file-size = फाइल आकार:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } बाइट्स)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } बाइट्स)
pdfjs-document-properties-title = शिर्षक:
pdfjs-document-properties-author = लेखक:
pdfjs-document-properties-subject = विषय:
pdfjs-document-properties-keywords = मुख्यशब्द:
pdfjs-document-properties-creation-date = निर्माण दिनांक:
pdfjs-document-properties-modification-date = दुरूस्ती दिनांक:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = निर्माता:
pdfjs-document-properties-producer = PDF निर्माता:
pdfjs-document-properties-version = PDF आवृत्ती:
pdfjs-document-properties-page-count = पृष्ठ संख्या:
pdfjs-document-properties-page-size = पृष्ठ आकार:
pdfjs-document-properties-page-size-unit-inches = इंच
pdfjs-document-properties-page-size-unit-millimeters = मीमी
pdfjs-document-properties-page-size-orientation-portrait = उभी मांडणी
pdfjs-document-properties-page-size-orientation-landscape = आडवे
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Letter
pdfjs-document-properties-page-size-name-legal = Legal

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
pdfjs-document-properties-linearized = जलद वेब दृष्य:
pdfjs-document-properties-linearized-yes = हो
pdfjs-document-properties-linearized-no = नाही
pdfjs-document-properties-close-button = बंद करा

## Print

pdfjs-print-progress-message = छपाई करीता पृष्ठ तयार करीत आहे…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = रद्द करा
pdfjs-printing-not-supported = सावधानता: या ब्राउझरतर्फे छपाइ पूर्णपणे समर्थीत नाही.
pdfjs-printing-not-ready = सावधानता: छपाईकरिता PDF पूर्णतया लोड झाले नाही.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = बाजूचीपट्टी टॉगल करा
pdfjs-toggle-sidebar-button-label = बाजूचीपट्टी टॉगल करा
pdfjs-document-outline-button =
    .title = दस्तऐवज बाह्यरेखा दर्शवा (विस्तृत करण्यासाठी दोनवेळा क्लिक करा /सर्व घटक दाखवा)
pdfjs-document-outline-button-label = दस्तऐवज रूपरेषा
pdfjs-attachments-button =
    .title = जोडपत्र दाखवा
pdfjs-attachments-button-label = जोडपत्र
pdfjs-thumbs-button =
    .title = थंबनेल्स् दाखवा
pdfjs-thumbs-button-label = थंबनेल्स्
pdfjs-findbar-button =
    .title = दस्तऐवजात शोधा
pdfjs-findbar-button-label = शोधा

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = पृष्ठ { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = पृष्ठाचे थंबनेल { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = शोधा
    .placeholder = दस्तऐवजात शोधा…
pdfjs-find-previous-button =
    .title = वाकप्रयोगची मागील घटना शोधा
pdfjs-find-previous-button-label = मागील
pdfjs-find-next-button =
    .title = वाकप्रयोगची पुढील घटना शोधा
pdfjs-find-next-button-label = पुढील
pdfjs-find-highlight-checkbox = सर्व ठळक करा
pdfjs-find-match-case-checkbox-label = आकार जुळवा
pdfjs-find-entire-word-checkbox-label = संपूर्ण शब्द
pdfjs-find-reached-top = दस्तऐवजाच्या शीर्षकास पोहचले, तळपासून पुढे
pdfjs-find-reached-bottom = दस्तऐवजाच्या तळाला पोहचले, शीर्षकापासून पुढे
pdfjs-find-not-found = वाकप्रयोग आढळले नाही

## Predefined zoom values

pdfjs-page-scale-width = पृष्ठाची रूंदी
pdfjs-page-scale-fit = पृष्ठ बसवा
pdfjs-page-scale-auto = स्वयं लाहन किंवा मोठे करणे
pdfjs-page-scale-actual = प्रत्यक्ष आकार
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = PDF लोड करतेवेळी त्रुटी आढळली.
pdfjs-invalid-file-error = अवैध किंवा दोषीत PDF फाइल.
pdfjs-missing-file-error = न आढळणारी PDF फाइल.
pdfjs-unexpected-response-error = अनपेक्षित सर्व्हर प्रतिसाद.
pdfjs-rendering-error = पृष्ठ दाखवतेवेळी त्रुटी आढळली.

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
    .alt = [{ $type } टिपण्णी]

## Password

pdfjs-password-label = ही PDF फाइल उघडण्याकरिता पासवर्ड द्या.
pdfjs-password-invalid = अवैध पासवर्ड. कृपया पुन्हा प्रयत्न करा.
pdfjs-password-ok-button = ठीक आहे
pdfjs-password-cancel-button = रद्द करा
pdfjs-web-fonts-disabled = वेब टंक असमर्थीत आहेत: एम्बेडेड PDF टंक वापर अशक्य.

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