# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = पिछला पृष्ठ
pdfjs-previous-button-label = पिछला
pdfjs-next-button =
    .title = अगला पृष्ठ
pdfjs-next-button-label = आगे
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = पृष्ठ:
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = { $pagesCount } का
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } of { $pagesCount })
pdfjs-zoom-out-button =
    .title = छोटा करें
pdfjs-zoom-out-button-label = छोटा करें
pdfjs-zoom-in-button =
    .title = बड़ा करें
pdfjs-zoom-in-button-label = बड़ा करें
pdfjs-zoom-select =
    .title = बड़ा-छोटा करें
pdfjs-presentation-mode-button =
    .title = प्रस्तुति अवस्था में जाएँ
pdfjs-presentation-mode-button-label = प्रस्तुति अवस्था
pdfjs-open-file-button =
    .title = फ़ाइल खोलें
pdfjs-open-file-button-label = खोलें
pdfjs-print-button =
    .title = छापें
pdfjs-print-button-label = छापें

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = औज़ार
pdfjs-tools-button-label = औज़ार
pdfjs-first-page-button =
    .title = प्रथम पृष्ठ पर जाएँ
pdfjs-first-page-button-label = प्रथम पृष्ठ पर जाएँ
pdfjs-last-page-button =
    .title = अंतिम पृष्ठ पर जाएँ
pdfjs-last-page-button-label = अंतिम पृष्ठ पर जाएँ
pdfjs-page-rotate-cw-button =
    .title = घड़ी की दिशा में घुमाएँ
pdfjs-page-rotate-cw-button-label = घड़ी की दिशा में घुमाएँ
pdfjs-page-rotate-ccw-button =
    .title = घड़ी की दिशा से उल्टा घुमाएँ
pdfjs-page-rotate-ccw-button-label = घड़ी की दिशा से उल्टा घुमाएँ
pdfjs-cursor-text-select-tool-button =
    .title = पाठ चयन उपकरण सक्षम करें
pdfjs-cursor-text-select-tool-button-label = पाठ चयन उपकरण
pdfjs-cursor-hand-tool-button =
    .title = हस्त उपकरण सक्षम करें
pdfjs-cursor-hand-tool-button-label = हस्त उपकरण
pdfjs-scroll-vertical-button =
    .title = लंबवत स्क्रॉलिंग का उपयोग करें
pdfjs-scroll-vertical-button-label = लंबवत स्क्रॉलिंग
pdfjs-scroll-horizontal-button =
    .title = क्षितिजिय स्क्रॉलिंग का उपयोग करें
pdfjs-scroll-horizontal-button-label = क्षितिजिय स्क्रॉलिंग
pdfjs-scroll-wrapped-button =
    .title = व्राप्पेड स्क्रॉलिंग का उपयोग करें
pdfjs-spread-none-button-label = कोई स्प्रेड उपलब्ध नहीं
pdfjs-spread-odd-button =
    .title = विषम-क्रमांकित पृष्ठों से प्रारंभ होने वाले पृष्ठ स्प्रेड में शामिल हों
pdfjs-spread-odd-button-label = विषम फैलाव

## Document properties dialog

pdfjs-document-properties-button =
    .title = दस्तावेज़ विशेषता...
pdfjs-document-properties-button-label = दस्तावेज़ विशेषता...
pdfjs-document-properties-file-name = फ़ाइल नाम:
pdfjs-document-properties-file-size = फाइल आकारः
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } bytes)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } bytes)
pdfjs-document-properties-title = शीर्षक:
pdfjs-document-properties-author = लेखकः
pdfjs-document-properties-subject = विषय:
pdfjs-document-properties-keywords = कुंजी-शब्द:
pdfjs-document-properties-creation-date = निर्माण दिनांक:
pdfjs-document-properties-modification-date = संशोधन दिनांक:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = निर्माता:
pdfjs-document-properties-producer = PDF उत्पादक:
pdfjs-document-properties-version = PDF संस्करण:
pdfjs-document-properties-page-count = पृष्ठ गिनती:
pdfjs-document-properties-page-size = पृष्ठ आकार:
pdfjs-document-properties-page-size-unit-inches = इंच
pdfjs-document-properties-page-size-unit-millimeters = मिमी
pdfjs-document-properties-page-size-orientation-portrait = पोर्ट्रेट
pdfjs-document-properties-page-size-orientation-landscape = लैंडस्केप
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = पत्र
pdfjs-document-properties-page-size-name-legal = क़ानूनी

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
pdfjs-document-properties-linearized = तीव्र वेब व्यू:
pdfjs-document-properties-linearized-yes = हाँ
pdfjs-document-properties-linearized-no = नहीं
pdfjs-document-properties-close-button = बंद करें

