//////////////////////////////
//MercedUI Library by Alex Merced of AlexMerced.com
/////////////////////////////

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

////////////////////////
//mapToDom Function
///////////////////////

const mapToDom = (arr, callback, element) => {
    let html = '';
    for (index = 0; index < arr.length; index++) {
        html = html + callback(arr[index], index);
    }
    element.innerHTML = html;
};

////////////////////////
//bindData Function
///////////////////////

const bindData = (arr, callback, element) => {
    let myData = arr;
    mapToDom(myData, callback, element);
    return (newArr) => {
        myData = newArr;
        mapToDom(myData, callback, element);
    };
};

////////////////////////
//createRotator
///////////////////////

const createRotator = (object, element) => {
    return (string) => {
        element.innerHTML = object[string];
    };
};

////////////////////////
//mapToString Function
///////////////////////

const mapToString = (arr, callback, element) => {
    let html = '';
    for (index = 0; index < arr.length; index++) {
        html = html + callback(arr[index], index);
    }
    return html;
};

////////////////////////
//makeComponent
///////////////////////

const makeComponent = (options) => {
    const string = `const compTemplate = document.createElement('template');

  compTemplate.innerHTML = "${options.template}";

  class ${options.prefix}${options.name} extends HTMLElement {
      constructor() {
          super();
          ${options.observe}
          this.attachShadow({ mode: 'open' });
      }
      connectedCallback() {
          this.shadowRoot.appendChild(compTemplate.content.cloneNode(true));
          ${options.connected}
      }

      ${options.other}

  }

  window.customElements.define('${options.prefix}-${options.name}', ${options.prefix}${options.name});`;
    eval(string);
};
