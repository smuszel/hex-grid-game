export default class HexTile extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', () => console.log(
            this.getAttribute('x'),
            this.getAttribute('y')
        ));


        // this.addEventListener('drag', console.log)
        this.addEventListener('dragstart', ev => {
            ev.preventDefault();
        })
    }
}