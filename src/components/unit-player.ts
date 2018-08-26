import { StepEvent } from '../meta/StepEvent';

export default class UnitPlayer extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add('centered');
        this.setAttribute('rom', '3');
        this.setAttribute('life', '1');
        this.addEventListener('dragstart', ev => {
            ev.preventDefault();
        })
        this.parentElement.addEventListener('eat', this.eat);

        const v = Object.values(this.children) as HTMLElement[];
    }

    eat = (ev: StepEvent) => {
        if (ev.detail.stepee !== this) {
            const lifeToAdd = ev.detail.stepee.getAttribute('life');
            const newLife = parseInt(this.getAttribute('life')) + parseInt(lifeToAdd);
            this.setAttribute('life', `${newLife}`);
            ev.detail.stepee.parentNode.removeChild(ev.detail.stepee);
        }
    }
}