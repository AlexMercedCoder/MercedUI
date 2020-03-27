const builder = (state, props) => {
    return `<h1>${state.hello}</h1>
          <h2>${props.user}</h2>`;
};

initialState = { hello: 'hello world' };

const connected = (element) => {
    console.log(element);
};

quickComponent('test-test', builder, initialState, null, connected);

const testEl = $m.select('test-test');

console.log($s.select(testEl, 'h1'));
