# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Eelmine lehekülg
pdfjs-previous-button-label = Eelmine
pdfjs-next-button =
    .title = Järgmine lehekülg
pdfjs-next-button-label = Järgmine
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Leht
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = / { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber }/{ $pagesCount })
pdfjs-zoom-out-button =
    .title = Vähenda
pdfjs-zoom-out-button-label = Vähenda
pdfjs-zoom-in-button =
    .title = Suurenda
pdfjs-zoom-in-button-label = Suurenda
pdfjs-zoom-select =
    .title = Suurendamine
pdfjs-presentation-mode-button =
    .title = Lülitu esitlusrežiimi
pdfjs-presentation-mode-button-label = Esitlusrežiim
pdfjs-open-file-button =
    .title = Ava fail
pdfjs-open-file-button-label = Ava
pdfjs-print-button =
    .title = Prindi
pdfjs-print-button-label = Prindi

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Tööriistad
pdfjs-tools-button-label = Tööriistad
pdfjs-first-page-button =
    .title = Mine esimesele leheküljele
pdfjs-first-page-button-label = Mine esimesele leheküljele
pdfjs-last-page-button =
    .title = Mine viimasele leheküljele
pdfjs-last-page-button-label = Mine viimasele leheküljele
pdfjs-page-rotate-cw-button =
    .title = Pööra päripäeva
pdfjs-page-rotate-cw-button-label = Pööra päripäeva
pdfjs-page-rotate-ccw-button =
    .title = Pööra vastupäeva
pdfjs-page-rotate-ccw-button-label = Pööra vastupäeva
pdfjs-cursor-text-select-tool-button =
    .title = Luba teksti valimise tööriist
pdfjs-cursor-text-select-tool-button-label = Teksti valimise tööriist
pdfjs-cursor-hand-tool-button =
    .title = Luba sirvimistööriist
pdfjs-cursor-hand-tool-button-label = Sirvimistööriist
pdfjs-scroll-page-button =
    .title = Kasutatakse lehe kaupa kerimist
pdfjs-scroll-page-button-label = Lehe kaupa kerimine
pdfjs-scroll-vertical-button =
    .title = Kasuta vertikaalset kerimist
pdfjs-scroll-vertical-button-label = Vertikaalne kerimine
pdfjs-scroll-horizontal-button =
    .title = Kasuta horisontaalset kerimist
pdfjs-scroll-horizontal-button-label = Horisontaalne kerimine
pdfjs-scroll-wrapped-button =
    .title = Kasuta rohkem mahutavat kerimist
pdfjs-scroll-wrapped-button-label = Rohkem mahutav kerimine
pdfjs-spread-none-button =
    .title = Ära kõrvuta lehekülgi
pdfjs-spread-none-button-label = Lehtede kõrvutamine puudub
pdfjs-spread-odd-button =
    .title = Kõrvuta leheküljed, alustades paaritute numbritega lehekülgedega
pdfjs-spread-odd-button-label = Kõrvutamine paaritute numbritega alustades
pdfjs-spread-even-button =
    .title = Kõrvuta leheküljed, alustades paarisnumbritega lehekülgedega
pdfjs-spread-even-button-label = Kõrvutamine paarisnumbritega alustades

## Document properties dialog

pdfjs-document-properties-button =
    .title = Dokumendi omadused…
pdfjs-document-properties-button-label = Dokumendi omadused…
pdfjs-document-properties-file-name = Faili nimi:
pdfjs-document-properties-file-size = Faili suurus:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KiB ({ $size_b } baiti)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MiB ({ $size_b } baiti)
pdfjs-document-properties-title = Pealkiri:
pdfjs-document-properties-author = Autor:
pdfjs-document-properties-subject = Teema:
pdfjs-document-properties-keywords = Märksõnad:
pdfjs-document-properties-creation-date = Loodud:
pdfjs-document-properties-modification-date = Muudetud:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date } { $time }
pdfjs-document-properties-creator = Looja:
pdfjs-document-properties-producer = Generaator:
pdfjs-document-properties-version = Generaatori versioon:
pdfjs-document-properties-page-count = Lehekülgi:
pdfjs-document-properties-page-size = Lehe suurus:
pdfjs-document-properties-page-size-unit-inches = tolli
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = vertikaalpaigutus
pdfjs-document-properties-page-size-orientation-landscape = rõhtpaigutus
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
pdfjs-document-properties-linearized = "Fast Web View" tugi:
pdfjs-document-properties-linearized-yes = Jah
pdfjs-document-properties-linearized-no = Ei
pdfjs-document-properties-close-button = Sulge

