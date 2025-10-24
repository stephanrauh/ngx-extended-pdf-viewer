# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Предишна страница
pdfjs-previous-button-label = Предишна
pdfjs-next-button =
    .title = Следваща страница
pdfjs-next-button-label = Следваща
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Страница
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = от { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } от { $pagesCount })
pdfjs-zoom-out-button =
    .title = Намаляване
pdfjs-zoom-out-button-label = Намаляване
pdfjs-zoom-in-button =
    .title = Увеличаване
pdfjs-zoom-in-button-label = Увеличаване
pdfjs-zoom-select =
    .title = Мащабиране
pdfjs-presentation-mode-button =
    .title = Превключване към режим на представяне
pdfjs-presentation-mode-button-label = Режим на представяне
pdfjs-open-file-button =
    .title = Отваряне на файл
pdfjs-open-file-button-label = Отваряне
pdfjs-print-button =
    .title = Отпечатване
pdfjs-print-button-label = Отпечатване
pdfjs-save-button =
    .title = Запазване
pdfjs-save-button-label = Запазване
# Used in Firefox for Android as a tooltip for the download button (“download” is a verb).
pdfjs-download-button =
    .title = Изтегляне
# Used in Firefox for Android as a label for the download button (“download” is a verb).
# Length of the translation matters since we are in a mobile context, with limited screen estate.
pdfjs-download-button-label = Изтегляне
pdfjs-bookmark-button =
    .title = Текуща страница (преглед на адреса на страницата)
pdfjs-bookmark-button-label = Текуща страница

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Инструменти
pdfjs-tools-button-label = Инструменти
pdfjs-first-page-button =
    .title = Към първата страница
pdfjs-first-page-button-label = Към първата страница
pdfjs-last-page-button =
    .title = Към последната страница
pdfjs-last-page-button-label = Към последната страница
pdfjs-page-rotate-cw-button =
    .title = Завъртане по час. стрелка
pdfjs-page-rotate-cw-button-label = Завъртане по часовниковата стрелка
pdfjs-page-rotate-ccw-button =
    .title = Завъртане обратно на час. стрелка
pdfjs-page-rotate-ccw-button-label = Завъртане обратно на часовниковата стрелка
pdfjs-cursor-text-select-tool-button =
    .title = Включване на инструмента за избор на текст
pdfjs-cursor-text-select-tool-button-label = Инструмент за избор на текст
pdfjs-cursor-hand-tool-button =
    .title = Включване на инструмента ръка
pdfjs-cursor-hand-tool-button-label = Инструмент ръка
pdfjs-scroll-page-button =
    .title = Използване на плъзгане на страници
pdfjs-scroll-page-button-label = Плъзгане на страници
pdfjs-scroll-vertical-button =
    .title = Използване на вертикално плъзгане
pdfjs-scroll-vertical-button-label = Вертикално плъзгане
pdfjs-scroll-horizontal-button =
    .title = Използване на хоризонтално
pdfjs-scroll-horizontal-button-label = Хоризонтално плъзгане
pdfjs-scroll-wrapped-button =
    .title = Използване на мащабируемо плъзгане
pdfjs-scroll-wrapped-button-label = Мащабируемо плъзгане
pdfjs-spread-none-button =
    .title = Режимът на сдвояване е изключен
pdfjs-spread-none-button-label = Без сдвояване
pdfjs-spread-odd-button =
    .title = Сдвояване, започвайки от нечетните страници
pdfjs-spread-odd-button-label = Нечетните отляво
pdfjs-spread-even-button =
    .title = Сдвояване, започвайки от четните страници
pdfjs-spread-even-button-label = Четните отляво

## Document properties dialog

pdfjs-document-properties-button =
    .title = Свойства на документа…
pdfjs-document-properties-button-label = Свойства на документа…
pdfjs-document-properties-file-name = Име на файл:
pdfjs-document-properties-file-size = Големина на файл:
# Variables:
#   $kb (Number) - the PDF file size in kilobytes
#   $b (Number) - the PDF file size in bytes
pdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } КБ ({ $b } байта)
# Variables:
#   $mb (Number) - the PDF file size in megabytes
#   $b (Number) - the PDF file size in bytes
pdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } МБ ({ $b } байта)
pdfjs-document-properties-title = Заглавие:
pdfjs-document-properties-author = Автор:
pdfjs-document-properties-subject = Тема:
pdfjs-document-properties-keywords = Ключови думи:
pdfjs-document-properties-creation-date = Дата на създаване:
pdfjs-document-properties-modification-date = Дата на промяна:
# Variables:
#   $dateObj (Date) - the creation/modification date and time of the PDF file
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-document-properties-creator = Създател:
pdfjs-document-properties-producer = PDF произведен от:
pdfjs-document-properties-version = Издание на PDF:
pdfjs-document-properties-page-count = Брой страници:
pdfjs-document-properties-page-size = Размер на страницата:
pdfjs-document-properties-page-size-unit-inches = инч
pdfjs-document-properties-page-size-unit-millimeters = мм
pdfjs-document-properties-page-size-orientation-portrait = портрет
pdfjs-document-properties-page-size-orientation-landscape = пейзаж
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Letter
pdfjs-document-properties-page-size-name-legal = Правни въпроси

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
pdfjs-document-properties-linearized = Бърз преглед:
pdfjs-document-properties-linearized-yes = Да
pdfjs-document-properties-linearized-no = Не
pdfjs-document-properties-close-button = Затваряне

