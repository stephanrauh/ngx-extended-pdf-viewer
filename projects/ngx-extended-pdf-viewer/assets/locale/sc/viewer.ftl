# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Pàgina anteriore
pdfjs-previous-button-label = S'ischeda chi b'est primu
pdfjs-next-button =
    .title = Pàgina imbeniente
pdfjs-next-button-label = Imbeniente
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Pàgina
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = de { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } de { $pagesCount })
pdfjs-zoom-out-button =
    .title = Impitica
pdfjs-zoom-out-button-label = Impitica
pdfjs-zoom-in-button =
    .title = Ismànnia
pdfjs-zoom-in-button-label = Ismànnia
pdfjs-zoom-select =
    .title = Ismànnia
pdfjs-presentation-mode-button =
    .title = Cola a sa modalidade de presentatzione
pdfjs-presentation-mode-button-label = Modalidade de presentatzione
pdfjs-open-file-button =
    .title = Aberi s'archìviu
pdfjs-open-file-button-label = Abertu
pdfjs-print-button =
    .title = Imprenta
pdfjs-print-button-label = Imprenta
pdfjs-save-button =
    .title = Sarva
pdfjs-save-button-label = Sarva
# Used in Firefox for Android as a tooltip for the download button (“download” is a verb).
pdfjs-download-button =
    .title = Iscàrriga
# Used in Firefox for Android as a label for the download button (“download” is a verb).
# Length of the translation matters since we are in a mobile context, with limited screen estate.
pdfjs-download-button-label = Iscàrriga
pdfjs-bookmark-button =
    .title = Pàgina atuale (ammustra s’URL de sa pàgina atuale)
pdfjs-bookmark-button-label = Pàgina atuale

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Istrumentos
pdfjs-tools-button-label = Istrumentos
pdfjs-first-page-button =
    .title = Bae a sa prima pàgina
pdfjs-first-page-button-label = Bae a sa prima pàgina
pdfjs-last-page-button =
    .title = Bae a s'ùrtima pàgina
pdfjs-last-page-button-label = Bae a s'ùrtima pàgina
pdfjs-page-rotate-cw-button =
    .title = Gira in sensu oràriu
pdfjs-page-rotate-cw-button-label = Gira in sensu oràriu
pdfjs-page-rotate-ccw-button =
    .title = Gira in sensu anti-oràriu
pdfjs-page-rotate-ccw-button-label = Gira in sensu anti-oràriu
pdfjs-cursor-text-select-tool-button =
    .title = Ativa s'aina de seletzione de testu
pdfjs-cursor-text-select-tool-button-label = Aina de seletzione de testu
pdfjs-cursor-hand-tool-button =
    .title = Ativa s'aina de manu
pdfjs-cursor-hand-tool-button-label = Aina de manu
pdfjs-scroll-page-button =
    .title = Imprea s'iscurrimentu de pàgina
pdfjs-scroll-page-button-label = Iscurrimentu de pàgina
pdfjs-scroll-vertical-button =
    .title = Imprea s'iscurrimentu verticale
pdfjs-scroll-vertical-button-label = Iscurrimentu verticale
pdfjs-scroll-horizontal-button =
    .title = Imprea s'iscurrimentu orizontale
pdfjs-scroll-horizontal-button-label = Iscurrimentu orizontale
pdfjs-scroll-wrapped-button =
    .title = Imprea s'iscurrimentu continu
pdfjs-scroll-wrapped-button-label = Iscurrimentu continu

## Document properties dialog

pdfjs-document-properties-button =
    .title = Propiedades de su documentu…
pdfjs-document-properties-button-label = Propiedades de su documentu…
pdfjs-document-properties-file-name = Nòmine de s'archìviu:
pdfjs-document-properties-file-size = Mannària de s'archìviu:
pdfjs-document-properties-title = Tìtulu:
pdfjs-document-properties-author = Autoria:
pdfjs-document-properties-subject = Ogetu:
pdfjs-document-properties-keywords = Faeddos crae:
pdfjs-document-properties-creation-date = Data de creatzione:
pdfjs-document-properties-modification-date = Data de modìfica:
pdfjs-document-properties-creator = Creatzione:
pdfjs-document-properties-producer = Produtore de PDF:
pdfjs-document-properties-version = Versione de PDF:
pdfjs-document-properties-page-count = Contu de pàginas:
pdfjs-document-properties-page-size = Mannària de sa pàgina:
pdfjs-document-properties-page-size-unit-inches = pòddighes
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = verticale
pdfjs-document-properties-page-size-orientation-landscape = orizontale
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Lìtera
pdfjs-document-properties-page-size-name-legal = Legale

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
pdfjs-document-properties-linearized = Visualizatzione web lestra:
pdfjs-document-properties-linearized-yes = Eja
pdfjs-document-properties-linearized-no = Nono
pdfjs-document-properties-close-button = Serra

