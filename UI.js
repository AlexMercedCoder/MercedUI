/////////////////
//merced-container
/////////////////

const containerTemplate = document.createElement('template');

containerTemplate.innerHTML = `
<div style="
display: flex;
width: 90%;
flex-wrap: wrap;
margin: 20px auto;
">

<slot></slot>

</div>



`;

class MercedContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.appendChild(containerTemplate.content.cloneNode(true));
    }
}

window.customElements.define('merced-container', MercedContainer);
