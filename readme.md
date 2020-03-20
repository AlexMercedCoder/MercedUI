# MercedUI

## By Alex Merced of AlexMercedCoder.com

## About

The MercedUI Library creates some basic web components for assembling a userUI and some helper functions to help in creating a UI without having to increase your bundlesize by bringing a large UI library like Angular and React.

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

## Components

### <merced-container></merced-container>

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

### <merced-card></merced-card>

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
