import { Collision } from 'meta/Collision';
import { eventHandler } from '../decorators/eventHandler';

export default class UnitEadible extends HTMLElement {

    constructor() {
        super();
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