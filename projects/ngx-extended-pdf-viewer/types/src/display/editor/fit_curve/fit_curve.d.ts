/**
 *  @preserve  JavaScript implementation of
 *  Algorithm for Automatically Fitting Digitized Curves
 *  by Philip J. Schneider
 *  "Graphics Gems", Academic Press, 1990
 *
 *  The MIT License (MIT)
 *
 *  https://github.com/soswow/fit-curves
 */
/**
 * Fit one or more Bezier curves to a set of points.
 *
 * @param {Array<Array<Number>>} points - Array of digitized points,
 *   e.g. [[5,5],[5,50],[110,140],[210,160],[320,110]]
 * @param {Number} maxError - Tolerance, squared error between points and
 *   fitted curve
 * @returns {Array<Array<Array<Number>>>} Array of Bezier curves, where each
 *   element is
 *   [first-point, control-point-1, control-point-2, second-point]
 *    and points are [x, y]
 */
export function fitCurve(points: Array<Array<number>>, maxError: number, progressCallback: any): Array<Array<Array<number>>>;
