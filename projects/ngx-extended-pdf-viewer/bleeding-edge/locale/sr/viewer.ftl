# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Претходна страница
pdfjs-previous-button-label = Претходна
pdfjs-next-button =
    .title = Следећа страница
pdfjs-next-button-label = Следећа
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Страница
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = од { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } од { $pagesCount })
pdfjs-zoom-out-button =
    .title = Умањи
pdfjs-zoom-out-button-label = Умањи
pdfjs-zoom-in-button =
    .title = Увеличај
pdfjs-zoom-in-button-label = Увеличај
pdfjs-zoom-select =
    .title = Увеличавање
pdfjs-presentation-mode-button =
    .title = Промени на приказ у режиму презентације
pdfjs-presentation-mode-button-label = Режим презентације
pdfjs-open-file-button =
    .title = Отвори датотеку
pdfjs-open-file-button-label = Отвори
pdfjs-print-button =
    .title = Штампај
pdfjs-print-button-label = Штампај
pdfjs-save-button =
    .title = Сачувај
pdfjs-save-button-label = Сачувај
pdfjs-bookmark-button =
    .title = Тренутна страница (погледајте URL са тренутне странице)
pdfjs-bookmark-button-label = Тренутна страница

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Алатке
pdfjs-tools-button-label = Алатке
pdfjs-first-page-button =
    .title = Иди на прву страницу
pdfjs-first-page-button-label = Иди на прву страницу
pdfjs-last-page-button =
    .title = Иди на последњу страницу
pdfjs-last-page-button-label = Иди на последњу страницу
pdfjs-page-rotate-cw-button =
    .title = Ротирај у смеру казаљке на сату
pdfjs-page-rotate-cw-button-label = Ротирај у смеру казаљке на сату
pdfjs-page-rotate-ccw-button =
    .title = Ротирај у смеру супротном од казаљке на сату
pdfjs-page-rotate-ccw-button-label = Ротирај у смеру супротном од казаљке на сату
pdfjs-cursor-text-select-tool-button =
    .title = Омогући алат за селектовање текста
pdfjs-cursor-text-select-tool-button-label = Алат за селектовање текста
pdfjs-cursor-hand-tool-button =
    .title = Омогући алат за померање
pdfjs-cursor-hand-tool-button-label = Алат за померање
pdfjs-scroll-page-button =
    .title = Користи скроловање по омоту
pdfjs-scroll-page-button-label = Скроловање странице
pdfjs-scroll-vertical-button =
    .title = Користи вертикално скроловање
pdfjs-scroll-vertical-button-label = Вертикално скроловање
pdfjs-scroll-horizontal-button =
    .title = Користи хоризонтално скроловање
pdfjs-scroll-horizontal-button-label = Хоризонтално скроловање
pdfjs-scroll-wrapped-button =
    .title = Користи скроловање по омоту
pdfjs-scroll-wrapped-button-label = Скроловање по омоту
pdfjs-spread-none-button =
    .title = Немој спајати ширења страница
pdfjs-spread-none-button-label = Без распростирања
pdfjs-spread-odd-button =
    .title = Споји ширења страница које почињу непарним бројем
pdfjs-spread-odd-button-label = Непарна распростирања
pdfjs-spread-even-button =
    .title = Споји ширења страница које почињу парним бројем
pdfjs-spread-even-button-label = Парна распростирања

## Document properties dialog

pdfjs-document-properties-button =
    .title = Параметри документа…
pdfjs-document-properties-button-label = Параметри документа…
pdfjs-document-properties-file-name = Име датотеке:
pdfjs-document-properties-file-size = Величина датотеке:
pdfjs-document-properties-title = Наслов:
pdfjs-document-properties-author = Аутор:
pdfjs-document-properties-subject = Тема:
pdfjs-document-properties-keywords = Кључне речи:
pdfjs-document-properties-creation-date = Датум креирања:
pdfjs-document-properties-modification-date = Датум модификације:
# Variables:
#   $dateObj (Date) - the creation/modification date and time of the PDF file
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-document-properties-creator = Стваралац:
pdfjs-document-properties-producer = PDF произвођач:
pdfjs-document-properties-version = PDF верзија:
pdfjs-document-properties-page-count = Број страница:
pdfjs-document-properties-page-size = Величина странице:
pdfjs-document-properties-page-size-unit-inches = ин
pdfjs-document-properties-page-size-unit-millimeters = мм
pdfjs-document-properties-page-size-orientation-portrait = усправно
pdfjs-document-properties-page-size-orientation-landscape = водоравно
pdfjs-document-properties-page-size-name-a-three = А3
pdfjs-document-properties-page-size-name-a-four = А4
pdfjs-document-properties-page-size-name-letter = Слово
pdfjs-document-properties-page-size-name-legal = Права

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
pdfjs-document-properties-linearized = Брз веб приказ:
pdfjs-document-properties-linearized-yes = Да
pdfjs-document-properties-linearized-no = Не
pdfjs-document-properties-close-button = Затвори

