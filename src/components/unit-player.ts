export default class UnitPlayer extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add('centered');
        this.setAttribute('rom', '3')
        // this.setAttribute('draggable', 'false');
    }
}