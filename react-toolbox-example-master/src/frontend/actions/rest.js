import RestService from '../rest'
import { browserHistory } from 'react-router'
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
export function searchDocuments (query) {
  return (dispatch) => {
    RestService.searchDocuments(query)
    .then(documents => dispatch({
      type: actionTypes.DOCUMENTS_RETREIVED,
      docs: documents
    }))
  }
}
export function addDocument (data) {
  return (dispatch) => {
    RestService.addDocument(data)
      .then(document => {
        dispatch({
        type: actionTypes.DOCUMENT_ADDED,
        doc: document
      })
      browserHistory.push('/')
    })
  }
}
