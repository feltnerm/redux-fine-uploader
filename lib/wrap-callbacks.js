const actions = require('./actions')
const { callbackToActionMap } = require('./callbacks')

const isFunc = f => typeof f === 'function'
/**
 * Wrap fine-uploader callbacks so they dispatch the correct actions.
 * Still allow user to provide their own...
 */
const wrapCallbacks = (uploaderName, dispatch, callbacks) => {
    const callbacksThatDispatch = Object.entries(callbackToActionMap).reduce((wrappedCallbacks, [ callbackName, callbackOptions ]) => {
        return Object.assign({}, wrappedCallbacks, {
            [callbackName]: function () {
                const args = [].slice.call(arguments);
                const action = callbackOptions.action // .bind?
                dispatch(action(uploaderName, args))
                return isFunc(callbacks[callbackName]) ? callbacks[callbackName](args) : undefined
            }
        })
    }, {})
    return Object.assign({}, callbacks, callbacksThatDispatch)
}

module.exports = wrapCallbacks
