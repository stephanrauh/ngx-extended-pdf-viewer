export type KeysConfig = {
  [key: string]: Key;
};

export type Key = {
  displayName: string;
  defaultAccept: boolean | null;
  defaultIgnore: boolean | null;
  meaning: string;
  title?: string;
};
