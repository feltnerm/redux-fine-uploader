const { connect } = require('react-redux')

const reduxFineUploader = require('../../..')
const { actions, wrapCallbacks } = reduxFineUploader

const Uploader = require('./uploader')

const DEFAULT_STORE_NAMESPACE = 'uploader'
const ReduxFineUploader = connect(
    (state, ownProps) => {
      const defaultNamespace = state[DEFAULT_STORE_NAMESPACE] || {}
      const reduxFineUploaderLocalState = defaultNamespace[ownProps.uploaderName] || {}
      return Object.assign({}, state, {
        reduxFineUploaderLocalState
      })
    },
    (dispatch, ownProps) => {
      const { callbacks, uploaderName } = ownProps
      const wrappedCallbacks = wrapCallbacks(uploaderName, dispatch, callbacks)

      return {
        initialize: uploaderName => dispatch(actions.initialize(uploaderName)),
        wrappedCallbacks
      }
    }
)(Uploader)

module.exports = ReduxFineUploader
