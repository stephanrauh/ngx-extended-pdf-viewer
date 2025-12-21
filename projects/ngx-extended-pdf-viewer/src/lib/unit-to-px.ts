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
    if (this.pxPerUnitCache[unit] === undefined) {
      if (!this.con || !this.el) {
        this.initElements();
      }
      if (!this.con || !this.el) {
        // dummy implementation for server-side rendering
        this.pxPerUnitCache[unit] = 1;
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

  public static toPx(length: any): number {
    if (length == null || length === '') {
      throw new TypeError('Error parsing length');
    }
    
    const unitRe = /^\s*([+-]?[\d\.]*)\s*(.*?)\s*$/i; // NOSONAR - trim trailing whitespace too
    const match = unitRe.exec(length);
    if (match != null && match.length > 2) {
      const bare = match[1] === '';
      const val = bare ? 1 : Number(match[1]);
      const unit = match[2].trim(); // Explicitly trim the unit
      const valid = !isNaN(val) && unit && (bare || match[1] !== 'NaN');
      
      // Validate that we have a proper unit (known CSS units)
      const knownUnits = ['px', 'em', 'rem', 'pt', 'pc', 'in', 'cm', 'mm', '%', 'vh', 'vw', 'ex', 'ch'];
      const hasValidUnit = knownUnits.includes(unit);
      
      // Only allow bare units (like "px" without number) for known units
      if (valid && hasValidUnit) {
        return unit === 'px' ? val : this.pxPerUnit(unit) * val;
      }
    }
    throw new TypeError('Error parsing length');
  }
}
