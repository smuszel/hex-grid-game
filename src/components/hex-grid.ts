import { permuteCoords } from '../tools/allTools';
import { childElements } from '../tools/childElements';
import { isInHexRange } from '../tools/isInHexRange';
import HexTile from './hex-tile';
import { eventHandler } from '../decorators/eventHandler';
import { childrenAttributeObserver } from '../decorators/childrenAttributeObserver';
import { HTMLElementPlus } from '../meta/HTMLElementPlus';

export default class HexGrid extends HTMLElementPlus {

    constructor() {
        super();
    }

    render() {
        const tile = ([x, y]) => `<hex-tile x=${x} y=${y}></hex-tile>`;
        const z = permuteCoords(this.getAttribute('sizex'), this.getAttribute('sizey')).map(tile);
        
        return z.join('');
    }

    queryIndexExh(x, y) {
        const h = (occupant: HTMLElement) => {
            const xMatch = occupant.getAttribute('x') === x;
            const yMatch = occupant.getAttribute('y') === y;
            const notTile = !(occupant instanceof HexTile);

            return xMatch && yMatch && notTile;
        };

        const occupants = childElements(this.children).filter(h);

        return occupants;
    }

    queryIndex(x, y) {
        return this.queryIndexExh(x,y)[0];
    }

    @eventHandler('dragstart')
    dontFollowHorribleHTML5Spec(ev) {
        ev.preventDefault();
    }

    @childrenAttributeObserver('x', 'y')
    collisionCheck(mut: MutationRecord[]) {
        const observedTarget = mut[0].target;
        console.log(mut);

        if (observedTarget instanceof HTMLElement) {
            const x = observedTarget.getAttribute('x');
            const y = observedTarget.getAttribute('y');

            const occupants = this.queryIndexExh(x, y);

            if (occupants.length > 1) {
                const otherOccupants = occupants.filter(x => x !== observedTarget);
                const issuer = observedTarget;
                const receiver = otherOccupants[0];

                const childrenCollision= new CustomEvent('collision', {
                    bubbles: false,
                    detail: { receiver, issuer }
                });

                issuer.dispatchEvent(childrenCollision);
                receiver.dispatchEvent(childrenCollision);
                this.dispatchEvent(childrenCollision)
            }
        }
    }

    abortDrag = () => {
        this.draggedItem = null;
    }

    @eventHandler('mousemove')
    moveDraggedItem(ev: MouseEvent) {
        if (this.draggedItem) {
            this.draggedItem.classList.add('drag-move');
            this.draggedItem.classList.remove('drag-start');
    
            this.draggedItem.style.setProperty('--pageXDrag', `${ev.pageX}px`);
            this.draggedItem.style.setProperty('--pageYDrag', `${ev.pageY}px`);
        }
    }

    @eventHandler('mousedown')
    startDraggingItem(ev: MouseEvent) {
        const el = this.occupantFromPointerPosition(ev.clientX, ev.clientY);

        if (el) {
            el.style.setProperty('--pageXDragOrigin', `${ev.pageX}px`);
            el.style.setProperty('--pageYDragOrigin', `${ev.pageY}px`);
    
            this.draggedItem = el;
        }
    }

    @eventHandler('mouseup')
    releaseDraggedItem(ev: MouseEvent) {
        const [toX, toY] = this.pointerPositionToCoords(ev.clientX, ev.clientY);

        if (toX && toY && this.draggedItem) {
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
        const tile = elements.find(el => el instanceof HexTile);

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

        return el as HTMLElement;
    }

    set draggedItem(v: HTMLElement) {
        const reference = this.draggedItem;

        if (reference) {
            reference.style.setProperty('--pageXDrag', `${0}px`);
            reference.style.setProperty('--pageYDrag', `${0}px`);
            this.draggedItem.style.setProperty('--pageXDragOrigin', `${0}px`);
            this.draggedItem.style.setProperty('--pageYDragOrigin', `${0}px`);
            reference.classList.remove('drag-move', 'drag-start', 'drag');
            this.tiles.forEach(t => t.classList.remove('in-range'));
        }

        if (v) {
            v.classList.add('drag', 'drag-start');
            const rangeOfMovement = v.getAttribute('rom');
            const fromX = v.getAttribute('x');
            const fromY = v.getAttribute('y');
            const h = (toX, toY) => isInHexRange(fromX, fromY, toX, toY, rangeOfMovement);

            this.tiles.forEach(t => {
                const x = t.getAttribute('x');
                const y = t.getAttribute('y');

                if (h(x, y)) {
                    t.classList.add('in-range');
                }
            })
        }
    }

    get tiles() {
        const tiles = childElements(this.children)
            .filter(el => el instanceof HexTile);

        return tiles;
    }
}