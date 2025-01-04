/* tslint:disable:max-line-length */
import { Settings } from 'angular2-smart-table';

export const cssRulesSettings: Settings = {
  columns: {
    rule: {
      title: 'CSS rule',
      type: 'text',
    },
    description: {
      title: 'Description',
      type: 'html',
    },
  },
  actions: false,
  hideSubHeader: false,
  pager: {
    display: false,
    perPage: 5000,
  },
};

export const availableCssRules = [
  {
    rule: 'ngx-extended-pdf-viewer-prevent-touch-move',
    description:
      "This CSS rule is added to the document body when one of the editors is active L(i.e. text editor or ink draw editor). It's used to prevent scrolling when drawing. If your page has a scrollbar, add a <code>touch-action: none</code> rule to the scrolling HTML element.",
  },
];
