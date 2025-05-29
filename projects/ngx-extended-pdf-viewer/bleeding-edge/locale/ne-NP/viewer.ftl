# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = अघिल्लो पृष्ठ
pdfjs-previous-button-label = अघिल्लो
pdfjs-next-button =
    .title = पछिल्लो पृष्ठ
pdfjs-next-button-label = पछिल्लो
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = पृष्ठ
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = { $pagesCount } मध्ये
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pagesCount } को { $pageNumber })
pdfjs-zoom-out-button =
    .title = जुम घटाउनुहोस्
pdfjs-zoom-out-button-label = जुम घटाउनुहोस्
pdfjs-zoom-in-button =
    .title = जुम बढाउनुहोस्
pdfjs-zoom-in-button-label = जुम बढाउनुहोस्
pdfjs-zoom-select =
    .title = जुम गर्नुहोस्
pdfjs-presentation-mode-button =
    .title = प्रस्तुति मोडमा जानुहोस्
pdfjs-presentation-mode-button-label = प्रस्तुति मोड
pdfjs-open-file-button =
    .title = फाइल खोल्नुहोस्
pdfjs-open-file-button-label = खोल्नुहोस्
pdfjs-print-button =
    .title = मुद्रण गर्नुहोस्
pdfjs-print-button-label = मुद्रण गर्नुहोस्

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = औजारहरू
pdfjs-tools-button-label = औजारहरू
pdfjs-first-page-button =
    .title = पहिलो पृष्ठमा जानुहोस्
pdfjs-first-page-button-label = पहिलो पृष्ठमा जानुहोस्
pdfjs-last-page-button =
    .title = पछिल्लो पृष्ठमा जानुहोस्
pdfjs-last-page-button-label = पछिल्लो पृष्ठमा जानुहोस्
pdfjs-page-rotate-cw-button =
    .title = घडीको दिशामा घुमाउनुहोस्
pdfjs-page-rotate-cw-button-label = घडीको दिशामा घुमाउनुहोस्
pdfjs-page-rotate-ccw-button =
    .title = घडीको विपरित दिशामा घुमाउनुहोस्
pdfjs-page-rotate-ccw-button-label = घडीको विपरित दिशामा घुमाउनुहोस्
pdfjs-cursor-text-select-tool-button =
    .title = पाठ चयन उपकरण सक्षम गर्नुहोस्
pdfjs-cursor-text-select-tool-button-label = पाठ चयन उपकरण
pdfjs-cursor-hand-tool-button =
    .title = हाते उपकरण सक्षम गर्नुहोस्
pdfjs-cursor-hand-tool-button-label = हाते उपकरण
pdfjs-scroll-vertical-button =
    .title = ठाडो स्क्रोलिङ्ग प्रयोग गर्नुहोस्
pdfjs-scroll-vertical-button-label = ठाडो स्क्र्रोलिङ्ग
pdfjs-scroll-horizontal-button =
    .title = तेर्सो स्क्रोलिङ्ग प्रयोग गर्नुहोस्
pdfjs-scroll-horizontal-button-label = तेर्सो स्क्रोलिङ्ग
pdfjs-scroll-wrapped-button =
    .title = लिपि स्क्रोलिङ्ग प्रयोग गर्नुहोस्
pdfjs-scroll-wrapped-button-label = लिपि स्क्रोलिङ्ग
pdfjs-spread-none-button =
    .title = पृष्ठ स्प्रेडमा सामेल हुनुहुन्न
pdfjs-spread-none-button-label = स्प्रेड छैन

## Document properties dialog

pdfjs-document-properties-button =
    .title = कागजात विशेषताहरू...
pdfjs-document-properties-button-label = कागजात विशेषताहरू...
pdfjs-document-properties-file-name = फाइल नाम:
pdfjs-document-properties-file-size = फाइल आकार:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } bytes)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } bytes)
pdfjs-document-properties-title = शीर्षक:
pdfjs-document-properties-author = लेखक:
pdfjs-document-properties-subject = विषयः
pdfjs-document-properties-keywords = शब्दकुञ्जीः
pdfjs-document-properties-creation-date = सिर्जना गरिएको मिति:
pdfjs-document-properties-modification-date = परिमार्जित मिति:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = सर्जक:
pdfjs-document-properties-producer = PDF निर्माता:
pdfjs-document-properties-version = PDF संस्करण
pdfjs-document-properties-page-count = पृष्ठ गणना:
pdfjs-document-properties-page-size = पृष्ठ आकार:
pdfjs-document-properties-page-size-unit-inches = इन्च
pdfjs-document-properties-page-size-unit-millimeters = मि.मि.
pdfjs-document-properties-page-size-orientation-portrait = पोट्रेट
pdfjs-document-properties-page-size-orientation-landscape = परिदृश्य
pdfjs-document-properties-page-size-name-letter = अक्षर
pdfjs-document-properties-page-size-name-legal = कानूनी

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page


