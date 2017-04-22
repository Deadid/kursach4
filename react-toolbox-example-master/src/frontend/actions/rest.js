import RestService from '../rest'
import * as actionTypes from '../constants/action.types'

export function retreiveDocuments () {
  return (dispatch) => {
    RestService.getDocuments()
    .then(documents => dispatch({
      type: actionTypes.DOCUMENTS_RETREIVED,
      docs: documents
    }))
  }
}
