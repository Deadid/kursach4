import { DOCUMENTS_RETREIVED } from '../../constants/action.types'

import Immutable from 'immutable'

const initialState = Immutable.fromJS({})
export default (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENTS_RETREIVED:
      return Immutable.fromJS(action.docs)
    default:
      return state
  }
}
