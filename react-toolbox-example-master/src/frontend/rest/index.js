import fetch from 'isomorphic-fetch'

import urlParser from '../utils/urlParser'

class RestService {
  getDocuments () {
    return fetch('http://localhost:8080/document/')
      .then(response => response.json()).then(response => {
        return response.map(
          document => ({
            title: document.title,
            content: document.content,
            link: `${urlParser(document.links[0].href).pathname}` }))
      })
  }
}
export default new RestService()
