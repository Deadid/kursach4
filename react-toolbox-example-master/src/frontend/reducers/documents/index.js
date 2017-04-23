import { DOCUMENTS_RETREIVED, DOCUMENT_ADDED } from '../../constants/action.types'

import Immutable from 'immutable'

const initialState = Immutable.fromJS({})
export default (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENTS_RETREIVED:
      let newState = initialState
      action.docs.forEach(document => {
        newState = newState.set(document.id, Immutable.fromJS(document))
      })
      return newState
    case DOCUMENT_ADDED:
    return state.set(action.doc.id, Immutable.fromJS(action.doc))
    default:
      return state
  }
}
