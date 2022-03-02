## closest-points-between-two-lines

### Function

```typescript
type Vec3 = [number, number, number] | Float32Array | Float64Array

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
function closestPointsBetweenTwoLines(
    out1: Vec3 | null, out2: Vec3 | null,
    p1x: number, p1y: number, p1z: number,
    n1x: number, n1y: number, n1z: number,
    p2x: number, p2y: number, p2z: number,
    n2x: number, n2y: number, n2z: number
): boolean
```

Calculate the formula with the following code:

```python
from sympy import *

px1, py1, pz1, px2, py2, pz2 = symbols('p1x p1y p1z p2x p2y p2z')
t1, t2, t3 = symbols('t1 t2 t3')
nx1, ny1, nz1, nx2, ny2, nz2 = symbols('n1x n1y n1z n2x n2y n2z')

p1 = Matrix([px1, py1, pz1])
p2 = Matrix([px2, py2, pz2])
n1 = Matrix([nx1, ny1, nz1])
n2 = Matrix([nx2, ny2, nz2])
n3 = n1.cross(n2)

lhs = p1 + t1 * n1 + t3 * n3
rhs = p2 + t2 * n2

result = solve(lhs - rhs, t1, t2, t3)
print(result)
```

See https://math.stackexchange.com/questions/1993953/closest-points-between-two-lines
