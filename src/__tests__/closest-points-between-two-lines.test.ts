import closestPointsBetweenTwoLines from '../index';

type Vec3 = [number, number, number] | Float32Array | Float64Array;

const EPSILON = 1e-8;

function vec3Equals(a: Vec3, b: Vec3) {
    return Math.abs(a[0] - b[0]) < EPSILON
        && Math.abs(a[1] - b[1]) < EPSILON
        && Math.abs(a[2] - b[2]) < EPSILON;
}

function equals(a: number, b: number) {
    return Math.abs(a - b) < EPSILON;
}

function distance(a: Vec3, b: Vec3) {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

test('closest-points-between-two-lines', () => {
    const p1: Vec3 = [0, 0, 0];
    const p2: Vec3 = [0, 0, 0];
    closestPointsBetweenTwoLines(
        p1, p2,
        0, 0, 0,
        1, 0, 0,
        1, 0, 0,
        -1, 0, 0
    );
    expect(equals(distance(p1, p2), 0)).toBe(true);

    closestPointsBetweenTwoLines(
        p1, p2,
        -1, 0, 0,
        1, 0, 0,
        0, -1, 1,
        0, 1, 0
    );
    expect(vec3Equals(p1, [0, 0, 0])).toBe(true);
    expect(vec3Equals(p2, [0, 0, 1])).toBe(true);
});