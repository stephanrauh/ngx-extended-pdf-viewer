# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = முந்தைய பக்கம்
pdfjs-previous-button-label = முந்தையது
pdfjs-next-button =
    .title = அடுத்த பக்கம்
pdfjs-next-button-label = அடுத்து
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = பக்கம்
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = { $pagesCount } இல்
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = { $pagesCount }) இல் ({ $pageNumber }
pdfjs-zoom-out-button =
    .title = சிறிதாக்கு
pdfjs-zoom-out-button-label = சிறிதாக்கு
pdfjs-zoom-in-button =
    .title = பெரிதாக்கு
pdfjs-zoom-in-button-label = பெரிதாக்கு
pdfjs-zoom-select =
    .title = பெரிதாக்கு
pdfjs-presentation-mode-button =
    .title = விளக்ககாட்சி பயன்முறைக்கு மாறு
pdfjs-presentation-mode-button-label = விளக்ககாட்சி பயன்முறை
pdfjs-open-file-button =
    .title = கோப்பினை திற
pdfjs-open-file-button-label = திற
pdfjs-print-button =
    .title = அச்சிடு
pdfjs-print-button-label = அச்சிடு

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = கருவிகள்
pdfjs-tools-button-label = கருவிகள்
pdfjs-first-page-button =
    .title = முதல் பக்கத்திற்கு செல்லவும்
pdfjs-first-page-button-label = முதல் பக்கத்திற்கு செல்லவும்
pdfjs-last-page-button =
    .title = கடைசி பக்கத்திற்கு செல்லவும்
pdfjs-last-page-button-label = கடைசி பக்கத்திற்கு செல்லவும்
pdfjs-page-rotate-cw-button =
    .title = வலஞ்சுழியாக சுழற்று
pdfjs-page-rotate-cw-button-label = வலஞ்சுழியாக சுழற்று
pdfjs-page-rotate-ccw-button =
    .title = இடஞ்சுழியாக சுழற்று
pdfjs-page-rotate-ccw-button-label = இடஞ்சுழியாக சுழற்று
pdfjs-cursor-text-select-tool-button =
    .title = உரைத் தெரிவு கருவியைச் செயல்படுத்து
pdfjs-cursor-text-select-tool-button-label = உரைத் தெரிவு கருவி
pdfjs-cursor-hand-tool-button =
    .title = கைக் கருவிக்ச் செயற்படுத்து
pdfjs-cursor-hand-tool-button-label = கைக்குருவி

## Document properties dialog

pdfjs-document-properties-button =
    .title = ஆவண பண்புகள்...
pdfjs-document-properties-button-label = ஆவண பண்புகள்...
pdfjs-document-properties-file-name = கோப்பு பெயர்:
pdfjs-document-properties-file-size = கோப்பின் அளவு:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } கிபை ({ $size_b } பைட்டுகள்)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } மெபை ({ $size_b } பைட்டுகள்)
pdfjs-document-properties-title = தலைப்பு:
pdfjs-document-properties-author = எழுதியவர்
pdfjs-document-properties-subject = பொருள்:
pdfjs-document-properties-keywords = முக்கிய வார்த்தைகள்:
pdfjs-document-properties-creation-date = படைத்த தேதி :
pdfjs-document-properties-modification-date = திருத்திய தேதி:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = உருவாக்குபவர்:
pdfjs-document-properties-producer = பிடிஎஃப் தயாரிப்பாளர்:
pdfjs-document-properties-version = PDF பதிப்பு:
pdfjs-document-properties-page-count = பக்க எண்ணிக்கை:
pdfjs-document-properties-page-size = பக்க அளவு:
pdfjs-document-properties-page-size-unit-inches = இதில்
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = நிலைபதிப்பு
pdfjs-document-properties-page-size-orientation-landscape = நிலைபரப்பு
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = கடிதம்
pdfjs-document-properties-page-size-name-legal = சட்டபூர்வ

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })

##

pdfjs-document-properties-close-button = மூடுக

## Print

