/*
const _isInPageRanges = (page = 1, commaSeparatedRanges = "1,3,6-7") => {
  try {
    if (!commaSeparatedRanges) {
      return true;
    }
    const parts = commaSeparatedRanges.split(",");
    return parts.some(range => _isInPageRange1(page, range));
  } catch (e) {
    return true;
  }
}

const _isInPageRange1 = (page = 1, range = "6-7") => {
  try {
    if (!range) {
      return true;
    }
    if (range.includes("-")) {
      const parts = range.split("-");
      const from = parts[0].trim();
      if (from.length > 0) {
        if (page >= Number(from)) {
          return false;
        }
      }
      const to = parts[1].trim();
      if (to.length > 0) {
        if (page <= Number(to)) {
          return false;
        }
      }
    } else {
      const from = range.trim();
      if (from.length > 0) {
        if (Number(from) === page) {
          return true;
        } else {
          return false;
        }
      }
    }
    return true;
  } catch (e) {
    return true;
  }
}

PDFFindController.prototype._isInPageRange = _isInPageRange;
*/
