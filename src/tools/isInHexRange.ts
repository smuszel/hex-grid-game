export const isInHexRange = (fromX, fromY, toX, toY, rangeOfMovement) => {
    const dx = Math.abs(fromX - toX);
    const dy = Math.abs(fromY - toY);
    const satisfiesRange = dx <= rangeOfMovement && dy <= rangeOfMovement;

    console.log(satisfiesRange);
    
    return satisfiesRange
}