pdfjs-print-progress-message = அச்சிடுவதற்கான ஆவணம் தயாராகிறது...
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = ரத்து
pdfjs-printing-not-supported = எச்சரிக்கை: இந்த உலாவி அச்சிடுதலை முழுமையாக ஆதரிக்கவில்லை.
pdfjs-printing-not-ready = எச்சரிக்கை: PDF அச்சிட முழுவதுமாக ஏற்றப்படவில்லை.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = பக்கப் பட்டியை நிலைமாற்று
pdfjs-toggle-sidebar-button-label = பக்கப் பட்டியை நிலைமாற்று
pdfjs-document-outline-button =
    .title = ஆவண அடக்கத்தைக் காட்டு (இருமுறைச் சொடுக்கி அனைத்து உறுப்பிடிகளையும் விரி/சேர்)
pdfjs-document-outline-button-label = ஆவண வெளிவரை
pdfjs-attachments-button =
    .title = இணைப்புகளை காண்பி
pdfjs-attachments-button-label = இணைப்புகள்
pdfjs-thumbs-button =
    .title = சிறுபடங்களைக் காண்பி
pdfjs-thumbs-button-label = சிறுபடங்கள்
pdfjs-findbar-button =
    .title = ஆவணத்தில் கண்டறி
pdfjs-findbar-button-label = தேடு

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = பக்கம் { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = பக்கத்தின் சிறுபடம் { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = கண்டுபிடி
    .placeholder = ஆவணத்தில் கண்டறி…
pdfjs-find-previous-button =
    .title = இந்த சொற்றொடரின் முந்தைய நிகழ்வை தேடு
pdfjs-find-previous-button-label = முந்தையது
pdfjs-find-next-button =
    .title = இந்த சொற்றொடரின் அடுத்த நிகழ்வை தேடு
pdfjs-find-next-button-label = அடுத்து
pdfjs-find-highlight-checkbox = அனைத்தையும் தனிப்படுத்து
pdfjs-find-match-case-checkbox-label = பேரெழுத்தாக்கத்தை உணர்
pdfjs-find-reached-top = ஆவணத்தின் மேல் பகுதியை அடைந்தது, அடிப்பக்கத்திலிருந்து தொடர்ந்தது
pdfjs-find-reached-bottom = ஆவணத்தின் முடிவை அடைந்தது, மேலிருந்து தொடர்ந்தது
pdfjs-find-not-found = சொற்றொடர் காணவில்லை

## Predefined zoom values

pdfjs-page-scale-width = பக்க அகலம்
pdfjs-page-scale-fit = பக்கப் பொருத்தம்
pdfjs-page-scale-auto = தானியக்க பெரிதாக்கல்
pdfjs-page-scale-actual = உண்மையான அளவு
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = PDF ஐ ஏற்றும் போது ஒரு பிழை ஏற்பட்டது.
pdfjs-invalid-file-error = செல்லுபடியாகாத அல்லது சிதைந்த PDF கோப்பு.
pdfjs-missing-file-error = PDF கோப்பு காணவில்லை.
pdfjs-unexpected-response-error = சேவகன் பதில் எதிர்பாரதது.
pdfjs-rendering-error = இந்தப் பக்கத்தை காட்சிப்படுத்தும் போது ஒரு பிழை ஏற்பட்டது.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } விளக்கம்]

## Password

pdfjs-password-label = இந்த PDF கோப்பை திறக்க கடவுச்சொல்லை உள்ளிடவும்.
pdfjs-password-invalid = செல்லுபடியாகாத கடவுச்சொல், தயை செய்து மீண்டும் முயற்சி செய்க.
pdfjs-password-ok-button = சரி
pdfjs-password-cancel-button = ரத்து
pdfjs-web-fonts-disabled = வலை எழுத்துருக்கள் முடக்கப்பட்டுள்ளன: உட்பொதிக்கப்பட்ட PDF எழுத்துருக்களைப் பயன்படுத்த முடியவில்லை.

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
pdfjs-document-properties-linearized = Fast Web View:
pdfjs-document-properties-linearized-yes = Yes
pdfjs-document-properties-linearized-no = No
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
pdfjs-find-multiple-checkbox-label = match each word
pdfjs-find-regexp-checkbox-label = regular expression