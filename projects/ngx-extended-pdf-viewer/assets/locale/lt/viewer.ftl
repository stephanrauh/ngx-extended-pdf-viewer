# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Ankstesnis puslapis
pdfjs-previous-button-label = Ankstesnis
pdfjs-next-button =
    .title = Kitas puslapis
pdfjs-next-button-label = Kitas
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Puslapis
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = iš { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } iš { $pagesCount })
pdfjs-zoom-out-button =
    .title = Sumažinti
pdfjs-zoom-out-button-label = Sumažinti
pdfjs-zoom-in-button =
    .title = Padidinti
pdfjs-zoom-in-button-label = Padidinti
pdfjs-zoom-select =
    .title = Mastelis
pdfjs-presentation-mode-button =
    .title = Pereiti į pateikties veikseną
pdfjs-presentation-mode-button-label = Pateikties veiksena
pdfjs-open-file-button =
    .title = Atverti failą
pdfjs-open-file-button-label = Atverti
pdfjs-print-button =
    .title = Spausdinti
pdfjs-print-button-label = Spausdinti

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Priemonės
pdfjs-tools-button-label = Priemonės
pdfjs-first-page-button =
    .title = Eiti į pirmą puslapį
pdfjs-first-page-button-label = Eiti į pirmą puslapį
pdfjs-last-page-button =
    .title = Eiti į paskutinį puslapį
pdfjs-last-page-button-label = Eiti į paskutinį puslapį
pdfjs-page-rotate-cw-button =
    .title = Pasukti pagal laikrodžio rodyklę
pdfjs-page-rotate-cw-button-label = Pasukti pagal laikrodžio rodyklę
pdfjs-page-rotate-ccw-button =
    .title = Pasukti prieš laikrodžio rodyklę
pdfjs-page-rotate-ccw-button-label = Pasukti prieš laikrodžio rodyklę
pdfjs-cursor-text-select-tool-button =
    .title = Įjungti teksto žymėjimo įrankį
pdfjs-cursor-text-select-tool-button-label = Teksto žymėjimo įrankis
pdfjs-cursor-hand-tool-button =
    .title = Įjungti vilkimo įrankį
pdfjs-cursor-hand-tool-button-label = Vilkimo įrankis
pdfjs-scroll-page-button =
    .title = Naudoti puslapio slinkimą
pdfjs-scroll-page-button-label = Puslapio slinkimas
pdfjs-scroll-vertical-button =
    .title = Naudoti vertikalų slinkimą
pdfjs-scroll-vertical-button-label = Vertikalus slinkimas
pdfjs-scroll-horizontal-button =
    .title = Naudoti horizontalų slinkimą
pdfjs-scroll-horizontal-button-label = Horizontalus slinkimas
pdfjs-scroll-wrapped-button =
    .title = Naudoti išklotą slinkimą
pdfjs-scroll-wrapped-button-label = Išklotas slinkimas
pdfjs-spread-none-button =
    .title = Nejungti puslapių į dvilapius
pdfjs-spread-none-button-label = Be dvilapių
pdfjs-spread-odd-button =
    .title = Sujungti į dvilapius pradedant nelyginiais puslapiais
pdfjs-spread-odd-button-label = Nelyginiai dvilapiai
pdfjs-spread-even-button =
    .title = Sujungti į dvilapius pradedant lyginiais puslapiais
pdfjs-spread-even-button-label = Lyginiai dvilapiai

## Document properties dialog

pdfjs-document-properties-button =
    .title = Dokumento savybės…
