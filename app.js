const target = document.getElementById('test');
const builder = (store) => {
    const props = captureProps(this);
    return `<h1>${props.hello}</h1>`;
};

// const test = new SiteBuilder(target, { hello: 'Hello World' }, builder);
//
// const goodbye = () => {
//     test.updateStore({ hello: 'goodbye' });
// };

const goodbye2 = () => {
    document.getElementById('liveComp').life.updateStore({ hello: 'goodbye' });
};

makeLiveComponent({
    prefix: 'test',
    name: 'life',
    builder,
    store: `{ hello: 'Hello World' }`
});
