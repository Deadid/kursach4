import RestService from '../rest'
import { browserHistory } from 'react-router'
import * as actionTypes from '../constants/action.types'
import rtfToHtml from '@iarna/rtf-to-html'

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
    dispatch({type: actionTypes.SEARCH_STARTED})
    RestService.searchDocuments(query)
    .then(response => dispatch({
      type: actionTypes.DOCUMENTS_RETREIVED,
      docs: response.content,
      searchInfo: response
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
export function loadDocument (id) {
  return (dispatch) => {
    RestService.loadDocument(id)
      .then(file => {
        dispatch({
        type: actionTypes.DOCUMENT_FILE_LOADED,
        file,
        id
      })
      RestService.loadDocumentContent(file.url).then(content => {
        rtfToHtml.fromString(content, (err,doc) =>{
        dispatch({
          type: actionTypes.DOCUMENT_CONTENT_LOADED,
          content: doc,
          id
        })
      })
      })
    })
  }
}
export function deleteDocument (data) {
  return (dispatch) => {
    RestService.deleteDocument(data)
      .then(() => {
        browserHistory.push('/')
        dispatch({
        type: actionTypes.DOCUMENT_DELETED,
        id: data.id
      })
    })
  }
}
