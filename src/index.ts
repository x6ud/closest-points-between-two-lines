type Vec3 = [number, number, number] | Float32Array | Float64Array;

/**
 * Find the two closest points on two 3D lines.
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
    n2x: number, n2y: number, n2z: number,
): void {
    let d = n1x ** 2 * n2y ** 2
        + n1x ** 2 * n2z ** 2
        - 2 * n1x * n1y * n2x * n2y
        - 2 * n1x * n1z * n2x * n2z
        + n1y ** 2 * n2x ** 2
        + n1y ** 2 * n2z ** 2
        - 2 * n1y * n1z * n2y * n2z
        + n1z ** 2 * n2x ** 2
        + n1z ** 2 * n2y ** 2;
    if (out1) {
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
            t1 = 0;
        }
        out1[0] = p1x + n1x * t1;
        out1[1] = p1y + n1y * t1;
        out1[2] = p1z + n1z * t1;
    }
    if (out2) {
        let t2 = (
            n1x ** 2 * n2y * p1y
            - n1x ** 2 * n2y * p2y
            + n1x ** 2 * n2z * p1z
            - n1x ** 2 * n2z * p2z
            - n1x * n1y * n2x * p1y
            + n1x * n1y * n2x * p2y
            - n1x * n1y * n2y * p1x
            + n1x * n1y * n2y * p2x
            - n1x * n1z * n2x * p1z
            + n1x * n1z * n2x * p2z
            - n1x * n1z * n2z * p1x
            + n1x * n1z * n2z * p2x
            + n1y ** 2 * n2x * p1x
            - n1y ** 2 * n2x * p2x
            + n1y ** 2 * n2z * p1z
            - n1y ** 2 * n2z * p2z
            - n1y * n1z * n2y * p1z
            + n1y * n1z * n2y * p2z
            - n1y * n1z * n2z * p1y
            + n1y * n1z * n2z * p2y
            + n1z ** 2 * n2x * p1x
            - n1z ** 2 * n2x * p2x
            + n1z ** 2 * n2y * p1y
            - n1z ** 2 * n2y * p2y
        ) / d;
        if (!isFinite(t2)) {
            p2x = p1x;
            p2y = p1y;
            p2z = p1z;
            t2 = 0;
        }
        out2[0] = p2x + n2x * t2;
        out2[1] = p2y + n2y * t2;
        out2[2] = p2z + n2z * t2;
    }
}