import { DOCUMENTS_RETREIVED } from '../../constants/action.types'

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
    default:
      return state
  }
}
