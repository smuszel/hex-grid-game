import { permuteCoords } from '../tools/misc';
import { childElements } from '../tools/childElements';
import { isInRange } from '../tools/isInRange';
import HexTile from './hex-tile';
import { eventHandler } from '../decorators/eventHandler';
import { childrenAttributeObserver } from '../decorators/childrenAttributeObserver';
import { HTMLElementPlus } from '../meta/HTMLElementPlus';
import { locate } from '../tools/locate';
import { move } from '../tools/move';
import UnitEdible from './unit-edible';

export default class HexGrid extends HTMLElementPlus {

    constructor() {
        super();
    }

    render() {
        const tile = ([x, y]) => `<hex-tile x=${x} y=${y}></hex-tile>`;
        const z = permuteCoords(this.getAttribute('sizex'), this.getAttribute('sizey')).map(tile);
        
        return z.join('');
    }

    queryIndexExh([x, y]) {
        const h = (el: HTMLElement) => {
            const xMatch = el.getAttribute('x') === `${x}`;
            const yMatch = el.getAttribute('y') === `${y}`;
            const notTile = !(el instanceof HexTile);

            return xMatch && yMatch && notTile;
        };

        const occupants = childElements(this.children).filter(h);

        return occupants;
    }

    queryIndex([x, y]) {
        return this.queryIndexExh([x, y])[0];
    }

    abortDrag = () => {
        if (this.draggedItem) {
            this.draggedItem = null;
        }
    }

    @eventHandler('dragstart')
    dontFollowHorribleHTML5Spec(ev) {
        ev.preventDefault();
    }

    @childrenAttributeObserver('x', 'y')
    handleMovement(mut: MutationRecord[]) {
        const observedTarget = mut[0].target;

        if (observedTarget instanceof HTMLElement) {
            this.fireMovementEvent();
            ///
            const coordinates = locate(observedTarget);
            const elementAtSameTile = this.queryIndexExh(coordinates)
                .filter(el => el !== observedTarget)[0];

            if (elementAtSameTile) {
                this.fireCollisionEvent(observedTarget, elementAtSameTile);
            }
        }
    }

    fireMovementEvent() {
        const movement = new CustomEvent('movement');
        this.dispatchEvent(movement);
    }
    
    fireCollisionEvent(issuer, receiver) {
        const childrenCollision = new CustomEvent('collision', {
            bubbles: false,
            detail: { receiver, issuer }
        });

        issuer.dispatchEvent(childrenCollision);
        receiver.dispatchEvent(childrenCollision);
        this.dispatchEvent(childrenCollision);
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
        const coordinates = this.pointerPositionToCoords(ev.clientX, ev.clientY);
        const el = this.queryIndex(coordinates);

        if (el) {
            el.style.setProperty('--pageXDragOrigin', `${ev.pageX}px`);
            el.style.setProperty('--pageYDragOrigin', `${ev.pageY}px`);
    
            this.draggedItem = el;
        }
    }

    @eventHandler('mouseup')
    releaseDraggedItem(ev: MouseEvent) {
        const to = this.pointerPositionToCoords(ev.clientX, ev.clientY);

        if (to[0] != null && this.draggedItem) {
            const rangeOfMovement = parseInt(this.draggedItem.getAttribute('rom'));
            const from = locate(this.draggedItem);
            const satisfiesRange = isInRange(from, to, rangeOfMovement);

            if (satisfiesRange) {
                move(this.draggedItem, to);
            }
        }

        this.abortDrag();
    }

    pointerPositionToCoords(pointerX, pointerY) {
        const elements = document.elementsFromPoint(pointerX, pointerY);
        const tile = elements.find(el => el instanceof HexTile);

        if (tile instanceof HexTile) {
            return locate(tile);
        } else {
            return [null, null] as OffsetCoordinates;
        }
    }


    get draggedItem() {
        const el = this.querySelector('.drag');

        return el as HTMLElement;
    }

    set draggedItem(candidate: HTMLElement) {
        const reference = this.draggedItem;

        if (reference) {
            reference.style.setProperty('--pageXDrag', `${0}px`);
            reference.style.setProperty('--pageYDrag', `${0}px`);
            this.draggedItem.style.setProperty('--pageXDragOrigin', `${0}px`);
            this.draggedItem.style.setProperty('--pageYDragOrigin', `${0}px`);
            reference.classList.remove('drag-move', 'drag-start', 'drag');
            this.tiles.forEach(tile => tile.classList.remove('in-range'));
        }

        if (candidate) {
            candidate.classList.add('drag', 'drag-start');

            const rangeOfMovement = parseInt(candidate.getAttribute('rom'));
            const from = locate(candidate);
            const h = to => isInRange(from, to, rangeOfMovement);

            this.tiles.forEach(tile => {
                if (h(locate(tile))) {
                    tile.classList.add('in-range');
                }
            })
        }
    }

    get tiles() {
        const tiles = childElements(this.children)
            .filter(el => el instanceof HexTile);

        return tiles;
    }

    get randomVacantCoords(): OffsetCoordinates {
        const gen = () => ['sizex', 'sizey']
            .map(n => this.getAttribute(n))
            .map(a => parseInt(a))
            .map(b => Math.random() * b)
            .map(c => Math.floor(c))
            ;
        
        const cs = gen() as OffsetCoordinates;
        const occupied = !!this.queryIndex(cs);

        if (occupied) {
            return this.randomVacantCoords;
        } else {
            return cs;
        }
    }

    get ediblesCount() {
        return childElements(this.children)
            .filter(x => x instanceof UnitEdible)
            .length
    }

    get totalSize() {
        return ['sizex', 'sizey']
            .map(n => this.getAttribute(n))
            .map(a => parseInt(a))
            .reduce((a, x) => a * x, 1)
            ;
    }
}