pdfjs-document-properties-button-label = Dokumento savybės…
pdfjs-document-properties-file-name = Failo vardas:
pdfjs-document-properties-file-size = Failo dydis:
pdfjs-document-properties-title = Antraštė:
pdfjs-document-properties-author = Autorius:
pdfjs-document-properties-subject = Tema:
pdfjs-document-properties-keywords = Reikšminiai žodžiai:
pdfjs-document-properties-creation-date = Sukūrimo data:
pdfjs-document-properties-modification-date = Modifikavimo data:
pdfjs-document-properties-creator = Kūrėjas:
pdfjs-document-properties-producer = PDF generatorius:
pdfjs-document-properties-version = PDF versija:
pdfjs-document-properties-page-count = Puslapių skaičius:
pdfjs-document-properties-page-size = Puslapio dydis:
pdfjs-document-properties-page-size-unit-inches = in
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = stačias
pdfjs-document-properties-page-size-orientation-landscape = gulsčias
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Laiškas
pdfjs-document-properties-page-size-name-legal = Dokumentas

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
pdfjs-document-properties-linearized = Spartus žiniatinklio rodinys:
pdfjs-document-properties-linearized-yes = Taip
pdfjs-document-properties-linearized-no = Ne
pdfjs-document-properties-close-button = Užverti

## Print

pdfjs-print-progress-message = Dokumentas ruošiamas spausdinimui…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Atsisakyti
pdfjs-printing-not-supported = Dėmesio! Spausdinimas šioje naršyklėje nėra pilnai realizuotas.
pdfjs-printing-not-ready = Dėmesio! PDF failas dar nėra pilnai įkeltas spausdinimui.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Rodyti / slėpti šoninį polangį
pdfjs-toggle-sidebar-notification-button =
    .title = Parankinė (dokumentas turi struktūrą / priedų / sluoksnių)
pdfjs-toggle-sidebar-button-label = Šoninis polangis
pdfjs-document-outline-button =
    .title = Rodyti dokumento struktūrą (spustelėkite dukart norėdami išplėsti/suskleisti visus elementus)
pdfjs-document-outline-button-label = Dokumento struktūra
pdfjs-attachments-button =
    .title = Rodyti priedus
pdfjs-attachments-button-label = Priedai
pdfjs-layers-button =
    .title = Rodyti sluoksnius (spustelėkite dukart, norėdami atstatyti visus sluoksnius į numatytąją būseną)
pdfjs-layers-button-label = Sluoksniai
pdfjs-thumbs-button =
    .title = Rodyti puslapių miniatiūras
pdfjs-thumbs-button-label = Miniatiūros
pdfjs-current-outline-item-button =
    .title = Rasti dabartinį struktūros elementą
pdfjs-current-outline-item-button-label = Dabartinis struktūros elementas
pdfjs-findbar-button =
    .title = Ieškoti dokumente
pdfjs-findbar-button-label = Rasti
pdfjs-additional-layers = Papildomi sluoksniai

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = { $page } puslapis
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = { $page } puslapio miniatiūra

## Find panel button title and messages

pdfjs-find-input =
    .title = Rasti
    .placeholder = Rasti dokumente…
pdfjs-find-previous-button =
    .title = Ieškoti ankstesnio frazės egzemplioriaus
pdfjs-find-previous-button-label = Ankstesnis
pdfjs-find-next-button =
    .title = Ieškoti tolesnio frazės egzemplioriaus
pdfjs-find-next-button-label = Tolesnis
pdfjs-find-highlight-checkbox = Viską paryškinti
pdfjs-find-match-case-checkbox-label = Skirti didžiąsias ir mažąsias raides
pdfjs-find-match-diacritics-checkbox-label = Skirti diakritinius ženklus
pdfjs-find-entire-word-checkbox-label = Ištisi žodžiai
pdfjs-find-reached-top = Pasiekus dokumento pradžią, paieška pratęsta nuo pabaigos
pdfjs-find-reached-bottom = Pasiekus dokumento pabaigą, paieška pratęsta nuo pradžios
pdfjs-find-not-found = Ieškoma frazė nerasta

## Predefined zoom values

pdfjs-page-scale-width = Priderinti prie lapo pločio
pdfjs-page-scale-fit = Pritaikyti prie lapo dydžio
pdfjs-page-scale-auto = Automatinis mastelis
pdfjs-page-scale-actual = Tikras dydis
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = { $page } puslapis

