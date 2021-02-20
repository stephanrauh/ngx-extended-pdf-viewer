function ngxBrowserSupportsNullSafeChaining() {
  try {
    const result = null?.size();
    return true;
  } catch (notSupportedException) {
    return false;
  }
}
