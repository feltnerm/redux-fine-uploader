const React = require('react')
const ReactDOM = require('react-dom')

const Example = require('./lib')

// setup our DOM
const reactRootEl = document.createElement('div')
const fineUploaderEl = document.createElement('div')
reactRootEl.id = 'app'
fineUploaderEl.id = 'fine-uploader'
document.body.appendChild(reactRootEl)
document.body.appendChild(fineUploaderEl)
ReactDOM.render(<Example />, reactRootEl)
