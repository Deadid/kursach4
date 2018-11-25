import { DOCUMENT_FILE_LOADED, DOCUMENT_CONTENT_LOADED } from '../../constants/action.types'

import Immutable from 'immutable'

const initialState = Immutable.fromJS({})
export default (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENT_FILE_LOADED:
      return state.set(action.id, Immutable.fromJS(action.file))
    case DOCUMENT_CONTENT_LOADED:
      return state.setIn([action.id, "content"], action.content)
    default:
      return state
  }
}
