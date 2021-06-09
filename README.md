## closest-points-between-two-lines

### Function

```typescript
function closestPointsBetweenTwoLines(
    out1: Vec3 | null, out2: Vec3 | null,
    p1x: number, p1y: number, p1z: number,
    n1x: number, n1y: number, n1z: number,
    p2x: number, p2y: number, p2z: number,
    n2x: number, n2y: number, n2z: number,
): void;
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
print(result[t1])
print(result[t2])
```

See https://math.stackexchange.com/questions/1993953/closest-points-between-two-lines
