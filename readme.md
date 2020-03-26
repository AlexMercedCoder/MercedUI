# MercedUI

## By Alex Merced of AlexMercedCoder.com

![mui](https://i.imgur.com/Jp894lv.png)

If you just wants a simpler way to create Web Components, try out simple components at https://github.com/AlexMercedCoder/simpleComponents_

If you prefer defining your components via classes, MercedElement is a base class easily building components: https://github.com/AlexMercedCoder/MercedElement

_MercedUI has simpleComponent and MercedElement built but if you only wanted those features you can use the smaller libraries above_

## About

The MercedUI Library creates some basic web components for assembling a userUI and some helper functions to help in creating a UI without having to increase your bundlesize by bringing a large UI library like Angular and React.

CDN Link: http://www.alexmercedcoder.com/UI.js
Youtube Tutorials: https://www.youtube.com/playlist?list=PLY6oTPmKnKbYrP3DfCUTYYADu0IT9DRZZ

## Classes

### SiteBuilder

A class to encapsulate reactive data and templates

The constructor takes three arguments:

-   DOM element to apply template to (assigns template to innerHTML)
-   store, reactive data, most useful as an object with properties
-   builder, a function that takes the store as an argument and returns a template string

```
const target = document.getElementById('test');
const builder = (store) => {
    return `<h1>${store.hello}</h1>`;
};

const test = new SiteBuilder(target, { hello: 'Hello World' }, builder);
```

SiteBuilder has one method, updateData, which takes one argument which becomes the new store and triggers a re-rendering of the template.

```
const goodbye = () => {
    test.updateStore({ hello: 'goodbye' });
};
```

### FormTool

This is a class whose constructor takes a form element and allows you to grab the form data and clear the form with each.

**this.grabValues()** returns object with form values with name property as keys

**this.clearForm()** clears all form Values

**this.fillFields(object)** takes object fills in the form fields where key matches input name property

```
const form = document.querySelector('form');

const testForm = new FormTool(form);
```

```
<form id="myform">
    <input type="text" name="one" />
    <input type="text" name="two" />
    <input type="text" name="three" />
    <textarea name="four"></textarea>
</form>
<button onclick="console.log(testForm.grabValues())">Form Data</button>
<button onclick="testForm.clearForm()">Clear Values</button>
```

FormTool has two methods, grabValues() which will return you an object with the forms values using the name property as the key and the value property as the value. The second method is clearForm which will render the property of value of all form elements to null. Won't grab or clear the value on submit inputs but will for all others.

### MercedElement

MercedElement is a base class for creating components. In the constructor use the super to define the template builder function, state, and reducer. Afterwards use the MercedElement.makeTag(name, class) static function to register the HTML tag

```
class TestTest extends MercedElement {
    constructor() {
        super(
            (state, props) => { // Argument 1: The Build Function
                return `<h1>${state.hello}</h1><h2>${props.user}</h2>`;
            },

            { hello: 'Hello World' }, //Argument 2: The Initial State

            (oldstate, payload) => { //Argument 3: Reducer Function (think redux)
                if (payload.action === 'goodbye') {
                    return { hello: 'goodbye' };
                }
            }
        );
    }
}

MercedElement.makeTag('test-test', TestTest);
```

in HTML

```
<test-test user="joe"></test-test>
```

#### Instance methods

instance.build() - captures the current props and state and renders a template

instance.setState(newState) - updates the components state and runs build

instance.dispatch(payload) - updates the state by running the reducer defined in the constructor

#### Static methods

MercedElement.gRegister(classInstance) - registers a component instance with the global state

MercedElement.clearRegister() - removes all components from global registry

MercedElement.gSetState(newState) - set the global state and re-render all registered components

MercedElement.gDispatch(reducer, payload) - update the global state with the given reducer function and payload, then re-render all registered components

MercedElement.makeTag(name, class) - register your custom components with HTML tags, the name must have a dash like ('hello-world')

#### LifeCycle Functions

Outside the constructor just override the same functions used in the native web components api.

connectedCallback(){} => Runs when components mounted

disconnectedCallback(){} => Runs when component is removed from dom

_read JavaScript Documentation regarding adoptedCallback and attributeChangedCallback_

## Functions

### getQueryHash

_getQueryHash()_
This function will return an array, the first element being an object with all URL queries, the second being any URL hashes that may exist.

```
const [queries, hash] = getQueryHash()
```

### MUIRequest

_MUIRequest(url, configObject)_
This is a really simple abstraction over the fetch API, just helps you skip the stop of having to turn your response back into an object. The goal was just to save you the trouble of loading other AJAX libraries like Axios to keep your bundleSize small.

```
MUIRequest('https://jsonplaceholder.typicode.com/posts/1').then((response) =>
    console.log(response)
);
```

### makeComponent

_makeComponent({options})_
Pass an object with all the options in to generate a component.

#### Option properties

-   prefix: the first part of the components components name
-   name: the second part of the components name
-   template: a string with the html to be outputted whenever the tag is used
-   connected: string for code to be run when the component is mounted
-   observe: string to ObservedAttributes to constructor
-   other: string to define methods or make use of attributeChangedCallback, disconnectedCallback or adoptedCallback

Defining a component

```
makeComponent({
    prefix: 'test',
    name: 'comp',
    template: '<h1>Hello World</h1>'
});

```

using the component

```
<test-comp></test-comp>
```

### makeComponent

_makeLiveComponent({options})_
Pass an object with all the options in to generate a component with reactive data.

#### Option properties

-   prefix: the first part of the components components name
-   name: the second part of the components name
-   builder: function that is passed the store object and rendered to dom
-   store: Object with data the template depends on, initially passed in as a string
-   connected: string for code to be run when the component is mounted
-   observe: string to ObservedAttributes to constructor
-   other: string to define methods or make use of attributeChangedCallback, disconnectedCallback or adoptedCallback

Defining a component

```
const builder = (store) => {
    return `<h1>${store.hello}</h1>`;
};

makeLiveComponent({
    prefix: 'test',
    name: 'life',
    builder,
    store: `{ hello: 'Hello World' }`
});

```

using the component

```
<test-life></test-life>
```

The way this works is an instance of the SiteBuilder class is in the properties of the element, so if you need to update the store just use the function this.life.updateStore({newstore}) and it will update the store and re-render the template.

### captureProps

_captureProps(element)_
Pass in any html element and this function returns all of its properties as an object.

### globalStore

creates a global store object with three functions
NOTE: You can only register SiteBuilder objects and components made with the makeLiveComponent function for this to work. You can create registerable custom objects as long as the object has "life" property that is a SiteBuilder object.

```
const myStore = globalStore({ hello: '' }); //Creates the global store Object

myStore.get() //returns the current store

myStore.register(document.querySelector('my-component')) //add component to store register

myStore.set({hello: "hello world"}) //updates store, passes store to all registered components and re-renders them

myStore.clearRegister() // Clears Component Registry

```

### gsReducer

This allows you to bind a globalStore to a reducer function, returns a function that takes a payload which is passed into the reducer function setting the bound globalStore to the return value.

Creating a reducer

```
const reduceMyStore = gsReducer(myStore, (oldStore, payload) => {
    switch (payload.action) {
        case 'test':
            oldStore.hello += 'o';
            return { ...oldStore };
            break;

        default:
            return { ...oldstore };
            break;
    }
});
```

using gsReducer

```
<button onclick="reduceMyStore({action: 'test'})">Add o</button>
```

### mapToDom

_mapToDom(array, mapFunction, targetElement)_
Takes an array, maps a function that returns a string over its elements concatenating all the returned strings replacing the innerHTML of the target element. If you plan on re-rendering this data regularly you may prefer to use the bindData function.

```
const myData = ['hello', 'goodbye', 'farewell'];

const container = document.getElementById('container');

mapToDom(
    myData,
    (value, index) => {
        return `
  <merced-card theBorder="3px solid black">${value} is at index ${index}</merced-card>
  `;
    },
    container
);
```

### bindData

_bindData(arr, mapFunction, targetElement)_
This function is a wrapper around mapToDom, it returns a function to change the array data and then re-run the mapToDom function to auto re-render when the data changes using the returned function.

```
const myData = ['hello', 'goodbye', 'farewell'];

const container = document.getElementById('container');

const updateCards = bindData(
    myData,
    (value, index) => {
        return `
  <merced-card theBorder="3px solid black">${value} is at index ${index}</merced-card>
  `;
    },
    container
);

const addOne = () => {
    myData.push('one');
    updateCards(myData);
};
```

### createRotator

createRotator(object, elementToRenderTo)
Pass in an object where each property is a string of html and the dom element to connect to. It returns a function that will allow you to rotate between these properties.

**createBuildRotator works the same way but instead of templates the object should be made up of builder functions, and a second argument should passed to the rotator with a store object with any data used for rendering.**

**createCompRotator only takes one argument (elementToRenderTo) and returns as functions that takes two arguments, first being a string with the name of the component to render and string with attributes to add to the component.**

```
const rotator = document.getElementById('rot')

const rotations = {
  first: `<h1>Hello World</h1>`,
  second: `<h1>Hello World 2</h1>`,
  third: `<h1>Hello World 3</h1>`
}

const rotate = createRotator(rotations, rotator)
```

```
<div id="rot"></div>
<button onclick="rotate('first')">First</button>
<button onclick="rotate('second')">Second</button>
<button onclick="rotate('third')">Third</button>
```

### mapToString

_mapToString(array, mapFunction)_
Takes an array, maps a function that returns a string over its elements concatenating all the returned strings and returns the resulting string. This is particularly useful for generating strings to be used in your rotator properties.

## simpleComponent

Function for creating a web component that is useable in your html.

**simpleComponent(config)**

The config object has many properties to help build your component:
prefix = the prefix to your tag tag
name = the name of your component (the html tag name would be prefix-name)
builder = function that returns template (state, props) => {return templateString}
state = initial state object
connected = pass in a string with your connectedCallback function `connectedCallback(){stuff to happen when component mounted}`
disconnected = pass in a string with your disconnectedCallback function `disconnectedCallback(){stuff to happen when component unmounted}`
observe: pass in string with ObservedAttributes function for component constructor
other: string to define other methods and/or define attributeChangedCallback/adoptedCallback

### Defining a component

```

simpleComponent({
    prefix: 'test',
    name: 'test',
    builder: (state, props) => {
        return `<h1>${state.hello}</h1>
    <h2> ${props.user} </h2>`;
    },
    state: { hello: 'hello world' }
});

const comps = document.querySelectorAll('test-test');

```

### using components in your HTML

In the below code we see the component used three times with different props along with three button that update each components state.

```
<test-test user="jones"></test-test>
<test-test user="harry"></test-test>
<test-test user="james"></test-test>
<button onclick="comps[0].setState({hello: 'one'})">One</button>
<button onclick="comps[1].setState({hello: 'two'})">Two</button>
<button onclick="comps[2].setState({hello: 'three'})">Three</button>
```

## Components

### m-router and m-link

Very similar to most routers, the router tag specifies where links will render and link creates a link that when clicked will render a particular component to the router with the same name attribute. Each router must have a unique name attribute.

-   routers have a default attribute to specify a component to start with
-   links have a target attribute to specify what component will be rendered if clicked.

Given these two Components

```
makeLiveComponent({
    prefix: 'hello',
    name: 'world',
    store: '{hello: ""}',
    builder: (store) => {
        const props = captureProps(this);
        return `<h1>Hello World</h1>`;
    }
});

makeLiveComponent({
    prefix: 'goodbye',
    name: 'world',
    store: '{hello: ""}',
    builder: (store) => {
        const props = captureProps(this);
        return `<h1>Goodbye World</h1>`;
    }
});
```

Here is an example of using the router and link tags

```
<m-router name="main" default="hello-world"></m-router>
<m-link name="main" target="goodbye-world">
    Click Me to Say Goodbye
</m-link>
```

#### All Components below have a instance.toggle() method to toggle the display of the component

### MercedContainer

```

<merced-container></merced-container>

```

creates a div with the following default styles:

```

display: flex;
width: 90%;
flex-wrap: wrap;
margin: 20px auto;

```

can pass in the following properties:

-   justify: sets the justify-content style property
-   align: sets the align-items style property
-   height: sets the height style property

### MercedCard

```

<merced-card></merced-card>

```

creates a div with the following default styles:

```

display: flex;
width: 300px;
flex-direction: column;
flex-wrap: wrap;
margin: 20px auto;

```

can pass in the following properties:

-   justify: sets the justify-content style property
-   align: sets the align-items style property
-   height: sets the height style property
-   theBorder: sets the border style property

```

```
