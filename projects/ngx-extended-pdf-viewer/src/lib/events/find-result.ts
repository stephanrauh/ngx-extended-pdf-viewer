export enum FindState {
  FOUND = 0,
  NOT_FOUND = 1,
  WRAPPED = 2,
  PENDING = 3,
}

export interface FindResultMatchesCount {
  current: number;
  total: number;
  matches: Array<any>;
  matchesLength: Array<any>;
  caseSensitive: boolean;
  entireWord: boolean;
  findPrevious: boolean;
  highlightAll: boolean;
  matchDiacritics: boolean;
  query: string;
  type: 'findagain' | 'highlightallchange' | 'casesensitivitychange' | 'entirewordchange' | 'diacriticmatchingchange' | 'find';
}

export interface FindResult {
  state: FindState;
  previous: any;
  matchesCount: FindResultMatchesCount;
  rawquery: string;
}
