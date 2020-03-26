makeLiveComponent({
    prefix: 'hello',
    name: 'world',
    store: '{hello: ""}',
    builder: (store) => {
        const props = captureProps(this);
        return `<h1>Hello World</h1>`;
    }
});

makeLiveComponent({
    prefix: 'goodbye',
    name: 'world',
    store: '{hello: ""}',
    builder: (store) => {
        const props = captureProps(this);
        return `<h1>Goodbye World</h1>`;
    }
});
