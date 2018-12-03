import { DOCUMENTS_RETREIVED, SEARCH_STARTED, SEARCH_ERROR } from '../../constants/action.types'

import Immutable from 'immutable'

const initialState = Immutable.fromJS({})
export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_STARTED:
      return state.set("isSearching", true)
    case DOCUMENTS_RETREIVED:
      let newState = initialState
      newState = newState.set("searchInfo", Immutable.fromJS(action.searchInfo))
      return newState.set("isSearching", false)
      case SEARCH_ERROR:
      return state.set("isSearching", false)
    default:
      return state
  }
}
