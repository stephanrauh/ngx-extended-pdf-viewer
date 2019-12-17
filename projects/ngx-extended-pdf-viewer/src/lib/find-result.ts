export enum FindState {
  FOUND = 0,
  NOT_FOUND = 1,
  WRAPPED = 2,
  PENDING = 3
}

export interface FindResultMatchesCount {
  current?: number;
  total?: number;
}

export interface FindResult {
  state: FindState;
  previous: any;
  matchesCount: FindResultMatchesCount;
}
