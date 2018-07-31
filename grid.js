class Grid extends HTMLElement {

    constructor() {
        super();
        
        const ih = `
            <p>hello wc!</p>
        `
        const tmpl = document.createElement('template');
        tmpl.innerHTML = ih;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(tmpl.content);
        this.addEventListener('click', console.log);

        // const template = document.querySelector('hex-grid');
        // this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
    }

    // connectedCallback() {
        // const p = this.shadowRoot.querySelector('p');
        // console.log(p);
    // }
}

customElements.define('hex-grid', Grid);