export const  NEED_PASSWORD = 1;
export const   INCORRECT_PASSWORD = 2;

export interface PasswordPrompt {
  setUpdateCallback(updateCallback: (password: string) => void, reason: 1 | 2);
}