## Print

pdfjs-print-progress-message = Подготвяне на документа за отпечатване…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Отказ
pdfjs-printing-not-supported = Внимание: Този четец няма пълна поддръжка на отпечатване.
pdfjs-printing-not-ready = Внимание: Този PDF файл не е напълно зареден за печат.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Превключване на страничната лента
pdfjs-toggle-sidebar-notification-button =
    .title = Превключване на страничната лента (документът има структура/прикачени файлове/слоеве)
pdfjs-toggle-sidebar-button-label = Превключване на страничната лента
pdfjs-document-outline-button =
    .title = Показване на структурата на документа (двукратно щракване за свиване/разгъване на всичко)
pdfjs-document-outline-button-label = Структура на документа
pdfjs-attachments-button =
    .title = Показване на притурките
pdfjs-attachments-button-label = Притурки
pdfjs-layers-button =
    .title = Показване на слоевете (двукратно щракване за възстановяване на всички слоеве към състоянието по подразбиране)
pdfjs-layers-button-label = Слоеве
pdfjs-thumbs-button =
    .title = Показване на миниатюрите
pdfjs-thumbs-button-label = Миниатюри
pdfjs-current-outline-item-button =
    .title = Намиране на текущия елемент от структурата
pdfjs-current-outline-item-button-label = Текущ елемент от структурата
pdfjs-findbar-button =
    .title = Намиране в документа
