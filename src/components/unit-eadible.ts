export default class UnitEadible extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add('centered');
        this.addEventListener('dragstart', ev => {
            ev.preventDefault();
        })
    }
}