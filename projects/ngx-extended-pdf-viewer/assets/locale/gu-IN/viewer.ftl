# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = પહેલાનુ પાનું
pdfjs-previous-button-label = પહેલાનુ
pdfjs-next-button =
    .title = આગળનુ પાનું
pdfjs-next-button-label = આગળનું
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = પાનું
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = નો { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } નો { $pagesCount })
pdfjs-zoom-out-button =
    .title = મોટુ કરો
pdfjs-zoom-out-button-label = મોટુ કરો
pdfjs-zoom-in-button =
    .title = નાનું કરો
pdfjs-zoom-in-button-label = નાનું કરો
pdfjs-zoom-select =
    .title = નાનું મોટુ કરો
pdfjs-presentation-mode-button =
    .title = રજૂઆત સ્થિતિમાં જાવ
pdfjs-presentation-mode-button-label = રજૂઆત સ્થિતિ
pdfjs-open-file-button =
    .title = ફાઇલ ખોલો
pdfjs-open-file-button-label = ખોલો
pdfjs-print-button =
    .title = છાપો
pdfjs-print-button-label = છારો

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = સાધનો
pdfjs-tools-button-label = સાધનો
pdfjs-first-page-button =
    .title = પહેલાં પાનામાં જાવ
pdfjs-first-page-button-label = પ્રથમ પાનાં પર જાવ
pdfjs-last-page-button =
    .title = છેલ્લા પાનાં પર જાવ
pdfjs-last-page-button-label = છેલ્લા પાનાં પર જાવ
pdfjs-page-rotate-cw-button =
    .title = ઘડિયાળનાં કાંટા તરફ ફેરવો
pdfjs-page-rotate-cw-button-label = ઘડિયાળનાં કાંટા તરફ ફેરવો
pdfjs-page-rotate-ccw-button =
    .title = ઘડિયાળનાં કાંટાની ઉલટી દિશામાં ફેરવો
pdfjs-page-rotate-ccw-button-label = ઘડિયાળનાં કાંટાની વિરુદ્દ ફેરવો
pdfjs-cursor-text-select-tool-button =
    .title = ટેક્સ્ટ પસંદગી ટૂલ સક્ષમ કરો
pdfjs-cursor-text-select-tool-button-label = ટેક્સ્ટ પસંદગી ટૂલ
pdfjs-cursor-hand-tool-button =
    .title = હાથનાં સાધનને સક્રિય કરો
pdfjs-cursor-hand-tool-button-label = હેન્ડ ટૂલ
pdfjs-scroll-vertical-button =
    .title = ઊભી સ્ક્રોલિંગનો ઉપયોગ કરો
pdfjs-scroll-vertical-button-label = ઊભી સ્ક્રોલિંગ
pdfjs-scroll-horizontal-button =
    .title = આડી સ્ક્રોલિંગનો ઉપયોગ કરો
pdfjs-scroll-horizontal-button-label = આડી સ્ક્રોલિંગ
pdfjs-scroll-wrapped-button =
    .title = આવરિત સ્ક્રોલિંગનો ઉપયોગ કરો
pdfjs-scroll-wrapped-button-label = આવરિત સ્ક્રોલિંગ
pdfjs-spread-none-button =
    .title = પૃષ્ઠ સ્પ્રેડમાં જોડાવશો નહીં
pdfjs-spread-none-button-label = કોઈ સ્પ્રેડ નથી
pdfjs-spread-odd-button =
    .title = એકી-ક્રમાંકિત પૃષ્ઠો સાથે પ્રારંભ થતાં પૃષ્ઠ સ્પ્રેડમાં જોડાઓ
pdfjs-spread-odd-button-label = એકી સ્પ્રેડ્સ
pdfjs-spread-even-button =
    .title = નંબર-ક્રમાંકિત પૃષ્ઠોથી શરૂ થતાં પૃષ્ઠ સ્પ્રેડમાં જોડાઓ
pdfjs-spread-even-button-label = સરખું ફેલાવવું

## Document properties dialog

pdfjs-document-properties-button =
    .title = દસ્તાવેજ ગુણધર્મો…
pdfjs-document-properties-button-label = દસ્તાવેજ ગુણધર્મો…
pdfjs-document-properties-file-name = ફાઇલ નામ:
pdfjs-document-properties-file-size = ફાઇલ માપ:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } બાઇટ)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } બાઇટ)
pdfjs-document-properties-title = શીર્ષક:
pdfjs-document-properties-author = લેખક:
pdfjs-document-properties-subject = વિષય:
pdfjs-document-properties-keywords = કિવર્ડ:
pdfjs-document-properties-creation-date = નિર્માણ તારીખ:
pdfjs-document-properties-modification-date = ફેરફાર તારીખ:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = નિર્માતા:
pdfjs-document-properties-producer = PDF નિર્માતા:
pdfjs-document-properties-version = PDF આવૃત્તિ:
pdfjs-document-properties-page-count = પાનાં ગણતરી:
pdfjs-document-properties-page-size = પૃષ્ઠનું કદ:
pdfjs-document-properties-page-size-unit-inches = ઇંચ
pdfjs-document-properties-page-size-unit-millimeters = મીમી
pdfjs-document-properties-page-size-orientation-portrait = ઉભું
pdfjs-document-properties-page-size-orientation-landscape = આડુ
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = પત્ર
pdfjs-document-properties-page-size-name-legal = કાયદાકીય

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
pdfjs-document-properties-linearized = ઝડપી વૅબ દૃશ્ય:
pdfjs-document-properties-linearized-yes = હા
pdfjs-document-properties-linearized-no = ના
pdfjs-document-properties-close-button = બંધ કરો

