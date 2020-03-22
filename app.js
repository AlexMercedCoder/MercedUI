const build1 = (store) => {
    return `<h1>${store.hello}</h1>`;
};

const build2 = (store) => {
    return `<h2>${store.hello}</h2>`;
};

const build3 = (store) => {
    return `<h3>${store.hello}</h3>`;
};

const rotator = createBuildRotator(
    { build1, build2, build3 },
    document.querySelector('div')
);
