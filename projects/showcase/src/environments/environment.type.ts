export type Environment = {
  minifiedJSLibraries: boolean;
};

export type EnvironmentKey = keyof Environment;
export type EnvironmentValueType<K extends EnvironmentKey> = Environment[K];