## Print

pdfjs-print-progress-message = Aparitzende s'imprenta de su documentu…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Annulla
pdfjs-printing-not-supported = Atentzione: s'imprenta no est funtzionende de su totu in custu navigadore.
pdfjs-printing-not-ready = Atentzione: su PDF no est istadu carrigadu de su totu pro s'imprenta.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Ativa/disativa sa barra laterale
pdfjs-toggle-sidebar-notification-button =
    .title = Ativa/disativa sa barra laterale (su documentu cuntenet un'ischema, alligongiados o livellos)
pdfjs-toggle-sidebar-button-label = Ativa/disativa sa barra laterale
pdfjs-document-outline-button-label = Ischema de su documentu
pdfjs-attachments-button =
    .title = Ammustra alligongiados
pdfjs-attachments-button-label = Alliongiados
pdfjs-layers-button =
    .title = Ammustra livellos (clic dòpiu pro ripristinare totu is livellos a s'istadu predefinidu)
pdfjs-layers-button-label = Livellos
pdfjs-thumbs-button =
    .title = Ammustra miniaturas
pdfjs-thumbs-button-label = Miniaturas
pdfjs-current-outline-item-button =
    .title = Agata s'elementu atuale de s'ischema
pdfjs-current-outline-item-button-label = Elementu atuale de s'ischema
pdfjs-findbar-button =
    .title = Agata in su documentu
pdfjs-findbar-button-label = Agata
pdfjs-additional-layers = Livellos additzionales

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Pàgina { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Miniatura de sa pàgina { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Agata
    .placeholder = Agata in su documentu…
pdfjs-find-previous-button =
    .title = Agata s'ocurrèntzia pretzedente de sa fràsia
pdfjs-find-previous-button-label = S'ischeda chi b'est primu
pdfjs-find-next-button =
    .title = Agata s'ocurrèntzia imbeniente de sa fràsia
pdfjs-find-next-button-label = Imbeniente
pdfjs-find-highlight-checkbox = Evidèntzia totu
pdfjs-find-match-case-checkbox-label = Distinghe intre majùsculas e minùsculas
pdfjs-find-match-diacritics-checkbox-label = Respeta is diacrìticos
pdfjs-find-entire-word-checkbox-label = Faeddos intreos
pdfjs-find-reached-top = S'est lòmpidu a su cumintzu de su documentu, si sighit dae su bàsciu
pdfjs-find-reached-bottom = Acabbu de su documentu, si sighit dae s'artu
pdfjs-find-not-found = Testu no agatadu

## Predefined zoom values

pdfjs-page-scale-auto = Ingrandimentu automàticu
pdfjs-page-scale-actual = Mannària reale
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = Pàgina { $page }

## Loading indicator messages

pdfjs-loading-error = Faddina in sa càrriga de su PDF.
pdfjs-invalid-file-error = Archìviu PDF non vàlidu o corrùmpidu.
pdfjs-missing-file-error = Ammancat s'archìviu PDF.
pdfjs-unexpected-response-error = Risposta imprevista de su serbidore.
pdfjs-rendering-error = Faddina in sa visualizatzione de sa pàgina.

## Password

pdfjs-password-label = Inserta sa crae pro abèrrere custu archìviu PDF.
pdfjs-password-invalid = Sa crae no est curreta. Torra a nche proare.
pdfjs-password-ok-button = Andat bene
pdfjs-password-cancel-button = Annulla
pdfjs-web-fonts-disabled = Is tipografias web sunt disativadas: is tipografias incrustadas a su PDF non podent èssere impreadas.

## Editing

pdfjs-editor-free-text-button =
    .title = Testu
pdfjs-editor-free-text-button-label = Testu
pdfjs-editor-ink-button =
    .title = Disinnu
pdfjs-editor-ink-button-label = Disinnu
pdfjs-editor-stamp-button =
    .title = Agiunghe o modìfica immàgines
pdfjs-editor-stamp-button-label = Agiunghe o modìfica immàgines
pdfjs-editor-highlight-button =
    .title = Evidèntzia
pdfjs-editor-highlight-button-label = Evidèntzia
pdfjs-highlight-floating-button1 =
    .title = Evidèntzia
    .aria-label = Evidèntzia
pdfjs-highlight-floating-button-label = Evidèntzia

## Remove button for the various kind of editor.

pdfjs-editor-remove-ink-button =
    .title = Boga su disinnu
pdfjs-editor-remove-freetext-button =
    .title = Boga su testu
pdfjs-editor-remove-stamp-button =
    .title = Boga s’immàgine
pdfjs-editor-remove-highlight-button =
    .title = Boga s’evidèntzia

##

# Editor Parameters
pdfjs-editor-free-text-color-input = Colore
pdfjs-editor-free-text-size-input = Mannària
pdfjs-editor-ink-color-input = Colore
pdfjs-editor-ink-thickness-input = Grussària
pdfjs-editor-stamp-add-image-button =
    .title = Agiunghe un’immàgine
pdfjs-editor-stamp-add-image-button-label = Agiunghe un’immàgine
# This refers to the thickness of the line used for free highlighting (not bound to text)
pdfjs-editor-free-highlight-thickness-input = Grussària

## Alt-text dialog

pdfjs-editor-alt-text-button-label = Testu alternativu
pdfjs-editor-alt-text-dialog-label = Sèbera un’optzione
pdfjs-editor-alt-text-dialog-description = Su testu alternativu (“alt text”) est ùtile pro persones chi non podent bìdere s’immàgine o cando non benit carrigada.
pdfjs-editor-alt-text-add-description-label = Agiunghe una descritzione
pdfjs-editor-alt-text-cancel-button = Annulla
pdfjs-editor-alt-text-save-button = Sarva

## Color picker

pdfjs-editor-colorpicker-button =
    .title = Modifica su colore
pdfjs-editor-colorpicker-dropdown =
    .aria-label = Colores a disponimentu
pdfjs-editor-colorpicker-yellow =
    .title = Grogu
pdfjs-editor-colorpicker-green =
    .title = Birde
pdfjs-editor-colorpicker-blue =
    .title = Biaitu
pdfjs-editor-colorpicker-pink =
    .title = Rosa

## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.

pdfjs-editor-new-alt-text-missing-button-label = Mancat su testu alternativu
pdfjs-editor-new-alt-text-to-review-button-label = Revisiona su testu alternativu
# "Created automatically" is a prefix that will be added to the beginning of any alt text that has been automatically generated. After the colon, the user will see/hear the actual alt text description. If the alt text has been edited by a human, this prefix will not appear.
# Variables:
#   $generatedAltText (String) - the generated alt-text.
pdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer = Creadu in automàticu: { $generatedAltText }

## Image alt-text settings

pdfjs-image-alt-text-settings-button =
    .title = Cunfiguratzione de su testu alternativu de is immàgines
pdfjs-image-alt-text-settings-button-label = Cunfiguratzione de su testu alternativu de is immàgines
pdfjs-editor-alt-text-settings-dialog-label = Cunfiguratzione de su testu alternativu de is immàgines
pdfjs-editor-alt-text-settings-automatic-title = Testu alternativu automàticu
pdfjs-editor-alt-text-settings-create-model-button-label = Crea testu alternativu in automàticu
pdfjs-editor-alt-text-settings-create-model-description = Cussìgiat descritziones pro agiudare a gente chi non podet bìdere s’immàgine o cando non benit carrigada.
# Variables:
#   $totalSize (Number) - the total size (in MB) of the AI model.
pdfjs-editor-alt-text-settings-download-model-label = Modellu de IA pro su testu alternativu ({ $totalSize } MB)
pdfjs-editor-alt-text-settings-ai-model-description = Est esecutadu in locale in manera chi is datos tuos abarrent in privadu. Rechestu pro sa generatzione automàtica de testu alternativu.
pdfjs-editor-alt-text-settings-delete-model-button = Cantzella
pdfjs-editor-alt-text-settings-download-model-button = Iscàrriga
pdfjs-editor-alt-text-settings-downloading-model-button = Iscarrighende…
pdfjs-editor-alt-text-settings-editor-title = Editore de testu alternativu
pdfjs-editor-alt-text-settings-show-dialog-button-label = Mustra deretu s’editore de testu alternativu cando siat agiunta un’immàgine
pdfjs-editor-alt-text-settings-show-dialog-description = T’agiudat a assegurare chi totu is immàgines tuas tèngiant unu testu alternativu.
pdfjs-editor-alt-text-settings-close-button = Serra

## Dialog buttons

pdfjs-editor-add-signature-cancel-button = Annulla

##  Edit a comment dialog

pdfjs-editor-edit-comment-manager-cancel-button = Annulla

# Translations for ngx-extended-pdf-viewer additions only available in en-US
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
pdfjs-page-scale-width = Page Width
pdfjs-page-scale-fit = Page Fit
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-text-annotation-type =
    .alt = [{ $type } Annotation]
pdfjs-editor-color-picker-free-text-input =
    .title = Change text color
pdfjs-editor-color-picker-ink-input =
    .title = Change drawing color
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
pdfjs-editor-remove-signature-button =
    .title = Remove signature
pdfjs-editor-ink-opacity-input = Opacity
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
pdfjs-editor-alt-text-edit-button =
    .aria-label = Edit alt text
pdfjs-editor-alt-text-add-description-description = Aim for 1-2 sentences that describe the subject, setting, or actions.
pdfjs-editor-alt-text-mark-decorative-label = Mark as decorative
pdfjs-editor-alt-text-mark-decorative-description = This is used for ornamental images, like borders or watermarks.
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