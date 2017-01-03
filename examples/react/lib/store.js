const redux = require('redux')

const reduxFineUploader = require('../../..')
const { reducer } = reduxFineUploader

const makeReducer = () => reducer()
const makeStore = () => redux.createStore(redux.combineReducers({
  uploader: makeReducer()
}))

module.exports = makeStore

