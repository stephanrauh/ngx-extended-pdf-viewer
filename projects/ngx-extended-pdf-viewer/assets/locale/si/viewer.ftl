# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = කලින් පිටුව
pdfjs-previous-button-label = කලින්
pdfjs-next-button =
    .title = ඊළඟ පිටුව
pdfjs-next-button-label = ඊළඟ
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = පිටුව
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } / { $pagesCount })
pdfjs-zoom-out-button =
    .title = කුඩාලනය
pdfjs-zoom-out-button-label = කුඩාලනය
pdfjs-zoom-in-button =
    .title = විශාලනය
pdfjs-zoom-in-button-label = විශාලනය
pdfjs-zoom-select =
    .title = විශාල කරන්න
pdfjs-presentation-mode-button =
    .title = සමර්පණ ප්‍රකාරය වෙත මාරුවන්න
pdfjs-presentation-mode-button-label = සමර්පණ ප්‍රකාරය
pdfjs-open-file-button =
    .title = ගොනුව අරින්න
pdfjs-open-file-button-label = අරින්න
pdfjs-print-button =
    .title = මුද්‍රණය
pdfjs-print-button-label = මුද්‍රණය
pdfjs-save-button =
    .title = සුරකින්න
pdfjs-save-button-label = සුරකින්න
# Used in Firefox for Android as a tooltip for the download button (“download” is a verb).
pdfjs-download-button =
    .title = බාගන්න
# Used in Firefox for Android as a label for the download button (“download” is a verb).
# Length of the translation matters since we are in a mobile context, with limited screen estate.
pdfjs-download-button-label = බාගන්න
pdfjs-bookmark-button-label = පවතින පිටුව

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = මෙවලම්
pdfjs-tools-button-label = මෙවලම්
pdfjs-first-page-button =
    .title = මුල් පිටුවට යන්න
pdfjs-first-page-button-label = මුල් පිටුවට යන්න
pdfjs-last-page-button =
    .title = අවසන් පිටුවට යන්න
pdfjs-last-page-button-label = අවසන් පිටුවට යන්න
pdfjs-cursor-text-select-tool-button =
    .title = පෙළ තේරීමේ මෙවලම සබල කරන්න
pdfjs-cursor-text-select-tool-button-label = පෙළ තේරීමේ මෙවලම
pdfjs-cursor-hand-tool-button =
    .title = අත් මෙවලම සබල කරන්න
pdfjs-cursor-hand-tool-button-label = අත් මෙවලම
pdfjs-scroll-page-button =
    .title = පිටුව අනුචලනය භාවිතය
pdfjs-scroll-page-button-label = පිටුව අනුචලනය
pdfjs-scroll-vertical-button =
    .title = සිරස් අනුචලනය භාවිතය
pdfjs-scroll-vertical-button-label = සිරස් අනුචලනය
pdfjs-scroll-horizontal-button =
    .title = තිරස් අනුචලනය භාවිතය
pdfjs-scroll-horizontal-button-label = තිරස් අනුචලනය

## Document properties dialog

pdfjs-document-properties-button =
    .title = ලේඛනයේ ගුණාංග…
pdfjs-document-properties-button-label = ලේඛනයේ ගුණාංග…
pdfjs-document-properties-file-name = ගොනුවේ නම:
pdfjs-document-properties-file-size = ගොනුවේ ප්‍රමාණය:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = කි.බ. { $size_kb } (බයිට { $size_b })
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = මෙ.බ. { $size_mb } (බයිට { $size_b })
pdfjs-document-properties-title = සිරැසිය:
pdfjs-document-properties-author = කතෘ:
pdfjs-document-properties-subject = මාතෘකාව:
pdfjs-document-properties-keywords = මූල පද:
pdfjs-document-properties-creation-date = සෑදූ දිනය:
pdfjs-document-properties-modification-date = සංශෝධිත දිනය:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = නිර්මාතෘ:
pdfjs-document-properties-producer = පීඩීඑෆ් සම්පාදක:
pdfjs-document-properties-version = පීඩීඑෆ් අනුවාදය:
pdfjs-document-properties-page-count = පිටු ගණන:
pdfjs-document-properties-page-size = පිටුවේ තරම:
pdfjs-document-properties-page-size-unit-inches = අඟල්
pdfjs-document-properties-page-size-unit-millimeters = මි.මී.
pdfjs-document-properties-page-size-orientation-portrait = සිරස්
pdfjs-document-properties-page-size-orientation-landscape = තිරස්
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width }×{ $height }{ $unit }{ $name }{ $orientation }

##

# The linearization status of the document; usually called "Fast Web View" in
# English locales of Adobe software.
pdfjs-document-properties-linearized = වේගවත් වියමන දැක්ම:
pdfjs-document-properties-linearized-yes = ඔව්
pdfjs-document-properties-linearized-no = නැහැ
pdfjs-document-properties-close-button = වසන්න

## Print

pdfjs-print-progress-message = මුද්‍රණය සඳහා ලේඛනය සූදානම් වෙමින්…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = අවලංගු කරන්න
pdfjs-printing-not-supported = අවවාදයයි: මෙම අතිරික්සුව මුද්‍රණය සඳහා හොඳින් සහාය නොදක්වයි.
pdfjs-printing-not-ready = අවවාදයයි: මුද්‍රණයට පීඩීඑෆ් ගොනුව සම්පූර්ණයෙන් පූරණය වී නැත.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-document-outline-button-label = ලේඛනයේ වටසන
pdfjs-attachments-button =
    .title = ඇමුණුම් පෙන්වන්න
