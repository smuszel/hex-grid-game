import { eventHandler } from '../decorators/eventHandler';

export default class HexTile extends HTMLElement {

    constructor() {
        super();
    }

    @eventHandler('dragstart')
    dontFollowHorribleHTML5Spec(ev) {
        ev.preventDefault();
    }

    @eventHandler('click')
    logCoords(ev) {
        console.log(this.getAttribute('x'), this.getAttribute('y'));
    }
}