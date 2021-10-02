export class UnitToPx {
  // cache this.con, el for reused
  private static con: HTMLDivElement | undefined = undefined;
  private static el: HTMLDivElement | undefined = undefined;

  // high sample will more accurate?
  private static readonly sample = 100;

  private static pxPerUnitCache: { [key: string]: number } = {};

  private static initElements(): void {
    if (!document) {
      return;
    }
    if (!this.con || !this.el) {
      this.con = document.createElement('div');
      this.el = document.createElement('div');
    }
    this.con.style.position = 'absolute';
    this.con.style.width = '0';
    this.con.style.height = '0';
    this.con.style.visibility = 'hidden';
    this.con.style.overflow = 'hidden';
    this.con.appendChild(this.el);
  }

  private static pxPerUnit(unit: string): number {
    if (!this.pxPerUnitCache[unit]) {
      if (!this.con || !this.el) {
        this.initElements();
      }
      if (!this.con || !this.el) {
        // dummy implementation for server-side rendering
        return 1;
      }
      this.el.style.width = this.sample + unit;
      document.body.appendChild(this.con);
      const dimension = this.el.getBoundingClientRect();
      this.con.parentNode!.removeChild(this.con);
      this.pxPerUnitCache[unit] = dimension.width / this.sample;
    }
    return this.pxPerUnitCache[unit];
  }

  public static toPx(length): number {
    const unitRe = /^\s*([+-]?[\d\.]*)\s*(.*)\s*$/i;
    const match = unitRe.exec(length);
    if (match != null && match.length > 2) {
      const bare = match[1] === '';
      const val = bare ? 1 : Number(match[1]);
      const unit = match[2];
      const valid = !isNaN(val) && unit;
      if (valid) {
        return unit === 'px' ? val : this.pxPerUnit(unit) * val;
      }
    }
    throw new TypeError('Error parsing length');
  }
}
