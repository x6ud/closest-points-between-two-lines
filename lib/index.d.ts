declare type Vec3 = [number, number, number] | Float32Array | Float64Array;
/**
 * Find the two closest points on two 3D lines.
 * Return true if two lines are parallel.
 *
 * @param out1 Output - The closest point on line 1.
 * @param out2 Output - The closest point on line 2.
 * @param p1x X of a point on line 1.
 * @param p1y Y of a point on line 1.
 * @param p1z Z of a point on line 1.
 * @param n1x X of the unit vector of the direction of line 1.
 * @param n1y Y of the unit vector of the direction of line 1.
 * @param n1z Z of the unit vector of the direction of line 1.
 * @param p2x X of a point on line 2.
 * @param p2y Y of a point on line 2.
 * @param p2z Z of a point on line 2.
 * @param n2x X of the unit vector of the direction of line 2.
 * @param n2y Y of the unit vector of the direction of line 2.
 * @param n2z Z of the unit vector of the direction of line 2.
 */
export default function closestPointsBetweenTwoLines(out1: Vec3 | null, out2: Vec3 | null, p1x: number, p1y: number, p1z: number, n1x: number, n1y: number, n1z: number, p2x: number, p2y: number, p2z: number, n2x: number, n2y: number, n2z: number): boolean;
export {};
