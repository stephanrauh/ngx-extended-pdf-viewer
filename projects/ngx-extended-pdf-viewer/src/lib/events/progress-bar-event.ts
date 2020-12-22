export interface ProgressBarEvent {
  source: any,
  type: "print" | "load",
  total: number
  page?: number,
  loaded?: number,
  percent: number;
}
