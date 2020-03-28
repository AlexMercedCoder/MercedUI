//////////////////////////////
//MercedUI Library by Alex Merced of AlexMercedCoder.com
/////////////////////////////

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

const createBuildRotator = (object, element) => {
    return (string, store) => {
        element.innerHTML = object[string](store);
    };
};

const createCompRotator = (element) => {
    return (component, attributes) => {
        element.innerHTML = `<${component} ${attributes}></${component}>`;
    };
};

////////////////////////
//mapToString Function
///////////////////////

const mapToString = (arr, callback) => {
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

////////////////////////
//capture props
///////////////////////

const captureProps = (element) => {
    const att = [...element.attributes];
    const entries = att.map((value) => {
        return [value.name, value.value];
    });

    return Object.fromEntries(entries);
};

////////////////////////////
// SiteBuilder
////////////////////////////

class SiteBuilder {
    constructor(target, store, builder) {
        this.target = target;
        this.store = store;
        this.template = builder(store);
        this.builder = builder;
        target.innerHTML = this.template;
    }

    updateStore(newStore) {
        this.store = newStore;
        this.template = this.builder(this.store);
        this.target.innerHTML = this.template;
    }
}

////////////////////////
//makeLiveComponent
///////////////////////

const makeLiveComponent = (options) => {
    options.store = JSON.stringify(options.store);
    const string = `
  class ${options.prefix}${options.name} extends HTMLElement {
      constructor() {
          super();
          ${options.observe}
          this.attachShadow({ mode: 'open' });
          this.life = new SiteBuilder(this.shadowRoot, ${options.store}, ${options.builder} )
      }
      connectedCallback() {
          ${options.connected}
      }

      ${options.other}

  }

  window.customElements.define('${options.prefix}-${options.name}', ${options.prefix}${options.name});`;
    eval(string);
};

////////////////////////////
// FormTool
////////////////////////////

class FormTool {
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

const getQueryHash = () => {
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

const MUIRequest = async (url, object) => {
    const response = await fetch(url, object);
    const json = await response.json();
    return await json;
};

/////////////////////////
// globalStore
/////////////////////////

const globalStore = (initialStore) => {
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
        clearRegister
    };
};

/////////////////////////
// gsReducer
/////////////////////////

const gsReducer = (globalStore, reducer) => {
    return (payload) => {
        const newStore = reducer(globalStore.get(), payload);
        globalStore.set(newStore);
    };
};

//////////////////
//MercedElement
/////////////////

class MercedElement extends HTMLElement {
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
    }

    setState(newState) {
        this.state = newState;
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

const simpleComponent = (options) => {
    options.state = JSON.stringify(options.state);
    const string = `

class ${options.prefix}${options.name} extends HTMLElement {
    constructor() {
        super();
        ${options.observe ? options.observe : ''}
        this.builder = ${options.builder}
        this.state = ${options.state}
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
    }

    setState(newState) {
      this.state = newState
      this.build()
    }

}

window.customElements.define('${options.prefix}-${options.name}', ${
        options.prefix
    }${options.name})`;
    eval(string);
};

///////////////////
// mRouter and mLink
///////////////////

const mRoutes = {};

class MercedRouter extends HTMLElement {
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

class MercedLink extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.props = captureProps(this);
        this.shadowRoot.innerHTML = `<span style="cursor: pointer;"
        onclick="mRoutes.${this.props.name}.route('${this.props.target}',${
            this.props.props ? `'${this.props.props}'` : ''
        })"><slot></slot></span>`;
    }
}

window.customElements.define('m-link', MercedLink);

///////////////////////////////
// QuickComponent
///////////////////////////////

const quickComponent = (
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

$m = {
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
    }
};

///////////////////////////////
// $s shadowRoot function abbreviations
///////////////////////////////

$s = {
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
    }
};
