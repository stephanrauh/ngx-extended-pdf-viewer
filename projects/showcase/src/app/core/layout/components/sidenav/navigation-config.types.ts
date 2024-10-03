export type NavigationEntry = NavigationGroup | NavigationTarget;

export type NavigationGroup = {
  type: 'group';
  displayName: string;
  children: NavigationEntry[];
};

export type NavigationTarget = {
  type: 'target';
  displayName: string;
  link?: string;
};

export function isNavigationGroup(entry: NavigationEntry): entry is NavigationGroup {
  return entry.type === 'group';
}

export function isNavigationTarget(entry: NavigationEntry): entry is NavigationTarget {
  return entry.type === 'target';
}