## Print

pdfjs-print-progress-message = छपाई के लिए दस्तावेज़ को तैयार किया जा रहा है...
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = रद्द करें
pdfjs-printing-not-supported = चेतावनी: इस ब्राउज़र पर छपाई पूरी तरह से समर्थित नहीं है.
pdfjs-printing-not-ready = चेतावनी: PDF छपाई के लिए पूरी तरह से लोड नहीं है.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = स्लाइडर टॉगल करें
pdfjs-toggle-sidebar-button-label = स्लाइडर टॉगल करें
pdfjs-document-outline-button =
    .title = दस्तावेज़ की रूपरेखा दिखाइए (सारी वस्तुओं को फलने अथवा समेटने के लिए दो बार क्लिक करें)
pdfjs-document-outline-button-label = दस्तावेज़ आउटलाइन
pdfjs-attachments-button =
    .title = संलग्नक दिखायें
pdfjs-attachments-button-label = संलग्नक
pdfjs-thumbs-button =
    .title = लघुछवियाँ दिखाएँ
pdfjs-thumbs-button-label = लघु छवि
pdfjs-findbar-button =
    .title = दस्तावेज़ में ढूँढ़ें
pdfjs-findbar-button-label = ढूँढें

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = पृष्ठ { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = पृष्ठ { $page } की लघु-छवि

## Find panel button title and messages

pdfjs-find-input =
    .title = ढूँढें
    .placeholder = दस्तावेज़ में खोजें...
pdfjs-find-previous-button =
    .title = वाक्यांश की पिछली उपस्थिति ढूँढ़ें
pdfjs-find-previous-button-label = पिछला
pdfjs-find-next-button =
    .title = वाक्यांश की अगली उपस्थिति ढूँढ़ें
pdfjs-find-next-button-label = अगला
pdfjs-find-highlight-checkbox = सभी आलोकित करें
pdfjs-find-match-case-checkbox-label = मिलान स्थिति
pdfjs-find-entire-word-checkbox-label = संपूर्ण शब्द
pdfjs-find-reached-top = पृष्ठ के ऊपर पहुंच गया, नीचे से जारी रखें
pdfjs-find-reached-bottom = पृष्ठ के नीचे में जा पहुँचा, ऊपर से जारी
pdfjs-find-not-found = वाक्यांश नहीं मिला

## Predefined zoom values

pdfjs-page-scale-width = पृष्ठ चौड़ाई
pdfjs-page-scale-fit = पृष्ठ फिट
pdfjs-page-scale-auto = स्वचालित जूम
pdfjs-page-scale-actual = वास्तविक आकार
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = PDF लोड करते समय एक त्रुटि हुई.
pdfjs-invalid-file-error = अमान्य या भ्रष्ट PDF फ़ाइल.
pdfjs-missing-file-error = अनुपस्थित PDF फ़ाइल.
pdfjs-unexpected-response-error = अप्रत्याशित सर्वर प्रतिक्रिया.
pdfjs-rendering-error = पृष्ठ रेंडरिंग के दौरान त्रुटि आई.

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
    .alt = [{ $type } Annotation]

## Password

pdfjs-password-label = इस PDF फ़ाइल को खोलने के लिए कृपया कूटशब्द भरें.
pdfjs-password-invalid = अवैध कूटशब्द, कृपया फिर कोशिश करें.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = रद्द करें
pdfjs-web-fonts-disabled = वेब फॉन्ट्स निष्क्रिय हैं: अंतःस्थापित PDF फॉन्टस के उपयोग में असमर्थ.

## Editing


## Remove button for the various kind of editor.


##

# Editor Parameters
pdfjs-editor-free-text-color-input = रंग

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
pdfjs-scroll-wrapped-button-label = Wrapped Scrolling
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