pdfjs-findbar-button-label = Търсене
pdfjs-additional-layers = Допълнителни слоеве

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Страница { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Миниатюра на страница { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Търсене
    .placeholder = Търсене в документа…
pdfjs-find-previous-button =
    .title = Намиране на предишно съвпадение на фразата
pdfjs-find-previous-button-label = Предишна
pdfjs-find-next-button =
    .title = Намиране на следващо съвпадение на фразата
pdfjs-find-next-button-label = Следваща
pdfjs-find-highlight-checkbox = Открояване на всички
pdfjs-find-match-case-checkbox-label = Съвпадение на регистъра
pdfjs-find-match-diacritics-checkbox-label = Без производни букви
pdfjs-find-entire-word-checkbox-label = Цели думи
pdfjs-find-reached-top = Достигнато е началото на документа, продължаване от края
pdfjs-find-reached-bottom = Достигнат е краят на документа, продължаване от началото
# Variables:
#   $current (Number) - the index of the currently active find result
#   $total (Number) - the total number of matches in the document
pdfjs-find-match-count =
    { $total ->
        [one] { $current } от { $total } съвпадение
       *[other] { $current } от { $total } съвпадения
    }
# Variables:
#   $limit (Number) - the maximum number of matches
pdfjs-find-match-count-limit =
    { $limit ->
        [one] Повече от { $limit } съвпадение
       *[other] Повече от { $limit } съвпадения
    }
pdfjs-find-not-found = Фразата не е намерена

## Predefined zoom values

pdfjs-page-scale-width = Ширина на страницата
pdfjs-page-scale-fit = Вместване в страницата
pdfjs-page-scale-auto = Автоматично мащабиране
pdfjs-page-scale-actual = Действителен размер
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = Страница { $page }

## Loading indicator messages

pdfjs-loading-error = Получи се грешка при зареждане на PDF-а.
pdfjs-invalid-file-error = Невалиден или повреден PDF файл.
pdfjs-missing-file-error = Липсващ PDF файл.
pdfjs-unexpected-response-error = Неочакван отговор от сървъра.
pdfjs-rendering-error = Грешка при изчертаване на страницата.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [Анотация { $type }]
# Variables:
#   $dateObj (Date) - the modification date and time of the annotation
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }

## Password

pdfjs-password-label = Въведете парола за отваряне на този PDF файл.
pdfjs-password-invalid = Невалидна парола. Моля, опитайте отново.
pdfjs-password-ok-button = Добре
pdfjs-password-cancel-button = Отказ
pdfjs-web-fonts-disabled = Уеб-шрифтовете са забранени: разрешаване на използването на вградените PDF шрифтове.

## Editing

pdfjs-editor-free-text-button =
    .title = Текст
pdfjs-editor-free-text-button-label = Текст
pdfjs-editor-ink-button =
    .title = Рисуване
pdfjs-editor-ink-button-label = Рисуване
pdfjs-editor-stamp-button =
    .title = Добавяне или променяне на изображения
pdfjs-editor-stamp-button-label = Добавяне или променяне на изображения

## Remove button for the various kind of editor.

pdfjs-editor-remove-ink-button =
    .title = Премахване на рисунката
pdfjs-editor-remove-freetext-button =
    .title = Премахване на текста
pdfjs-editor-remove-stamp-button =
    .title = Пермахване на изображението
pdfjs-editor-remove-highlight-button =
    .title = Премахване на открояването

##

# Editor Parameters
pdfjs-editor-free-text-color-input = Цвят
pdfjs-editor-free-text-size-input = Размер
pdfjs-editor-ink-color-input = Цвят
pdfjs-editor-ink-thickness-input = Дебелина
pdfjs-editor-ink-opacity-input = Прозрачност
pdfjs-editor-stamp-add-image-button =
    .title = Добавяне на изображение
pdfjs-editor-stamp-add-image-button-label = Добавяне на изображение
# .default-content is used as a placeholder in an empty text editor.
pdfjs-free-text2 =
    .aria-label = Текстов редактор
    .default-content = Започнете да пишете…

## Alt-text dialog

pdfjs-editor-alt-text-button-label = Алтернативен текст
pdfjs-editor-alt-text-dialog-label = Изберете от възможностите
pdfjs-editor-alt-text-dialog-description = Алтернативният текст помага на потребителите, когато не могат да видят изображението или то не се зарежда.
pdfjs-editor-alt-text-add-description-label = Добавяне на описание
pdfjs-editor-alt-text-add-description-description = Стремете се към 1-2 изречения, описващи предмета, настройката или действията.
pdfjs-editor-alt-text-mark-decorative-label = Отбелязване като декоративно
pdfjs-editor-alt-text-mark-decorative-description = Използва се за орнаменти или декоративни изображения, като контури и водни знаци.
pdfjs-editor-alt-text-cancel-button = Отказ
pdfjs-editor-alt-text-save-button = Запазване
pdfjs-editor-alt-text-decorative-tooltip = Отбелязване като декоративно
# .placeholder: This is a placeholder for the alt text input area
pdfjs-editor-alt-text-textarea =
    .placeholder = Например, „Млад мъж седи на маса и се храни“

## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.

pdfjs-editor-resizer-top-left =
    .aria-label = Горен ляв ъгъл — преоразмеряване
pdfjs-editor-resizer-top-middle =
    .aria-label = Горе в средата — преоразмеряване
pdfjs-editor-resizer-top-right =
    .aria-label = Горен десен ъгъл — преоразмеряване
pdfjs-editor-resizer-middle-right =
    .aria-label = Дясно в средата — преоразмеряване
pdfjs-editor-resizer-bottom-right =
    .aria-label = Долен десен ъгъл — преоразмеряване
pdfjs-editor-resizer-bottom-middle =
    .aria-label = Долу в средата — преоразмеряване
pdfjs-editor-resizer-bottom-left =
    .aria-label = Долен ляв ъгъл — преоразмеряване
pdfjs-editor-resizer-middle-left =
    .aria-label = Ляво в средата — преоразмеряване

## Color picker

# This means "Color used to highlight text"
pdfjs-editor-highlight-colorpicker-label = Цвят на открояване
pdfjs-editor-colorpicker-button =
    .title = Промяна на цвят
pdfjs-editor-colorpicker-dropdown =
    .aria-label = Избор на цвят
pdfjs-editor-colorpicker-yellow =
    .title = Жълто
pdfjs-editor-colorpicker-green =
    .title = Зелено
pdfjs-editor-colorpicker-blue =
    .title = Синьо
pdfjs-editor-colorpicker-pink =
    .title = Розово
pdfjs-editor-colorpicker-red =
    .title = Червено

## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.

pdfjs-editor-new-alt-text-not-now-button = Не сега

# Additional translations for ngx-extended-pdf-viewer (bg)
unverified-signature-warning = Този PDF файл съдържа цифров подпис. PDF преглядачът не може да провери дали подписът е валиден. Моля, изтеглете файла и го отворете в Acrobat Reader, за да проверите дали подписът е валиден.
pdfjs-infinite-scroll-button-label = Безкрайно превъртане
pdfjs-find-multiple-checkbox-label = Съвпадение на всяка дума
pdfjs-find-regexp-checkbox-label = Регулярен израз
pdfjs-editor-movePageUp-button = Премести страницата нагоре
pdfjs-editor-movePageUp-button-label = Премести страницата нагоре
pdfjs-editor-movePageDown-button = Премести страницата надолу
pdfjs-editor-movePageDown-button-label = Премести страницата надолу
# Translations for ngx-extended-pdf-viewer additions only available in en-US
pdfjs-editor-color-picker-free-text-input =
    .title = Change text color
pdfjs-editor-color-picker-ink-input =
    .title = Change drawing color
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
pdfjs-editor-remove-signature-button =
    .title = Remove signature
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