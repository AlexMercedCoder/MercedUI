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
    container.toggle();
};

const rotator = document.getElementById('rot');

const rotations = {
    first: `<h1>Hello World</h1>`,
    second: `<h1>Hello World 2</h1>`,
    third: `<h1>Hello World 3</h1>`
};

const rotate = createRotator(rotations, rotator);