## Loading indicator messages

pdfjs-loading-error = Įkeliant PDF failą įvyko klaida.
pdfjs-invalid-file-error = Tai nėra PDF failas arba jis yra sugadintas.
pdfjs-missing-file-error = PDF failas nerastas.
pdfjs-unexpected-response-error = Netikėtas serverio atsakas.
pdfjs-rendering-error = Atvaizduojant puslapį įvyko klaida.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [„{ $type }“ tipo anotacija]

## Password

pdfjs-password-label = Įveskite slaptažodį šiam PDF failui atverti.
pdfjs-password-invalid = Slaptažodis neteisingas. Bandykite dar kartą.
pdfjs-password-ok-button = Gerai
pdfjs-password-cancel-button = Atsisakyti
pdfjs-web-fonts-disabled = Saityno šriftai išjungti – PDF faile esančių šriftų naudoti negalima.

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
pdfjs-editor-free-text-button =
    .title = Text
pdfjs-editor-color-picker-free-text-input =
    .title = Change text color
pdfjs-editor-free-text-button-label = Text
pdfjs-editor-ink-button =
    .title = Draw
pdfjs-editor-color-picker-ink-input =
    .title = Change drawing color
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
pdfjs-comment-floating-button =
    .title = Comment
    .aria-label = Comment
pdfjs-comment-floating-button-label = Comment
pdfjs-editor-comment-button =
    .title = Comment
    .aria-label = Comment
pdfjs-editor-comment-button-label = Comment
pdfjs-editor-signature-button =
    .title = Add signature
pdfjs-editor-signature-button-label = Add signature
pdfjs-editor-highlight-editor =
    .aria-label = Highlight editor
pdfjs-editor-ink-editor =
    .aria-label = Drawing editor
pdfjs-editor-signature-editor1 =
    .aria-description = Signature editor: { $description }
pdfjs-editor-stamp-editor =
    .aria-label = Image editor
pdfjs-editor-remove-ink-button =
    .title = Remove drawing
pdfjs-editor-remove-freetext-button =
    .title = Remove text
pdfjs-editor-remove-stamp-button =
    .title = Remove image
pdfjs-editor-remove-highlight-button =
    .title = Remove highlight
pdfjs-editor-remove-signature-button =
    .title = Remove signature
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
pdfjs-editor-add-signature-container =
    .aria-label = Signature controls and saved signatures
pdfjs-editor-signature-add-signature-button =
    .title = Add new signature
pdfjs-editor-signature-add-signature-button-label = Add new signature
pdfjs-editor-add-saved-signature-button =
    .title = Saved signature: { $description }
pdfjs-free-text2 =
    .aria-label = Text Editor
    .default-content = Start typing…
pdfjs-editor-comments-sidebar-title =
    { $count ->
        [one] Comment
       *[other] Comments
    }
pdfjs-editor-comments-sidebar-close-button =
    .title = Close the sidebar
    .aria-label = Close the sidebar
pdfjs-editor-comments-sidebar-close-button-label = Close the sidebar
pdfjs-editor-comments-sidebar-no-comments1 = See something noteworthy? Highlight it and leave a comment.
pdfjs-editor-comments-sidebar-no-comments-link = Learn more
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
pdfjs-editor-highlight-added-alert = Highlight added
pdfjs-editor-freetext-added-alert = Text added
pdfjs-editor-ink-added-alert = Drawing added
pdfjs-editor-stamp-added-alert = Image added
pdfjs-editor-signature-added-alert = Signature added
pdfjs-editor-undo-bar-message-highlight = Highlight removed
pdfjs-editor-undo-bar-message-freetext = Text removed
pdfjs-editor-undo-bar-message-ink = Drawing removed
pdfjs-editor-undo-bar-message-stamp = Image removed
pdfjs-editor-undo-bar-message-signature = Signature removed
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
pdfjs-editor-add-signature-dialog-label = This modal allows the user to create a signature to add to a PDF document. The user can edit the name (which also serves as the alt text), and optionally save the signature for repeated use.
pdfjs-editor-add-signature-dialog-title = Add a signature
pdfjs-editor-add-signature-type-button = Type
    .title = Type
