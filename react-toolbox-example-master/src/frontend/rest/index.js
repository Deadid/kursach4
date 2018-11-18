import fetch from 'isomorphic-fetch'

class RestService {
  searchDocuments (query) {
    const formData = new FormData()
    formData.append('content', query)
    return fetch('http://localhost:8080/search', {method: 'POST', body: formData })
      .then(response => response.json())
  }
}
export default new RestService()
