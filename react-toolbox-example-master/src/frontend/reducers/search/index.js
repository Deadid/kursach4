import { DOCUMENTS_RETREIVED } from '../../constants/action.types'

import Immutable from 'immutable'

const initialState = Immutable.fromJS({})
export default (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENTS_RETREIVED:
      let newState = initialState
      return newState.set("searchInfo", Immutable.fromJS(action.searchInfo))
    default:
      return state
  }
}
