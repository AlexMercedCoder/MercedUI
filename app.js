makeComponent({
    prefix: 'test',
    name: 'one',
    template: `<h1>One</h1>`
});

makeComponent({
    prefix: 'test',
    name: 'two',
    template: `<h1>Two</h1>`
});

makeComponent({
    prefix: 'test',
    name: 'three',
    template: `<h1>Three</h1>`
});

const rotator = createCompRotator(document.querySelector('div'));
