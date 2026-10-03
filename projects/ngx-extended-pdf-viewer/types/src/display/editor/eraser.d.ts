export class EraserEditor extends AnnotationEditor {
    static _defaultThickness: number;
    static _thickness: any;
    static _type: string;
    static _editorType: number;
    /** @inheritdoc */
    static initialize(l10n: any, uiManager: any): void;
    /** @inheritdoc */
    static updateDefaultParams(type: any, value: any): void;
    static get defaultPropertiesToUpdate(): number[][];
    constructor(params: any);
    defaultL10nId: string;
    /** Ensures EraserEditor spans the entire AnnotationEditorLayer */
    fixAndSetPosition(): void;
    /**
     * @inheritdoc
     * The eraser spans the whole page and must never be selected or dragged:
     * selecting it renders an edit toolbar on top of it which then swallows
     * the next pointerdown, preventing any further erase session. Erasing is
     * handled by the dedicated pointerdown listener (see enableEditing).
     */
    pointerdown(_event: any): void;
    #private;
}
import { AnnotationEditor } from "./editor.js";
