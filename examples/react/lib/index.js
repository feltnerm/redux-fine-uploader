const React = require('react')
const { Provider } = require('react-redux')

const store = require('./store')()
const ReduxFineUploader = require('./redux-fine-uploader')

const UPLOADER_NAME = 'example'
class ExampleUploader extends React.Component {
  constructor (props) {
    super(props)
    this.callbacks = {
      onSubmit: (id, filename) => {
        console.log(`onSubmit callback for: #${id} - ${filename}`)
      }
    }
  }

  render () {
    return (
      <div>
        <ReduxFineUploader
          uploaderName={UPLOADER_NAME}
          callbacks={this.callbacks}
                />
      </div>
    )
  }
}

class Example extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <ExampleUploader />
      </Provider>
    )
  }
}

module.exports = Example
