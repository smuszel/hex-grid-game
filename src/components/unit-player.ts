import { Collision } from '../meta/Collision';
import { eventHandler } from '../decorators/eventHandler';

export default class UnitPlayer extends HTMLElement {

    constructor() {
        super();
    }

    @eventHandler('collision')
    eat(ev: Collision) {
        const lifeToAdd = ev.detail.receiver.getAttribute('life');
        const newLife = parseInt(this.getAttribute('life')) + parseInt(lifeToAdd);
        this.setAttribute('life', `${newLife}`);
    }

    @eventHandler('dragstart')
    dontFollowHorribleHTML5Spec(ev) {
        ev.preventDefault();
    }
}