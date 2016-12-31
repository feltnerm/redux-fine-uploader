require('jsdom-global')()

const test = require('tape')
const redux = require('redux')
const FineUploader = require('fine-uploader/lib/core')

const reduxFineUploader = require('../')
const { actions, reducer, wrapCallbacks } = reduxFineUploader

const TEST_UPLOADER_NAME = 'test_uploader'
const makeReducer = () => reducer()
const makeStore = () => redux.createStore(makeReducer())
const getTestUploaderStore = (store) => store.getState()[TEST_UPLOADER_NAME]

test('initial state', t => {
    const store = makeStore()

    t.deepEqual(store.getState(), {}, 'initial state is namespaced and empty')
    t.end()
})

test('actions', t => {
    const store = makeStore()

    store.dispatch(actions.initialize(TEST_UPLOADER_NAME))

    t.deepEqual(getTestUploaderStore(store), {
        _initialized: true
    }, `${actions.INITIALIZE}`)

    store.dispatch(actions.destroy(TEST_UPLOADER_NAME))

    t.deepEqual(getTestUploaderStore(store), {
        _initialized: false
    }, `${actions.DESTROY}`)
    t.end()
})

test('callbacks', t => {
    t.plan(6)

    const store = makeStore()
    let wrappedCallbacks = wrapCallbacks(TEST_UPLOADER_NAME, store.dispatch, {})
    t.ok(wrappedCallbacks.onSubmit, 'onSubmit is a default callback because we dispatch an action in it')

    wrappedCallbacks = wrapCallbacks(TEST_UPLOADER_NAME, store.dispatch, {
        onSubmit: ([first, second]) => {
            t.equals(first, 'w00t')
            t.equals(second, 'sauce')
        },
        onFoo: (data) => {
            t.equals(data, '\0/')
        }
    })
    t.ok(wrappedCallbacks.onSubmit, 'We wrap user onSubmit with our own since we dispatch an action')
    t.ok(wrappedCallbacks.onFoo, 'Add own callback (for ones we do not dispatch on).')

    wrappedCallbacks.onSubmit('w00t', 'sauce')
    wrappedCallbacks.onFoo('\0/')
})

test('fine-uploader integration', t => {

    const store = makeStore()

    const fineUploaderEl = document.createElement('div')
    document.body.appendChild(fineUploaderEl)

    const uploader = new FineUploader({
        element: fineUploaderEl,
        callbacks: wrapCallbacks(TEST_UPLOADER_NAME, store.dispatch, {
            onSubmit: (id, filename) => {
                console.log(`submitting #${id} ${filename}`)
            }
        })
    })

    t.end()
})
