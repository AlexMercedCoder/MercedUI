# MercedUI

## By Alex Merced of AlexMercedCoder.com

## About

The MercedUI Library creates some basic web components for assembling a userUI and some helper functions to help in creating a UI without having to increase your bundlesize by bringing a large UI library like Angular and React.

CDN Link: http://www.alexmercedcoder.com/UI.js

## Functions

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
``



## Components

#### All Components have toggle() to toggle the display of the component

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
