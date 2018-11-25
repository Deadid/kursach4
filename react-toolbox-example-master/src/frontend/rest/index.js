import fetch from 'isomorphic-fetch'

class RestService {
  searchDocuments (query) {
    const formData = new FormData()
    formData.append('content', query)
    return fetch('http://localhost:8080/search', {method: 'POST', body: formData })
      .then(response => response.json())
  }

  loadDocument (id) {
    
    return fetch(`http://localhost:8080/document/${id}`, {method: 'GET' })
      .then(response => response.json())
  }

  loadDocumentContent(url) {
    const newUrl = url.replace("od.reyestr.court.gov.ua", "localhost:8008")
    return fetch(newUrl).then(response => response.text())
  }

  openDocument (id) {
    const formData = new FormData()
    formData.append('content', query)
    return fetch('http://localhost:8080/search', {method: 'POST', body: formData })
      .then(response => response.json())
  }
}
export default new RestService()
