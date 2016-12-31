const actions = require('./actions')
const { actionToCallbackMap, callbackToActionMap } = require('./callbacks')

const convertArgumentsArrayToObject = (specification, args = []) => {
    return args.reduce((obj, arg, index) => {
        const argumentName = specification[index]
        return Object.assign({}, obj, {
            [argumentName]: arg
        })
    }, {})
}

const initialFileState = {
    submitted: false,
    submitting: false
}
const fileReducer = (state = initialFileState, action) => {
    switch (action.type) {
        case actions.SUBMIT:
            return Object.assign({}, state, {
                submitted: true,
                submitting: true,
            }, action.payload)
        default:
            return state
    }
}

const initialFilesState = {}
const filesReducer = fileId => (state = initialFilesState, action) => {
    return Object.assign({}, state, {
        [fileId]: fileReducer(state[fileId], action)
    })
}

const initialUploaderReducerState = {}
const uploaderReducer = (state = initialUploaderReducerState, action) => {

    const specification = callbackToActionMap[actionToCallbackMap[action.type]]
    const payload = specification && specification.args
        ? convertArgumentsArrayToObject(specification.args, action.payload)
        : {}

    switch (action.type) {
        case actions.INITIALIZE:
            return Object.assign({}, state, { _initialized: true })
        case actions.DESTROY:
            return Object.assign({}, state, { _initialized: false })
        case actions.SUBMIT:
            const { id } = payload
            return Object.assign({}, state, {
                files: filesReducer(id)(state.files, Object.assign({}, action, {
                    payload
                }))
            })
        default:
            return state
    }
}

const initialState = {}
const reducer = () => (state = initialState, action = {}) => {
    const { uploaderName } = action
    return uploaderName
        ? Object.assign({}, state, {
            [uploaderName]: uploaderReducer(state[uploaderName], action)
        })
        : state
}

module.exports = reducer
