export default class HexTile extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', () => console.log(
            this.getAttribute('x'),
            this.getAttribute('y')
        ))
    }
}