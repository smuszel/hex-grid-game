import { Collision } from 'meta/Collision';
import { eventHandler } from '../decorators/eventHandler';

export default class UnitEdible extends HTMLElement {

    constructor() {
        super();
    }

    static construct() {
        const instance = document.createElement('unit-edible') as UnitEdible;

        return {
            appendTo: (el: HTMLElement) => {
                el.appendChild(instance);
                
                return instance
            }
        }
    }

    spoil() {
        this.setAttribute('life', '-1');
    }

    @eventHandler('dragstart')
    dontFollowHorribleHTML5Spec(ev) {
        ev.preventDefault();
    }

    @eventHandler('collision')
    removeSelf(ev: Collision) {
        if (ev.detail.receiver === this) {
            this.parentElement.removeChild(this);
        }
    }
}


// const edible = document.createElement('unit-edible') as HTMLElement;
// edible.setAttribute('life', '1');
// move(edible, this.randomCoords);
// this.appendChild(edible);