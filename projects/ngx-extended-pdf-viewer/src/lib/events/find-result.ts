export enum FindState {
  FOUND = 0,
  NOT_FOUND = 1,
  WRAPPED = 2,
  PENDING = 3
}

export interface FindResultMatchesCount {
  current?: number;
  total?: number;
  matches?: Array<any>;
  matchesLength?: Array<any>;
  matchesColor?: Array<any>;

}

export interface FindResult {
  state: FindState;
  previous: any;
  matchesCount: FindResultMatchesCount;
}
