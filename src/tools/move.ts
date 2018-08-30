import { locate } from './locate';

export const move = (el: HTMLElement, [x, y]: OffsetCoordinates) => {
    const [currentX, currentY] = locate(el);
    
    if (currentX !== x) {
        el.setAttribute('x', `${x}`);
    }
        
    if (currentY !== y) {
            el.setAttribute('y', `${y}`);
    }
}