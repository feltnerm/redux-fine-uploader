const __ACTION_PREFIX__ = '@@fine-uploader/'
const prefix = word => `${__ACTION_PREFIX__}${word}`

const INITIALIZE = prefix('INITIALIZE')
const DESTROY = prefix('DESTROY')
const SUBMIT = prefix('SUBMIT')

const initialize = (uploaderName) => ({ type: INITIALIZE, uploaderName })
const destroy = (uploaderName) => ({ type: DESTROY, uploaderName })
const onSubmit = (uploaderName, payload) => ({ type: SUBMIT, uploaderName, payload })

module.exports = {
  INITIALIZE,
  DESTROY,
  SUBMIT,

  initialize,
  destroy,
  onSubmit
}
