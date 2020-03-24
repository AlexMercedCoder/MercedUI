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

document.querySelectorAll('hello-world').forEach((value) => {
    myStore.register(value);
});

const sayHello = () => {
    myStore.set({ hello: 'Hello there!' });
};

consoel.log(myStore.clearRegister());

function test(strings) {
    console.log(arguments);
    return [strings];
}

console.log(test`this is a ${myStore.get().hello}`);