## Print

pdfjs-print-progress-message = છાપકામ માટે દસ્તાવેજ તૈયાર કરી રહ્યા છે…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = રદ કરો
pdfjs-printing-not-supported = ચેતવણી: છાપવાનું આ બ્રાઉઝર દ્દારા સંપૂર્ણપણે આધારભૂત નથી.
pdfjs-printing-not-ready = Warning: PDF એ છાપવા માટે સંપૂર્ણપણે લાવેલ છે.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = ટૉગલ બાજુપટ્ટી
pdfjs-toggle-sidebar-button-label = ટૉગલ બાજુપટ્ટી
pdfjs-document-outline-button =
    .title = દસ્તાવેજની રૂપરેખા બતાવો(બધી આઇટમ્સને વિસ્તૃત/સંકુચિત કરવા માટે ડબલ-ક્લિક કરો)
pdfjs-document-outline-button-label = દસ્તાવેજ રૂપરેખા
pdfjs-attachments-button =
    .title = જોડાણોને બતાવો
pdfjs-attachments-button-label = જોડાણો
pdfjs-thumbs-button =
    .title = થંબનેલ્સ બતાવો
pdfjs-thumbs-button-label = થંબનેલ્સ
pdfjs-findbar-button =
    .title = દસ્તાવેજમાં શોધો
pdfjs-findbar-button-label = શોધો

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = પાનું { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = પાનાં { $page } નું થંબનેલ્સ

## Find panel button title and messages

pdfjs-find-input =
    .title = શોધો
    .placeholder = દસ્તાવેજમાં શોધો…
pdfjs-find-previous-button =
    .title = શબ્દસમૂહની પાછલી ઘટનાને શોધો
pdfjs-find-previous-button-label = પહેલાંનુ
pdfjs-find-next-button =
    .title = શબ્દસમૂહની આગળની ઘટનાને શોધો
pdfjs-find-next-button-label = આગળનું
pdfjs-find-highlight-checkbox = બધુ પ્રકાશિત કરો
pdfjs-find-match-case-checkbox-label = કેસ બંધબેસાડો
pdfjs-find-entire-word-checkbox-label = સંપૂર્ણ શબ્દો
pdfjs-find-reached-top = દસ્તાવેજનાં ટોચે પહોંચી ગયા, તળિયેથી ચાલુ કરેલ હતુ
pdfjs-find-reached-bottom = દસ્તાવેજનાં અંતે પહોંચી ગયા, ઉપરથી ચાલુ કરેલ હતુ
pdfjs-find-not-found = શબ્દસમૂહ મળ્યુ નથી

## Predefined zoom values

pdfjs-page-scale-width = પાનાની પહોળાઇ
pdfjs-page-scale-fit = પાનું બંધબેસતુ
pdfjs-page-scale-auto = આપમેળે નાનુંમોટુ કરો
pdfjs-page-scale-actual = ચોક્કસ માપ
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = ભૂલ ઉદ્ભવી જ્યારે PDF ને લાવી રહ્યા હોય.
pdfjs-invalid-file-error = અયોગ્ય અથવા ભાંગેલ PDF ફાઇલ.
pdfjs-missing-file-error = ગુમ થયેલ PDF ફાઇલ.
pdfjs-unexpected-response-error = અનપેક્ષિત સર્વર પ્રતિસાદ.
pdfjs-rendering-error = ભૂલ ઉદ્ભવી જ્યારે પાનાંનુ રેન્ડ કરી રહ્યા હોય.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } Annotation]

## Password

pdfjs-password-label = આ PDF ફાઇલને ખોલવા પાસવર્ડને દાખલ કરો.
pdfjs-password-invalid = અયોગ્ય પાસવર્ડ. મહેરબાની કરીને ફરી પ્રયત્ન કરો.
pdfjs-password-ok-button = બરાબર
pdfjs-password-cancel-button = રદ કરો
pdfjs-web-fonts-disabled = વેબ ફોન્ટ નિષ્ક્રિય થયેલ છે: ઍમ્બેડ થયેલ PDF ફોન્ટને વાપરવાનું અસમર્થ.

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
pdfjs-find-multiple-checkbox-label = Match Each Word
pdfjs-find-regexp-checkbox-label = Regular Expression