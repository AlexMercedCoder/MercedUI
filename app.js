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
