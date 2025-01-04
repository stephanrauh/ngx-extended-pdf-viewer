import { Component, computed, input } from '@angular/core';
import { TreeNode } from './tree-node.type';

@Component({
  selector: 'pvs-tree',
  standalone: true,
  imports: [],
  template: `
    <ul class="list-none p-0 m-0">
      @for (node of treeData(); track node.name) {
        <li>
          <div class="flex items-center py-1 hover:bg-gray-50 rounded-md group">
            @if (!!node.children?.length) {
              <button class="flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-200 transition-colors" (click)="toggleNode(node)">
                <span class="text-gray-600 text-sm" [class.rotate-90]="!node.expanded"> ▼ </span>
              </button>
            } @else {
              <span class="w-6"></span>
            }

            <span class="flex items-center gap-1">
              {{ node.prefix }}

              @if (node.id) {
                <span class="text-[#8b0000] px-1 cursor-help group inline-block" [title]="idTooltip">
                  id="{{ node.id }}"
                  <span class="ml-1 transition-opacity">ℹ</span>
                </span>
              }

              @if (node.content) {
                <span class="text-blue-600 px-1 cursor-help group inline-block" [title]="contentTooltip">
                  custom content: [{{ node.content }}]
                  <span class="ml-1 transition-opacity">ℹ</span>
                </span>
              }

              {{ node.suffix }}
            </span>
          </div>

          @if (!!node.children?.length && node.expanded) {
            <pvs-tree [initialData]="node.children!" class="pl-6 block" />
          }
        </li>
      }
    </ul>
  `,
})
export class TreeComponent {
  readonly idTooltip =
    'The PDF viewer uses this id to register an action listener. You can replace this widget with your own custom widget. Using the correct id is all you need to call the original behavior.';
  readonly contentTooltip = 'You can use this property to replace the content of this component with your custom content.';

  initialData = input<TreeNode[]>([]);

  treeData = computed(() => this.enrichTreeData(this.initialData()));

  private enrichTreeData(nodes: TreeNode[]): TreeNode[] {
    return nodes.map((node) => {
      const enrichedNode = { ...node };

      enrichedNode.prefix = node.name;
      enrichedNode.suffix = '';

      if (node.name.endsWith('>')) {
        enrichedNode.suffix = '>';
        enrichedNode.prefix = node.name.substring(0, node.name.length - 1);
      }

      if (node.children?.length) {
        enrichedNode.children = this.enrichTreeData(node.children);
        enrichedNode.expanded = true;
      }

      return enrichedNode;
    });
  }

  toggleNode(node: TreeNode): void {
    node.expanded = !node.expanded;
  }
}
