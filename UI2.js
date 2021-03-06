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
" id="cont">

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
        const theDiv = this.shadowRoot.getElementById('cont');
        theDiv.style.justifyContent = this.getAttribute('justify');
        theDiv.style.alignItems = this.getAttribute('align');
        theDiv.style.height = this.getAttribute('height');
    }

    toggle() {
        const theDiv = this.shadowRoot.getElementById('cont');
        if (theDiv.style.display === 'flex') {
            theDiv.style.display = 'none';
        } else {
            theDiv.style.display = 'flex';
        }
    }
}

window.customElements.define('merced-container', MercedContainer);

/////////////////
//merced-card
/////////////////

const cardTemplate = document.createElement('template');

cardTemplate.innerHTML = `
<div style="
display: flex;
width: 300px;
flex-direction: column;
flex-wrap: wrap;
margin: 20px auto;
" id="card">

<slot></slot>

</div>



`;

class MercedCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
        const theDiv = this.shadowRoot.getElementById('card');
        theDiv.style.justifyContent = this.getAttribute('justify');
        theDiv.style.alignItems = this.getAttribute('align');
        theDiv.style.height = this.getAttribute('height');
        theDiv.style.border = this.getAttribute('theBorder');
    }

    toggle() {
        const theDiv = this.shadowRoot.getElementById('card');
        if (theDiv.style.display === 'flex') {
            theDiv.style.display = 'none';
        } else {
            theDiv.style.display = 'flex';
        }
    }
}

window.customElements.define('merced-card', MercedCard);
