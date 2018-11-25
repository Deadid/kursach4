import fetch from 'isomorphic-fetch'

import searchResult from '../test_jsons/state.js'; // remove it when request will work

class RestService {
  searchDocuments(query) {

    return fetch('http://localhost:8080/search', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(query)
    })
      .then(response => response.json())
      .catch(() => {
        return searchResult.search.searchInfo; // fake data. Remove it when local requests will work
      })
  }

  loadDocument(id) {

    return fetch(`http://localhost:8080/document/${id}`, { method: 'GET' })
      .then(response => response.json())
  }

  loadDocumentContent(url) {
    const newUrl = url.replace("od.reyestr.court.gov.ua", "localhost:8008")
    return fetch(newUrl).then(response => response.text())
  }

  openDocument(id) {
    const formData = new FormData()
    formData.append('content', query)
    return fetch('http://localhost:8080/search', { method: 'POST', body: formData })
      .then(response => response.json())
  }
}
export default new RestService()
