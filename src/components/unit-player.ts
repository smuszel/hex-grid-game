import { Collision } from '../meta/Collision';

export default class UnitPlayer extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('rom', '3');
        this.setAttribute('life', '1');
        this.addEventListener('dragstart', ev => {
            ev.preventDefault();
        })
        this.parentElement.addEventListener('collision', this.eat);

        const v = Object.values(this.children) as HTMLElement[];
    }

    eat = (ev: Collision) => {
        const lifeToAdd = ev.detail.receiver.getAttribute('life');
        const newLife = parseInt(this.getAttribute('life')) + parseInt(lifeToAdd);
        this.setAttribute('life', `${newLife}`);
    }
}