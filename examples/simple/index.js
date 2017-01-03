const redux = require('redux')
const qq = require('fine-uploader/lib/traditional')

const reduxFineUploader = require('../..')
const { reducer, wrapCallbacks } = reduxFineUploader

const UPLOADER_NAME = 'example'
const makeReducer = () => reducer()
const makeStore = () => redux.createStore(makeReducer())

const store = makeStore()

const fineUploaderEl = document.createElement('div')
fineUploaderEl.id = 'fine-uploader'
document.body.appendChild(fineUploaderEl)

const callbacks = wrapCallbacks(UPLOADER_NAME, store.dispatch, {
  onSubmit: (id, filename) => {
    console.log(`onSubmit callback for: #${id} - ${filename}`)
    console.log('state: ', store.getState())
  }
})

const uploader = () => {
  return new qq.FineUploader({
    element: document.getElementById('fine-uploader'),
    callbacks
  })
}
uploader()
