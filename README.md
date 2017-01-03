redux-fine-uploader
----

:microscope: *Experimental!* :microscope:

[![Experimental!](https://img.shields.io/badge/experiment-%F0%9F%94%AC-ff69b4.svg?style=flat-square)]() [![Build Status](https://img.shields.io/travis/feltnerm/redux-fine-uploader.svg?style=flat-square)](https://travis-ci.org/feltnerm/redux-fine-uploader)



Still a _ton_ of work to do here: I'm not happy w/ the
public API, _all_ of Fine Uploader's callbacks and their parameters must be
defined and handled, and much more. Treat this as a public proof of concept.

Enables Fine Uploader to store its state with Redux.

- reducer namespaces allow sharing or hiding of data in the store.
- wraps Fine Uploader's public callbacks so that "actions" are `dispatch`ed with
  callback data as the action payload.

#### State

Ends up looking like this:

```
[uploader_name]: {
    files: {
        [fineUploaderFileId]: {
            [data]
        }
    }
}
```

#### Example

Minimal example in `./example`. Run with `npm run example` from root, or `npm
run build` from the example directory.

#### Quick Setup

##### Reducer
```
const redux = require('redux')

const reduxFineUploader = require('../../..')
const { reducer } = reduxFineUploader

const makeReducer = () => reducer()
const makeStore = () => redux.createStore(redux.combineReducers({
    uploader: makeReducer()
}))

module.exports = makeStore
```

#### Todo

- Patch all of Fine Uploader's callbacks so they use `dispatch`.
- Store Fine Uploader callback parameters/data in Redux store
