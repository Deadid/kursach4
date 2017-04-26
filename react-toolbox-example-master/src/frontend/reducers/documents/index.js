import { DOCUMENTS_RETREIVED, DOCUMENT_ADDED, DOCUMENT_DELETED } from '../../constants/action.types'

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
    case DOCUMENT_DELETED:
      return state.delete(action.id)
    default:
      return state
  }
}