## Print

pdfjs-print-progress-message = Припремам документ за штампање…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Откажи
pdfjs-printing-not-supported = Упозорење: Штампање није у потпуности подржано у овом прегледачу.
pdfjs-printing-not-ready = Упозорење: PDF није у потпуности учитан за штампу.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Прикажи/сакриј бочни панел
pdfjs-toggle-sidebar-notification-button =
    .title = Прикажи/сакриј бочни панел (документ садржи контуру/прилоге/слојеве)
pdfjs-toggle-sidebar-button-label = Прикажи/сакриј бочни панел
pdfjs-document-outline-button =
    .title = Прикажи структуру документа (двоструким кликом проширујете/скупљате све ставке)
pdfjs-document-outline-button-label = Контура документа
pdfjs-attachments-button =
    .title = Прикажи прилоге
pdfjs-attachments-button-label = Прилози
pdfjs-layers-button =
    .title = Прикажи слојеве (дупли клик за враћање свих слојева у подразумевано стање)
pdfjs-layers-button-label = Слојеви
pdfjs-thumbs-button =
    .title = Прикажи сличице
pdfjs-thumbs-button-label = Сличице
pdfjs-current-outline-item-button =
    .title = Пронађите тренутни елемент структуре
pdfjs-current-outline-item-button-label = Тренутна контура
pdfjs-findbar-button =
    .title = Пронађи у документу
pdfjs-findbar-button-label = Пронађи
pdfjs-additional-layers = Додатни слојеви

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Страница { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Сличица од странице { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Пронађи
    .placeholder = Пронађи у документу…
pdfjs-find-previous-button =
    .title = Пронађи претходно појављивање фразе
pdfjs-find-previous-button-label = Претходна
pdfjs-find-next-button =
    .title = Пронађи следеће појављивање фразе
pdfjs-find-next-button-label = Следећа
pdfjs-find-highlight-checkbox = Истакнути све
pdfjs-find-match-case-checkbox-label = Подударања
pdfjs-find-match-diacritics-checkbox-label = Дијакритика
pdfjs-find-entire-word-checkbox-label = Целе речи
pdfjs-find-reached-top = Достигнут врх документа, наставио са дна
pdfjs-find-reached-bottom = Достигнуто дно документа, наставио са врха
pdfjs-find-not-found = Фраза није пронађена

## Predefined zoom values

pdfjs-page-scale-width = Ширина странице
pdfjs-page-scale-fit = Прилагоди страницу
pdfjs-page-scale-auto = Аутоматско увеличавање
pdfjs-page-scale-actual = Стварна величина
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = Страница { $page }

## Loading indicator messages

pdfjs-loading-error = Дошло је до грешке приликом учитавања PDF-а.
pdfjs-invalid-file-error = PDF датотека је неважећа или је оштећена.
pdfjs-missing-file-error = Недостаје PDF датотека.
pdfjs-unexpected-response-error = Неочекиван одговор од сервера.
pdfjs-rendering-error = Дошло је до грешке приликом рендеровања ове странице.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } коментар]
# Variables:
#   $dateObj (Date) - the modification date and time of the annotation
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }

## Password

pdfjs-password-label = Унесите лозинку да бисте отворили овај PDF докуменат.
pdfjs-password-invalid = Неисправна лозинка. Покушајте поново.
pdfjs-password-ok-button = У реду
pdfjs-password-cancel-button = Откажи
pdfjs-web-fonts-disabled = Веб фонтови су онемогућени: не могу користити уграђене PDF фонтове.

## Editing

pdfjs-editor-free-text-button =
    .title = Текст
pdfjs-editor-free-text-button-label = Текст
pdfjs-editor-ink-button =
    .title = Цртај
pdfjs-editor-ink-button-label = Цртај
pdfjs-editor-stamp-button =
    .title = Додај или уреди слике
pdfjs-editor-stamp-button-label = Додај или уреди слике
pdfjs-editor-highlight-button =
    .title = Означи
pdfjs-editor-highlight-button-label = Означи
pdfjs-highlight-floating-button1 =
    .title = Означи
    .aria-label = Означи
pdfjs-highlight-floating-button-label = Означи

## Remove button for the various kind of editor.

pdfjs-editor-remove-ink-button =
    .title = Уклони цртеж
pdfjs-editor-remove-freetext-button =
    .title = Уклони текст
pdfjs-editor-remove-stamp-button =
    .title = Уклони слику
pdfjs-editor-remove-highlight-button =
    .title = Уклони ознаку

##

# Editor Parameters
pdfjs-editor-free-text-color-input = Боја
pdfjs-editor-free-text-size-input = Величина
pdfjs-editor-ink-color-input = Боја
pdfjs-editor-ink-thickness-input = Дебљина
pdfjs-editor-ink-opacity-input = Опацитет
pdfjs-editor-stamp-add-image-button =
    .title = Додај слику
