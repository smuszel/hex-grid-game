/* tslint:disable */

export const isInRange = (
    from: OffsetCoordinates,
    to: OffsetCoordinates,
    rangeOfMovement: number
) => {
    const qfrom = offsetToCube(from);
    const qto = offsetToCube(to);
    const distance = cubeDistance(qfrom, qto);

    const satisfiesRange = distance <= rangeOfMovement;

    return satisfiesRange;
}

const offsetToCube = ([x, y]: OffsetCoordinates) => {
    const qx = x - (y - (y & 1)) / 2;
    const qz = y;
    const qy = -qx - qz;

    return [qx, qy, qz] as CubeCoordinates;
}

const cubeDistance = (from: CubeCoordinates, to: CubeCoordinates) => {
    const x = Math.abs(from[0] - to[0]);
    const y = Math.abs(from[1] - to[1]);
    const z = Math.abs(from[2] - to[2]);
    
    return (x + y + z) / 2;
}
