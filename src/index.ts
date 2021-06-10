type Vec3 = [number, number, number] | Float32Array | Float64Array;

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
export default function closestPointsBetweenTwoLines(
    out1: Vec3 | null, out2: Vec3 | null,
    p1x: number, p1y: number, p1z: number,
    n1x: number, n1y: number, n1z: number,
    p2x: number, p2y: number, p2z: number,
    n2x: number, n2y: number, n2z: number
): boolean {
    let d = n1x ** 2 * n2y ** 2
        + n1x ** 2 * n2z ** 2
        - 2 * n1x * n1y * n2x * n2y
        - 2 * n1x * n1z * n2x * n2z
        + n1y ** 2 * n2x ** 2
        + n1y ** 2 * n2z ** 2
        - 2 * n1y * n1z * n2y * n2z
        + n1z ** 2 * n2x ** 2
        + n1z ** 2 * n2y ** 2;
    let parallel = false;
    let t1 = (
        n1x * n2x * n2y * p1y
        - n1x * n2x * n2y * p2y
        + n1x * n2x * n2z * p1z
        - n1x * n2x * n2z * p2z
        - n1x * n2y ** 2 * p1x
        + n1x * n2y ** 2 * p2x
        - n1x * n2z ** 2 * p1x
        + n1x * n2z ** 2 * p2x
        - n1y * n2x ** 2 * p1y
        + n1y * n2x ** 2 * p2y
        + n1y * n2x * n2y * p1x
        - n1y * n2x * n2y * p2x
        + n1y * n2y * n2z * p1z
        - n1y * n2y * n2z * p2z
        - n1y * n2z ** 2 * p1y
        + n1y * n2z ** 2 * p2y
        - n1z * n2x ** 2 * p1z
        + n1z * n2x ** 2 * p2z
        + n1z * n2x * n2z * p1x
        - n1z * n2x * n2z * p2x
        - n1z * n2y ** 2 * p1z
        + n1z * n2y ** 2 * p2z
        + n1z * n2y * n2z * p1y
        - n1z * n2y * n2z * p2y) / d;
    if (!isFinite(t1)) {
        parallel = true;
        t1 = 0;
    }
    let o1x = p1x + n1x * t1;
    let o1y = p1y + n1y * t1;
    let o1z = p1z + n1z * t1;
    if (out1) {
        out1[0] = o1x;
        out1[1] = o1y;
        out1[2] = o1z;
    }
    if (out2) {
        let t3 = (
            -n1x * n2y * p1z
            + n1x * n2y * p2z
            + n1x * n2z * p1y
            - n1x * n2z * p2y
            + n1y * n2x * p1z
            - n1y * n2x * p2z
            - n1y * n2z * p1x
            + n1y * n2z * p2x
            - n1z * n2x * p1y
            + n1z * n2x * p2y
            + n1z * n2y * p1x
            - n1z * n2y * p2x) / d;
        if (isFinite(t3)) {
            let n3x = n1y * n2z - n1z * n2y;
            let n3y = -n1x * n2z + n1z * n2x;
            let n3z = n1x * n2y - n1y * n2x;
            out2[0] = o1x + n3x * t3;
            out2[1] = o1y + n3y * t3;
            out2[2] = o1z + n3z * t3;
        } else {
            parallel = true;
            let n3x = n1y * (p1z - p2z) - n1z * (p1y - p2y);
            let n3y = -n1x * (p1z - p2z) + n1z * (p1x - p2x);
            let n3z = n1x * (p1y - p2y) - n1y * (p1x - p2x);
            out2[0] = o1x + n1y * n3z - n1z * n3y;
            out2[1] = o1y + -n1x * n3z + n1z * n3x;
            out2[2] = o1z + n1x * n3y - n1y * n3x;
        }
    }
    return parallel;
}