pdfjs-attachments-button-label = ඇමුණුම්
pdfjs-layers-button =
    .title = ස්තර පෙන්වන්න (සියළු ස්තර පෙරනිමි තත්‍වයට යළි සැකසීමට දෙවරක් ඔබන්න)
pdfjs-layers-button-label = ස්තර
pdfjs-thumbs-button =
    .title = සිඟිති රූ පෙන්වන්න
pdfjs-thumbs-button-label = සිඟිති රූ
pdfjs-findbar-button =
    .title = ලේඛනයෙහි සොයන්න
pdfjs-findbar-button-label = සොයන්න
pdfjs-additional-layers = අතිරේක ස්තර

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = පිටුව { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = පිටුවේ සිඟිත රූව { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = සොයන්න
    .placeholder = ලේඛනයේ සොයන්න…
pdfjs-find-previous-button =
    .title = මෙම වැකිකඩ කලින් යෙදුණු ස්ථානය සොයන්න
pdfjs-find-previous-button-label = කලින්
pdfjs-find-next-button =
    .title = මෙම වැකිකඩ ඊළඟට යෙදෙන ස්ථානය සොයන්න
pdfjs-find-next-button-label = ඊළඟ
pdfjs-find-highlight-checkbox = සියල්ල උද්දීපනය
pdfjs-find-entire-word-checkbox-label = සමස්ත වචන
pdfjs-find-reached-top = ලේඛනයේ මුදුනට ළඟා විය, පහළ සිට ඉහළට
pdfjs-find-reached-bottom = ලේඛනයේ අවසානයට ළඟා විය, ඉහළ සිට පහළට
pdfjs-find-not-found = වැකිකඩ හමු නොවුණි

## Predefined zoom values

pdfjs-page-scale-width = පිටුවේ පළල
pdfjs-page-scale-auto = ස්වයංක්‍රීය විශාලනය
pdfjs-page-scale-actual = සැබෑ ප්‍රමාණය
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = පිටුව { $page }

## Loading indicator messages

pdfjs-loading-error = පීඩීඑෆ් පූරණය කිරීමේදී දෝෂයක් සිදු විය.
pdfjs-invalid-file-error = වලංගු නොවන හෝ හානිවූ පීඩීඑෆ් ගොනුවකි.
pdfjs-missing-file-error = මඟහැරුණු පීඩීඑෆ් ගොනුවකි.
pdfjs-unexpected-response-error = අනපේක්‍ෂිත සේවාදායක ප්‍රතිචාරයකි.

## Annotations

# Variables:
#   $date (Date) - the modification date of the annotation
#   $time (Time) - the modification time of the annotation
pdfjs-annotation-date-string = { $date }, { $time }

## Password

pdfjs-password-label = මෙම පීඩීඑෆ් ගොනුව විවෘත කිරීමට මුරපදය යොදන්න.
pdfjs-password-invalid = වැරදි මුරපදයකි. නැවත උත්සාහ කරන්න.
pdfjs-password-ok-button = හරි
pdfjs-password-cancel-button = අවලංගු
pdfjs-web-fonts-disabled = වියමන අකුරු අබලයි: පීඩීඑෆ් වෙත කාවැද්දූ රුවකුරු භාවිතා කළ නොහැකිය.

## Editing

pdfjs-editor-free-text-button =
    .title = පෙළ
pdfjs-editor-free-text-button-label = පෙළ
pdfjs-editor-ink-button =
    .title = අඳින්න
pdfjs-editor-ink-button-label = අඳින්න
pdfjs-editor-stamp-button =
    .title = රූප සංස්කරණය හෝ එක් කරන්න
pdfjs-editor-stamp-button-label = රූප සංස්කරණය හෝ එක් කරන්න

## Remove button for the various kind of editor.


##

# Editor Parameters
pdfjs-editor-free-text-color-input = වර්ණය
pdfjs-editor-free-text-size-input = තරම
pdfjs-editor-ink-color-input = වර්ණය
pdfjs-editor-ink-thickness-input = ඝණකම
pdfjs-free-text =
    .aria-label = වදන් සකසනය
pdfjs-free-text-default-content = ලිවීීම අරඹන්න…

## Alt-text dialog

pdfjs-editor-alt-text-mark-decorative-description = මෙය දාර හෝ දිය සලකුණු වැනි අලංකාර රූප සඳහා භාවිතා වේ.

## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.


## Color picker


## Show all highlights
## This is a toggle button to show/hide all the highlights.


## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.


## Image alt-text settings


# Translations for ngx-extended-pdf-viewer additions only available in en-US
pdfjs-of-pages = of { $pagesCount }
pdfjs-page-rotate-cw-button =
    .title = Rotate Clockwise
pdfjs-page-rotate-cw-button-label = Rotate Clockwise
pdfjs-page-rotate-ccw-button =
    .title = Rotate Counterclockwise
pdfjs-page-rotate-ccw-button-label = Rotate Counterclockwise
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
pdfjs-document-properties-page-size-name-letter = Letter
pdfjs-document-properties-page-size-name-legal = Legal
pdfjs-toggle-sidebar-button =
    .title = Toggle Sidebar
pdfjs-toggle-sidebar-notification-button =
    .title = Toggle Sidebar (document contains outline/attachments/layers)
pdfjs-toggle-sidebar-button-label = Toggle Sidebar
pdfjs-current-outline-item-button =
    .title = Find Current Outline Item
pdfjs-current-outline-item-button-label = Current Outline Item
pdfjs-find-match-case-checkbox-label = Match Case
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
pdfjs-page-scale-fit = Page Fit
pdfjs-rendering-error = An error occurred while rendering the page.
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-text-annotation-type =
    .alt = [{ $type } Annotation]
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