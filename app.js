const myStore = globalStore({ hello: 'cheese' });

makeLiveComponent({
    prefix: 'hello',
    name: 'world',
    store: '{hello: ""}',
    builder: (store) => {
        const props = captureProps(this);
        return `<h1> ${store.hello} ${props.user}</h1>`;
    }
});

myStore.register(document.querySelector('header'));

const testy = new SiteBuilder(document.querySelector('header'), {}, (store) => {
    const props = captureProps(document.querySelector('header'));
    return `<h1> ${store.hello} ${props.user}</h1>`;
});

myStore.register(testy);

const reduceMyStore = gsReducer(myStore, (oldStore, payload) => {
    switch (payload.action) {
        case 'test':
            oldStore.hello += 'o';
            return { ...oldStore };
            break;

        default:
            return { ...oldStore };
            break;
    }
});

document.querySelectorAll('hello-world').forEach((value) => {
    myStore.register(value);
});

const sayHello = () => {
    myStore.set({ hello: 'Hello there!' });
};

function test(strings) {
    console.log(arguments);
    return [strings];
}

console.log(test`this is a ${myStore.get().hello}`);
