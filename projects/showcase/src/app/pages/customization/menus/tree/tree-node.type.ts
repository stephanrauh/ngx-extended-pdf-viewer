export type TreeNode = {
  name: string;
  id?: string;
  children?: TreeNode[];
  content?: string;
  expanded?: boolean;
  prefix?: string;
  suffix?: string;
};