## Print

pdfjs-print-progress-message = Dokumendi ettevalmistamine printimiseks…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Loobu
pdfjs-printing-not-supported = Hoiatus: printimine pole selle brauseri poolt täielikult toetatud.
pdfjs-printing-not-ready = Hoiatus: PDF pole printimiseks täielikult laaditud.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Näita külgriba
pdfjs-toggle-sidebar-notification-button =
    .title = Näita külgriba (dokument sisaldab sisukorda/manuseid/kihte)
pdfjs-toggle-sidebar-button-label = Näita külgriba
pdfjs-document-outline-button =
    .title = Näita sisukorda (kõigi punktide laiendamiseks/ahendamiseks topeltklõpsa)
pdfjs-document-outline-button-label = Näita sisukorda
pdfjs-attachments-button =
    .title = Näita manuseid
pdfjs-attachments-button-label = Manused
pdfjs-layers-button =
    .title = Näita kihte (kõikide kihtide vaikeolekusse lähtestamiseks topeltklõpsa)
pdfjs-layers-button-label = Kihid
pdfjs-thumbs-button =
    .title = Näita pisipilte
pdfjs-thumbs-button-label = Pisipildid
pdfjs-current-outline-item-button =
    .title = Otsi üles praegune kontuuriüksus
pdfjs-current-outline-item-button-label = Praegune kontuuriüksus
pdfjs-findbar-button =
    .title = Otsi dokumendist
pdfjs-findbar-button-label = Otsi
pdfjs-additional-layers = Täiendavad kihid

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = { $page }. lehekülg
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = { $page }. lehekülje pisipilt

## Find panel button title and messages

pdfjs-find-input =
    .title = Otsi
    .placeholder = Otsi dokumendist…
pdfjs-find-previous-button =
    .title = Otsi fraasi eelmine esinemiskoht
pdfjs-find-previous-button-label = Eelmine
pdfjs-find-next-button =
    .title = Otsi fraasi järgmine esinemiskoht
pdfjs-find-next-button-label = Järgmine
pdfjs-find-highlight-checkbox = Too kõik esile
pdfjs-find-match-case-checkbox-label = Tõstutundlik
pdfjs-find-match-diacritics-checkbox-label = Otsitakse diakriitiliselt
pdfjs-find-entire-word-checkbox-label = Täissõnad
pdfjs-find-reached-top = Jõuti dokumendi algusesse, jätkati lõpust
pdfjs-find-reached-bottom = Jõuti dokumendi lõppu, jätkati algusest
pdfjs-find-not-found = Fraasi ei leitud

## Predefined zoom values

pdfjs-page-scale-width = Mahuta laiusele
pdfjs-page-scale-fit = Mahuta leheküljele
pdfjs-page-scale-auto = Automaatne suurendamine
pdfjs-page-scale-actual = Tegelik suurus
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = Lehekülg { $page }

## Loading indicator messages

pdfjs-loading-error = PDFi laadimisel esines viga.
pdfjs-invalid-file-error = Vigane või rikutud PDF-fail.
pdfjs-missing-file-error = PDF-fail puudub.
pdfjs-unexpected-response-error = Ootamatu vastus serverilt.
pdfjs-rendering-error = Lehe renderdamisel esines viga.

## Annotations

# Variables:
#   $date (Date) - the modification date of the annotation
#   $time (Time) - the modification time of the annotation
pdfjs-annotation-date-string = { $date } { $time }
# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } Annotation]

## Password

pdfjs-password-label = PDF-faili avamiseks sisesta parool.
pdfjs-password-invalid = Vigane parool. Palun proovi uuesti.
pdfjs-password-ok-button = Sobib
pdfjs-password-cancel-button = Loobu
pdfjs-web-fonts-disabled = Veebifondid on keelatud: PDFiga kaasatud fonte pole võimalik kasutada.

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