//////////////////////////////
//MercedUI Library by Alex Merced of AlexMercedCoder.com
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

export class MercedContainer extends HTMLElement {
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

export class MercedCard extends HTMLElement {
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

export const mapToDom = (arr, callback, element) => {
    let html = '';
    for (let index = 0; index < arr.length; index++) {
        html = html + callback(arr[index], index);
    }
    element.innerHTML = html;
};

////////////////////////
//bindData Function
///////////////////////

export const bindData = (arr, callback, element) => {
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

export const createRotator = (object, element) => {
    return (string) => {
        element.innerHTML = object[string];
    };
};

export const createBuildRotator = (object, element) => {
    return (string, store) => {
        element.innerHTML = object[string](store);
    };
};

export const createCompRotator = (element) => {
    return (component, attributes) => {
        element.innerHTML = `<${component} ${attributes}></${component}>`;
    };
};

////////////////////////
//mapToString Function
///////////////////////

export const mapToString = (arr, callback) => {
    let html = '';
    for (let index = 0; index < arr.length; index++) {
        html = html + callback(arr[index], index);
    }
    return html;
};

////////////////////////
//makeComponent
///////////////////////

export const makeComponent = (options) => {
    const string = `const compTemplate = document.createElement('template');

  compTemplate.innerHTML = "${options.template}";

  class ${options.prefix}${options.name} extends HTMLElement {
      constructor() {
          super();
          ${options.observe ? options.observe : ''}
          this.attachShadow({ mode: 'open' });
      }
      connectedCallback() {
          this.shadowRoot.appendChild(compTemplate.content.cloneNode(true));
          ${options.connected ? options.connected : ''}
      }

      ${options.other ? options.other : ''}

  }

  window.customElements.define('${options.prefix}-${options.name}', ${
        options.prefix
    }${options.name});`;

    if (options.debug) {
        options.debug === true ? console.log(string) : '';
    }
    eval(string);
};

////////////////////////
//capture props
///////////////////////

export const captureProps = (element) => {
    const att = [...element.attributes];
    const entries = att.map((value) => {
        return [value.name, value.value];
    });

    return Object.fromEntries(entries);
};

////////////////////////////
// SiteBuilder
////////////////////////////

export class SiteBuilder {
    constructor(target, store, builder) {
        this.target = target;
        this.store = store;
        this.template = builder(store);
        this.builder = builder;
        target.innerHTML = this.template;
    }

    updateStore(newStore) {
        this.store = { ...this.store, ...newStore };
        this.template = this.builder(this.store);
        this.target.innerHTML = this.template;
    }
}

////////////////////////
//makeLiveComponent
///////////////////////

export const makeLiveComponent = (options) => {
    options.store = JSON.stringify(options.store);

    const string = `
  class ${options.prefix}${options.name} extends HTMLElement {
      constructor() {
          super();
          ${options.observe ? options.observe : ''}
          this.attachShadow({ mode: 'open' });
          this.life = new SiteBuilder(this.shadowRoot, ${options.store}, ${
        options.builder
    } )
      }
      connectedCallback() {
          ${options.connected ? options.connected : ''}
      }

      ${options.other ? options.other : ''}

  }

  window.customElements.define('${options.prefix}-${options.name}', ${
        options.prefix
    }${options.name});`;

    if (options.debug) {
        options.debug === true ? console.log(string) : '';
    }

    eval(string);
};

////////////////////////////
// FormTool
////////////////////////////

export class FormTool {
    constructor(form) {
        this.form = form;
        this.fields = [...this.form.children].filter((value) => {
            return (
                (value.tagName === 'INPUT' || value.tagName === 'TEXTAREA') &&
                value.type != 'submit'
            );
        });
    }

    grabValues() {
        const entries = this.fields.map((value) => {
            return [value.name, value.value];
        });
        return Object.fromEntries(entries);
    }

    fillFields(object) {
        const keys = Object.keys(object);
        const values = Object.values(object);
        keys.forEach((key) => {
            this.fields.forEach((field) => {
                if (field.name === key) {
                    field.value = object[key];
                }
            });
        });
    }

    clearForm() {
        const entries = this.fields.forEach((value) => {
            value.value = null;
        });
    }
}

////////////////////////////
// getQueryHash
////////////////////////////

export const getQueryHash = () => {
    const hash = window.location.href.split('#')[1];

    const queryArray1 = window.location.href.split('?')[1];

    const queryArray2 = queryArray1 ? queryArray1.split('#')[0].split('&') : [];

    const queryEntries = queryArray2.map((value) => {
        return value.split('=');
    });

    return [Object.fromEntries(queryEntries), hash];
};

////////////////////////////
// MUIRequest
////////////////////////////

export const MUIRequest = async (url, object) => {
    const response = await fetch(url, object);
    const json = await response.json();
    return await json;
};

/////////////////////////
// globalStore
/////////////////////////

export const globalStore = (initialStore) => {
    let store = initialStore;
    let registrar = [];

    const get = () => {
        return store;
    };
    const set = (newStore) => {
        store = newStore;

        registrar.forEach((value) => {
            value.life ? value.life.updateStore(store) : null;
            value.updateStore ? value.updateStore(store) : null;
            value.state ? value.setState(store) : null;
        });
    };

    const register = (component) => {
        registrar.push(component);
        component.life ? component.life.updateStore(store) : null;
        component.updateStore ? component.updateStore(store) : null;
        component.state ? component.setState(store) : null;
    };

    const clearRegister = () => {
        registrar = [];
    };

    return {
        get,
        set,
        register,
        clearRegister,
    };
};

/////////////////////////
// gsReducer
/////////////////////////

export const gsReducer = (globalStore, reducer) => {
    return (payload) => {
        const newStore = reducer(globalStore.get(), payload);
        globalStore.set(newStore);
    };
};

//////////////////
//MercedElement
/////////////////

export class MercedElement extends HTMLElement {
    constructor(builder, state, reducer) {
        super();
        this.builder = builder;
        this.state = state;
        this.reducer = reducer;
        this.props = {};
        this.attachShadow({ mode: 'open' });
        this.build();
    }

    build() {
        this.props = captureProps(this);
        this.shadowRoot.innerHTML = this.builder(this.state, this.props);
        this.postBuild(this.state, this.props);
    }

    postBuild(state, props) {
        return null;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.build();
    }

    dispatch(payload) {
        this.setState(this.reducer(this.state, payload));
    }

    static gState = {};

    static gRegistry = [];

    static gRegister(element) {
        this.gRegistry.push(element);
    }

    static gSetState(newState) {
        this.gState = newState;
        this.gRegistry.forEach((value) => {
            value.setState(this.gState);
        });
    }

    static gDispatch(reducer, payload) {
        this.gSetState(reducer(this.gState, payload));
    }

    static makeTag(name, element) {
        window.customElements.define(name, element);
    }
}

///////////////
//SimpleComponent
//////////////

export const simpleComponent = (options) => {
    options.state = JSON.stringify(options.state);
    const string = `

class ${options.prefix}${options.name} extends HTMLElement {
    constructor() {
        super();
        ${options.observe ? options.observe : ''}
        this.builder = ${options.builder}
        this.state = ${options.state}
        this.postBuild = ${options.postBuild ? options.postBuild : () => {}} 
        this.props = {}
        this.attachShadow({ mode: 'open' });
        this.build()
    }
    ${options.connected ? options.connected : ''}

    ${options.disconnected ? options.disconnected : ''}

    ${options.other ? options.other : ''}

    build(){
      this.props = captureProps(this)
      this.shadowRoot.innerHTML = this.builder(this.state, this.props)
      this.postBuild(this.state, this.props)
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.build()
    }

}

window.customElements.define('${options.prefix}-${options.name}', ${
        options.prefix
    }${options.name})`;

    if (options.debug) {
        options.debug === true ? console.log(string) : '';
    }

    eval(string);
};

///////////////////
// mRouter and mLink
///////////////////

export const mRoutes = {};

export class MercedRouter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.props = captureProps(this);
        mRoutes[this.props.name] = this;
        this.shadowRoot.innerHTML = `<${this.props.default} ${this.props.props}><slot></slot></${this.props.default}>`;
    }

