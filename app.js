makeComponent({
  prefix: 'test',
  name: 'test',
  template: '<h1>Hello World</h1>',
  debug: false
})

makeLiveComponent({
  prefix: 'test',
  name: 'test2',
  builder: (store) => `<h1>Goodbye World</h1>`,
  store: {},
  debug: false
})
