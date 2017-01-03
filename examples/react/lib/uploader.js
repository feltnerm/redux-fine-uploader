const React = require('react')
const qq = require('fine-uploader/lib/traditional')

class Uploader extends React.Component {
  constructor (props) {
    super(props)
    this.uploader = {}
  }

  componentDidMount () {
    this.uploader = this._constructUploader(this.props.callbacks)

    const { initialize, uploaderName } = this.props
    initialize(uploaderName)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!this.props.uploader) {
      return false
    }
    return true
  }

  render () {
    return (
      <div>
        {this._processChildren()}
        <div ref={r => { this.uploaderEl = r }} />
      </div>
    )
  }

  _constructUploader (callbacks) {
        // @todo: modularize element
    return new qq.FineUploaderBasic({
      element: this.uploaderEl,
      callbacks
    })
  }

  _processChildren () {
    const { children } = this.props
    return React.Children.map(children, child => {
      if (!child) return child
      var childProps = Object.assign({}, {
        fineUploader: this.uploader
      }, this.props.reduxFineUploaderLocalState) // @todo: select important props once they're accumulated
      return React.cloneElement(child, childProps)
    })
  }
}

Uploader.propTypes = {
  initialize: React.PropTypes.func.isRequired,
  uploaderName: React.PropTypes.string.isRequired,
  callbacks: React.PropTypes.objectOf(React.PropTypes.func)
}

module.exports = Uploader
