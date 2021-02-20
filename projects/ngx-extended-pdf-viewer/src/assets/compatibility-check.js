function browserSupportsNullSafeChaining() {
  try {
    const result = null?.size();
    return true;
  } catch (notSupportedException) {
    return false;
  }
}

module.exports = browserSupportsNullSafeChaining;