    route(target, props) {
        this.shadowRoot.innerHTML = `<${target} ${props}><slot></slot></${target}>`;
    }
}

window.customElements.define('m-router', MercedRouter);

export class MercedLink extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.props = captureProps(this);
        this.shadowRoot.innerHTML = `<span style="cursor: pointer;"><slot></slot></span>`;
        this.shadowRoot.querySelector('span').addEventListener('click', () => {
            mRoutes[this.props.name].route(
                this.props.target,
                this.props.props ? this.props.props : ''
            );
        });
    }
}

window.customElements.define('m-link', MercedLink);

///////////////////////////////
// QuickComponent
///////////////////////////////

export const quickComponent = (
    name,
    builder,
    state,
    reducer,
    connected,
    disconnected
) => {
    MercedElement.makeTag(
        name,
        class extends MercedElement {
            constructor() {
                super(builder, state, reducer);
            }

            connectedCallback() {
                const element = this;
                connected ? connected(element) : null;
            }

            disconnectedCallback() {
                const element = this;
                disconnected ? disconnected(element) : null;
            }
        }
    );
};

///////////////////////////////
// $M function abbreviations
///////////////////////////////

export const $m = {
    select: (q) => {
        return document.querySelector(q);
    },
    selectAll: (q) => {
        return document.querySelectorAll(q);
    },
    byId: (q) => {
        return document.getElementById(q);
    },
    byTag: (q) => {
        return document.getElementsByTagName(q);
    },
    byClass: (q) => {
        return document.getElementsByClassName(q);
    },
    create: (q) => {
        return document.createElement(q);
    },
    remove: (q) => {
        return document.removeChild(q);
    },
    append: (q) => {
        return document.appendChild(q);
    },
    replace: (q, y) => {
        return document.replaceChild(q, y);
    },
};

///////////////////////////////
// $s shadowRoot function abbreviations
///////////////////////////////

export const $s = {
    select: (e, q) => {
        return e.shadowRoot.querySelector(q);
    },
    selectAll: (e, q) => {
        return e.shadowRoot.querySelectorAll(q);
    },
    byId: (e, q) => {
        return e.shadowRoot.getElementById(q);
    },
    byTag: (e, q) => {
        return e.shadowRoot.getElementsByTagName(q);
    },
    byClass: (e, q) => {
        return e.shadowRoot.getElementsByClassName(q);
    },
    create: (e, q) => {
        return e.shadowRoot.createElement(q);
    },
    remove: (e, q) => {
        return e.shadowRoot.removeChild(q);
    },
    append: (e, q) => {
        return e.shadowRoot.appendChild(q);
    },
    replace: (e, q, y) => {
        return e.shadowRoot.replaceChild(q, y);
    },
};
