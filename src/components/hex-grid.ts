import { permuteCoords } from '../tools/allTools';
import { identityVoid } from '../tools/identity';
import { childElements } from '../tools/childElements';
import { isInHexRange } from '../tools/isInHexRange';

class GridOccupantStub {
    style = {
        setProperty: identityVoid
    };

    classList = {
        add: identityVoid,
        remove: identityVoid
    };

    setAttribute = identityVoid
}

export default class HexGrid extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('mouseup', this.releaseDraggedItem);
        this.addEventListener('mousedown', this.startDraggingItem);
        this.addEventListener('mousemove', this.moveDraggedItem);
        this.addEventListener('mouseleave', this.abortDrag);

        this.render();
    }

    render() {
        const tile = ([x, y]) => `<hex-tile x=${x} y=${y}></hex-tile>`;
        const z = permuteCoords(this.getAttribute('sizex'), this.getAttribute('sizey')).map(tile);
        
        this.innerHTML = z.join('')
    }

    queryIndex(x, y) {
        const h = (occupant: HTMLElement) => {
            const xMatch = occupant.getAttribute('x') === x;
            const yMatch = occupant.getAttribute('y') === y;
            const notTile = occupant.tagName !== 'HEX-TILE';

            return xMatch && yMatch && notTile;
        };

        const occupant = childElements(this.children).find(h);

        if (occupant instanceof HTMLElement) {
            return occupant
        } else {
            return new GridOccupantStub() as HTMLElement;
        }
    }

    abortDrag = () => {
        this.draggedItem = null;
    }

    moveDraggedItem = (ev: MouseEvent) => {
        this.draggedItem.classList.add('drag-move');
        this.draggedItem.classList.remove('drag-start');

        this.draggedItem.style.setProperty('--pageXDrag', `${ev.pageX}px`);
        this.draggedItem.style.setProperty('--pageYDrag', `${ev.pageY}px`);
    }

    startDraggingItem = (ev: MouseEvent) => {
        const el = this.occupantFromPointerPosition(ev.clientX, ev.clientY);

        this.draggedItem = el;
    }

    releaseDraggedItem = (ev: MouseEvent) => {
        const [toX, toY] = this.pointerPositionToCoords(ev.clientX, ev.clientY);

        if (toX && toY) {
            const rangeOfMovement = this.draggedItem.getAttribute('rom');
            const fromX = this.draggedItem.getAttribute('x');
            const fromY = this.draggedItem.getAttribute('y');
            const satisfiesRange = isInHexRange(fromX, fromY, toX, toY, rangeOfMovement);

            if (satisfiesRange) {
                this.draggedItem.setAttribute('x', toX);
                this.draggedItem.setAttribute('y', toY);
            }

        }

        this.abortDrag();
    }

    occupantFromPointerPosition(pointerX, pointerY) {
        const [x, y] = this.pointerPositionToCoords(pointerX, pointerY);
        const el = this.queryIndex(x, y);

        return el;
    }

    pointerPositionToCoords(pointerX, pointerY) {
        const elements = document.elementsFromPoint(pointerX, pointerY);
        const tile = elements.find(el => el.tagName === 'HEX-TILE');

        if (tile) {
            const x = tile.getAttribute('x');
            const y = tile.getAttribute('y');

            return [x, y];
        } else {
            return [null, null];
        }
    }


    get draggedItem() {
        const el = this.querySelector('.drag');

        if (el instanceof HTMLElement) {
            return el;
        } else {
            return new GridOccupantStub() as HTMLElement;
        }
    }

    set draggedItem(v: HTMLElement) {
        const reference = this.draggedItem;

        reference.style.setProperty('--pageXDrag', `${0}px`);
        reference.style.setProperty('--pageYDrag', `${0}px`);
        reference.classList.remove('drag-move', 'drag-start', 'drag');

        if (v) {
            v.classList.add('drag', 'drag-start');
        }
    }
}