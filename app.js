const myStore = globalStore({ hello: '' });

makeLiveComponent({
    prefix: 'hello',
    name: 'world',
    store: '{hello: ""}',
    builder: (store) => {
        const props = captureProps(this);
        return `<h1> ${store.hello} ${props.user}</h1>`;
    }
});

document.querySelectorAll('hello-world').forEach((value) => {
    myStore.register(value);
});

const sayHello = () => {
    myStore.set({ hello: 'Hello there!' });
};
