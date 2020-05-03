import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { dissocPath } from 'ramda'

import { loadState, saveState } from '../utils/local-storage'
import throttle from '../utils/throttle'
import controlsReducer from './controls.reducer'
import dataReducer from './data.reducer'

const persistedState = loadState()
const middleware = [thunk]

const rootReducer = combineReducers({
  controlsReducer,
  dataReducer,
})

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

store.subscribe(
  throttle(() => {
    saveState(dissocPath(['dataReducer', 'selectedTime'], store.getState()))
  }, 1000),
)

export default store
