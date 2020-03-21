const target = document.getElementById('test');
const builder = (store) => {
    return `<h1>${store.hello}</h1>`;
};

const test = new SiteBuilder(target, { hello: 'Hello World' }, builder);

const goodbye = () => {
    test.updateStore({ hello: 'goodbye' });
};
