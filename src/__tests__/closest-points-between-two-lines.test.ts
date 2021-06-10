import closestPointsBetweenTwoLines from '../index';

type Vec3 = [number, number, number] | Float32Array | Float64Array;

const EPSILON = 1e-8;

function equals(a: number, b: number) {
    return Math.abs(a - b) < EPSILON;
}

function distance(a: Vec3, b: Vec3) {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function isPointOnLine(p: Vec3, px: number, py: number, pz: number, nx: number, ny: number, nz: number) {
    const vx = p[0] - px;
    const vy = p[1] - py;
    const vz = p[2] - pz;
    const cx = vy * nz - vz * ny;
    const cy = -vx * nz + vz * nx;
    const cz = vx * ny - vy * nx;
    return cx ** 2 + cy ** 2 + cz ** 2 < EPSILON;
}

test('closest-points-between-two-lines', () => {
    const p1: Vec3 = [0, 0, 0];
    const p2: Vec3 = [0, 0, 0];
    let parallel = false;

    // coincide
    parallel = closestPointsBetweenTwoLines(
        p1, p2,
        0, 0, 0,
        1, 0, 0,
        1, 0, 0,
        -1, 0, 0
    );
    expect(parallel).toBe(true);
    expect(isPointOnLine(p1, 0, 0, 0, 1, 0, 0)).toBe(true);
    expect(isPointOnLine(p2, 1, 0, 0, -1, 0, 0)).toBe(true);
    expect(equals(distance(p1, p2), 0)).toBe(true);

    // parallel
    parallel = closestPointsBetweenTwoLines(
        p1, p2,
        -1, 0, 0,
        1, 0, 0,
        1, 0, 2,
        -1, 0, 0
    );
    expect(parallel).toBe(true);
    expect(isPointOnLine(p1, -1, 0, 0, 1, 0, 0)).toBe(true);
    expect(isPointOnLine(p2, 1, 0, 2, -1, 0, 0)).toBe(true);
    expect(equals(distance(p1, p2), 2)).toBe(true);

    parallel = closestPointsBetweenTwoLines(
        p1, p2,
        -1, 0, 0,
        1, 0, 0,
        1, 0, -2,
        1, 0, 0
    );
    expect(parallel).toBe(true);
    expect(isPointOnLine(p1, -1, 0, 0, 1, 0, 0)).toBe(true);
    expect(isPointOnLine(p2, 1, 0, -2, 1, 0, 0)).toBe(true);
    expect(equals(distance(p1, p2), 2)).toBe(true);

    // perpendicular
    parallel = closestPointsBetweenTwoLines(
        p1, p2,
        -1, 0, 0,
        1, 0, 0,
        0, -1, 1,
        0, 1, 0
    );
    expect(parallel).toBe(false);
    expect(isPointOnLine(p1, -1, 0, 0, 1, 0, 0)).toBe(true);
    expect(isPointOnLine(p2, 0, -1, 1, 0, 1, 0)).toBe(true);
    expect(equals(distance(p1, p2), 1)).toBe(true);

    // intersect
    parallel = closestPointsBetweenTwoLines(
        p1, p2,
        -1, 0, 0,
        1, 0, 0,
        0, -1, 0,
        0, 1, 0
    );
    expect(parallel).toBe(false);
    expect(isPointOnLine(p1, -1, 0, 0, 1, 0, 0)).toBe(true);
    expect(isPointOnLine(p2, 0, -1, 0, 0, 1, 0)).toBe(true);
    expect(equals(distance(p1, p2), 0)).toBe(true);
});