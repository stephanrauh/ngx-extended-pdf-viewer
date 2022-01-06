export const NEED_PASSWORD = 1;
export const INCORRECT_PASSWORD = 2;

export interface PasswordPrompt {
  /**
   * Sets the callback function that, in turn, checks whether the password is correct.
   * Close the password dialog before calling the callback function. If the password
   * is wrong, it opens the password prompt dialog again.
   *
   * If you never call the callback, that's the same as clicking "cancel" on the password prompt.
   * In other words, that's the way to go if you don't want to pass the password for some reason.
   *
   * @param updateCallback Function you can call to pass and verify the password
   * @param reason Why is the password prompt requested?
   * 1 = A password is required, but wasn't provided; 2 = the wrong password
   * has been provided, so let's try again
   */
  setUpdateCallback(updateCallback: (password: string) => void, reason: 1 | 2);
}