pdfjs-editor-stamp-add-image-button-label = Додај слику
pdfjs-editor-free-highlight-thickness-title =
    .title = Промени дебљину при означавању других ставки сем текста
# .default-content is used as a placeholder in an empty text editor.
pdfjs-free-text2 =
    .aria-label = Уређивач текста
    .default-content = Почни куцати…

## Alt-text dialog

pdfjs-editor-alt-text-button-label = Алтернативни текст
pdfjs-editor-alt-text-edit-button =
    .aria-label = Уреди алтернативни текст
pdfjs-editor-alt-text-dialog-label = Одабери опцију
pdfjs-editor-alt-text-dialog-description = Алтернативни текст помаже слепим и слабовидим особама или када се слика не учита.
pdfjs-editor-alt-text-add-description-label = Додај опис
pdfjs-editor-alt-text-add-description-description = Сажмите у 1-2 реченице које описују предмет, окружење или радње.
pdfjs-editor-alt-text-mark-decorative-label = Означи као украсно
pdfjs-editor-alt-text-mark-decorative-description = Ово је за украсне слике, као што су ивице или водени печати.
pdfjs-editor-alt-text-cancel-button = Откажи
pdfjs-editor-alt-text-save-button = Сачувај
pdfjs-editor-alt-text-decorative-tooltip = Означено као украсно
# .placeholder: This is a placeholder for the alt text input area
pdfjs-editor-alt-text-textarea =
    .placeholder = На пример: „Младић седа за сто да једе“
# Alternative text (alt text) helps when people can't see the image.
pdfjs-editor-alt-text-button =
    .aria-label = Алтернативни текст

## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.

pdfjs-editor-resizer-top-left =
    .aria-label = Горњи леви угао — промени величину
pdfjs-editor-resizer-top-middle =
    .aria-label = Средина горе — промени величину
pdfjs-editor-resizer-top-right =
    .aria-label = Горњи десни угао — промени величину
pdfjs-editor-resizer-middle-right =
    .aria-label = Средина десно — промени величину
pdfjs-editor-resizer-bottom-right =
    .aria-label = Доњи десни угао — промени величину
pdfjs-editor-resizer-bottom-middle =
    .aria-label = Средина доле — промени величину
pdfjs-editor-resizer-bottom-left =
    .aria-label = Доњи леви угао — промени величину
pdfjs-editor-resizer-middle-left =
    .aria-label = Средина лево — промени величину

## Color picker

# This means "Color used to highlight text"
pdfjs-editor-highlight-colorpicker-label = Боја означавања
pdfjs-editor-colorpicker-button =
    .title = Промени боју
pdfjs-editor-colorpicker-dropdown =
    .aria-label = Избор боја
pdfjs-editor-colorpicker-yellow =
    .title = Жута
pdfjs-editor-colorpicker-green =
    .title = Зелена
pdfjs-editor-colorpicker-blue =
    .title = Плава
pdfjs-editor-colorpicker-pink =
    .title = Розе
pdfjs-editor-colorpicker-red =
    .title = Црвена

## Show all highlights
## This is a toggle button to show/hide all the highlights.

pdfjs-editor-highlight-show-all-button-label = Прикажи све
pdfjs-editor-highlight-show-all-button =
    .title = Прикажи све

## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.

# Modal header positioned above a text box where users can edit the alt text.
pdfjs-editor-new-alt-text-dialog-edit-label = Уреди алтернативни текст (опис слике)
# Modal header positioned above a text box where users can add the alt text.
pdfjs-editor-new-alt-text-dialog-add-label = Додај алтернативни текст (опис слике)
pdfjs-editor-new-alt-text-textarea =
    .placeholder = Напиши опис овде…
# This text refers to the alt text box above this description. It offers a definition of alt text.
pdfjs-editor-new-alt-text-description = Кратак опис за слепе и слабовиде људе или када се слика не успе учитати.
# This is a required legal disclaimer that refers to the automatically created text inside the alt text box above this text. It disappears if the text is edited by a human.
pdfjs-editor-new-alt-text-disclaimer1 = Овај алтернативни текст је направљен аутоматски и може бити нетачан.
pdfjs-editor-new-alt-text-disclaimer-learn-more-url = Сазнајте више
pdfjs-editor-new-alt-text-create-automatically-button-label = Прави алтернативни текст аутоматски
pdfjs-editor-new-alt-text-not-now-button = Не сада

# Translations for ngx-extended-pdf-viewer additions only available in en-US
pdfjs-download-button =
    .title = Download
pdfjs-download-button-label = Download
pdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } KB ({ $b } bytes)
pdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } MB ({ $b } bytes)
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
pdfjs-editor-free-highlight-thickness-input = Thickness
pdfjs-editor-add-signature-container =
    .aria-label = Signature controls and saved signatures
pdfjs-editor-signature-add-signature-button =
    .title = Add new signature
pdfjs-editor-signature-add-signature-button-label = Add new signature
pdfjs-editor-add-saved-signature-button =
    .title = Saved signature: { $description }
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