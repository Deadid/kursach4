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

  addDocument ({title, file}) {
    const formData = new FormData();
     formData.append('title', title)
     formData.append('file', file)
    return fetch('http://localhost:8080/document/', {method: 'POST', body: formData})
      .then(response => response.json()).then(response => {
        return response.map(
          document => ({
            title: document.title,
            content: document.content,
            id: document.documentId }))

      })
  }
}
export default new RestService()
