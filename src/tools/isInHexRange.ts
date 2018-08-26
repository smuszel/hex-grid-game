/* tslint:disable */

export const isInHexRange = (fromX, fromY, toX, toY, rangeOfMovement) => {
    const from = offsetToCube(fromX, fromY);
    const to = offsetToCube(toX, toY);
    const distance = cubeDistance(from, to);

    const satisfiesRange = distance <= rangeOfMovement;

    return satisfiesRange
}

const offsetToCube = (offsetX, offsetY) => {
    const x = offsetX - (offsetY - (offsetY & 1)) / 2;
    const z = offsetY;
    const y = -x - z;

    return [x, y, z];
}

const cubeDistance = (from, to) => {
    const x = Math.abs(from[0] - to[0]);
    const y = Math.abs(from[1] - to[1]);
    const z = Math.abs(from[2] - to[2]);
    
    return (x + y + z) / 2;
}