##

pdfjs-document-properties-linearized-yes = हो
pdfjs-document-properties-linearized-no = होइन
pdfjs-document-properties-close-button = बन्द गर्नुहोस्

## Print

pdfjs-print-progress-message = मुद्रणका लागि कागजात तयारी गरिदै…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = रद्द गर्नुहोस्
pdfjs-printing-not-supported = चेतावनी: यो ब्राउजरमा मुद्रण पूर्णतया समर्थित छैन।
pdfjs-printing-not-ready = चेतावनी: PDF मुद्रणका लागि पूर्णतया लोड भएको छैन।

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = टगल साइडबार
pdfjs-toggle-sidebar-button-label = टगल साइडबार
pdfjs-document-outline-button =
    .title = कागजातको रूपरेखा देखाउनुहोस् (सबै वस्तुहरू विस्तार/पतन गर्न डबल-क्लिक गर्नुहोस्)
pdfjs-document-outline-button-label = दस्तावेजको रूपरेखा
pdfjs-attachments-button =
    .title = संलग्नहरू देखाउनुहोस्
pdfjs-attachments-button-label = संलग्नकहरू
pdfjs-thumbs-button =
    .title = थम्बनेलहरू देखाउनुहोस्
pdfjs-thumbs-button-label = थम्बनेलहरू
pdfjs-findbar-button =
    .title = कागजातमा फेला पार्नुहोस्
pdfjs-findbar-button-label = फेला पार्नुहोस्

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = पृष्ठ { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = { $page } पृष्ठको थम्बनेल

## Find panel button title and messages

pdfjs-find-input =
    .title = फेला पार्नुहोस्
    .placeholder = कागजातमा फेला पार्नुहोस्…
pdfjs-find-previous-button =
    .title = यस वाक्यांशको अघिल्लो घटना फेला पार्नुहोस्
pdfjs-find-previous-button-label = अघिल्लो
pdfjs-find-next-button =
    .title = यस वाक्यांशको पछिल्लो घटना फेला पार्नुहोस्
pdfjs-find-next-button-label = अर्को
pdfjs-find-highlight-checkbox = सबै हाइलाइट गर्ने
pdfjs-find-match-case-checkbox-label = केस जोडा मिलाउनुहोस्
pdfjs-find-entire-word-checkbox-label = पुरा शब्दहरु
pdfjs-find-reached-top = पृष्ठको शिर्षमा पुगीयो, तलबाट जारी गरिएको थियो
pdfjs-find-reached-bottom = पृष्ठको अन्त्यमा पुगीयो, शिर्षबाट जारी गरिएको थियो
pdfjs-find-not-found = वाक्यांश फेला परेन

## Predefined zoom values

pdfjs-page-scale-width = पृष्ठ चौडाइ
pdfjs-page-scale-fit = पृष्ठ ठिक्क मिल्ने
pdfjs-page-scale-auto = स्वचालित जुम
pdfjs-page-scale-actual = वास्तविक आकार
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = यो PDF लोड गर्दा एउटा त्रुटि देखापर्‍यो।
pdfjs-invalid-file-error = अवैध वा दुषित PDF फाइल।
pdfjs-missing-file-error = हराईरहेको PDF फाइल।
pdfjs-unexpected-response-error = अप्रत्याशित सर्भर प्रतिक्रिया।
pdfjs-rendering-error = पृष्ठ प्रतिपादन गर्दा एउटा त्रुटि देखापर्‍यो।

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } Annotation]

## Password

pdfjs-password-label = यस PDF फाइललाई खोल्न गोप्यशब्द प्रविष्ट गर्नुहोस्।
pdfjs-password-invalid = अवैध गोप्यशब्द। पुनः प्रयास गर्नुहोस्।
pdfjs-password-ok-button = ठिक छ
pdfjs-password-cancel-button = रद्द गर्नुहोस्
pdfjs-web-fonts-disabled = वेब फन्ट असक्षम छन्: एम्बेडेड PDF फन्ट प्रयोग गर्न असमर्थ।

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
pdfjs-spread-odd-button =
    .title = Join page spreads starting with odd-numbered pages
pdfjs-spread-odd-button-label = Odd Spreads
pdfjs-spread-even-button =
    .title = Join page spreads starting with even-numbered pages
pdfjs-spread-even-button-label = Even Spreads
pdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } KB ({ $b } bytes)
pdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } MB ({ $b } bytes)
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })
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
pdfjs-find-multiple-checkbox-label = Match Each Word
pdfjs-find-regexp-checkbox-label = Regular Expression