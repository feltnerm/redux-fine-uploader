const actions = require('./actions')

const callbackToActionMap = {
    'onSubmit': {
        action: actions.onSubmit,
        args: ['id', 'filename']
    }
}

const actionToCallbackMap = {
    [actions.SUBMIT]: 'onSubmit'
}

module.exports = {
    actionsToCallbackMap,
    callbackToActionMap
}