pdfjs-editor-add-signature-draw-button = Draw
    .title = Draw
pdfjs-editor-add-signature-image-button = Image
    .title = Image
pdfjs-editor-add-signature-type-input =
    .aria-label = Type your signature
    .placeholder = Type your signature
pdfjs-editor-add-signature-draw-placeholder = Draw your signature
pdfjs-editor-add-signature-draw-thickness-range-label = Thickness
pdfjs-editor-add-signature-draw-thickness-range =
    .title = Drawing thickness: { $thickness }
pdfjs-editor-add-signature-image-placeholder = Drag a file here to upload
pdfjs-editor-add-signature-image-browse-link =
    { PLATFORM() ->
        [macos] Or choose image files
       *[other] Or browse image files
    }
pdfjs-editor-add-signature-description-label = Description (alt text)
pdfjs-editor-add-signature-description-input =
    .title = Description (alt text)
pdfjs-editor-add-signature-description-default-when-drawing = Signature
pdfjs-editor-add-signature-clear-button-label = Clear signature
pdfjs-editor-add-signature-clear-button =
    .title = Clear signature
pdfjs-editor-add-signature-save-checkbox = Save signature
pdfjs-editor-add-signature-save-warning-message = You’ve reached the limit of 5 saved signatures. Remove one to save more.
pdfjs-editor-add-signature-image-upload-error-title = Couldn’t upload image
pdfjs-editor-add-signature-image-upload-error-description = Check your network connection or try another image.
pdfjs-editor-add-signature-image-no-data-error-title = Can’t convert this image into a signature
pdfjs-editor-add-signature-image-no-data-error-description = Please try uploading a different image.
pdfjs-editor-add-signature-error-close-button = Close
pdfjs-editor-add-signature-cancel-button = Cancel
pdfjs-editor-add-signature-add-button = Add
pdfjs-editor-delete-signature-button1 =
    .title = Remove saved signature
pdfjs-editor-delete-signature-button-label1 = Remove saved signature
pdfjs-editor-add-signature-edit-button-label = Edit description
pdfjs-editor-edit-signature-dialog-title = Edit description
pdfjs-editor-edit-signature-update-button = Update
pdfjs-show-comment-button =
    .title = Show comment
pdfjs-editor-edit-comment-popup-button-label = Edit comment
pdfjs-editor-edit-comment-popup-button =
    .title = Edit comment
pdfjs-editor-delete-comment-popup-button-label = Remove comment
pdfjs-editor-delete-comment-popup-button =
    .title = Remove comment
pdfjs-editor-edit-comment-dialog-title-when-editing = Edit comment
pdfjs-editor-edit-comment-dialog-save-button-when-editing = Update
pdfjs-editor-edit-comment-dialog-title-when-adding = Add comment
pdfjs-editor-edit-comment-dialog-save-button-when-adding = Add
pdfjs-editor-edit-comment-dialog-text-input =
    .placeholder = Start typing…
pdfjs-editor-edit-comment-dialog-cancel-button = Cancel
pdfjs-editor-edit-comment-button =
    .title = Edit comment
unverified-signature-warning = This PDF file contains a digital signature. The PDF viewer can't verify if the signature is valid. Please download the file and open it in Acrobat Reader to verify the signature is valid.
pdfjs-infinite-scroll-button-label = Infinite scroll
pdfjs-find-multiple-checkbox-label = Match Each Word
pdfjs-find-regexp-checkbox-label = Regular Expression
pdfjs-editor-movePageUp-button = Move Page Up
pdfjs-editor-movePageUp-button-label = Move Page Up
pdfjs-editor-movePageDown-button = Move Page Down
pdfjs-editor-movePageDown-button-label = Move Page Down