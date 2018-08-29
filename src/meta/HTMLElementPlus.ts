export class HTMLElementPlus extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const self = this as any;

        if (self.connected instanceof Function) {
            self.connected();
        }

        if (self.render instanceof Function) {
            self.innerHTML += self.render();
        }
    }
}