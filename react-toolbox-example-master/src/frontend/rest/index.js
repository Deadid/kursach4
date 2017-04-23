import fetch from 'isomorphic-fetch'

class RestService {
  getDocuments () {
    return fetch('http://localhost:8080/document/')
      .then(response => response.json()).then(response => {
        return response.map(
          document => ({
            title: document.title,
            content: document.content,
            id: document.documentId }))

      })
  }
  searchDocuments (query) {
    const formData = new FormData()
    formData.append('query', query)
    return fetch('http://localhost:8080/document/search', {method: 'POST', body: formData })
      .then(response => response.json()).then(response => {
        return response.content.map(
          document => ({
            title: document.title,
            content: document.content,
            id: document.id }))
      })
  }
  addDocument ({title, file}) {
    const formData = new FormData();
     formData.append('title', title)
     formData.append('file', file)
    return fetch('http://localhost:8080/document/', {method: 'POST', body: formData})
      .then(response => response.json()).then(response => {
        return {
          title: response.title,
          content: response.content,
          id: response.documentId
        }

      })
  }
}
export default new RestService()
