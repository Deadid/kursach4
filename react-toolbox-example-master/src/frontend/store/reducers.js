import { combineReducers } from 'redux'
import locationReducer from './location'
import documentsReducer from '../reducers/documents'
import searchReducer from '../reducers/search'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    documents: documentsReducer,
    search: searchReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
