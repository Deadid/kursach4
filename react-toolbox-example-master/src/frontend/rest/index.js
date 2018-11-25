import fetch from 'isomorphic-fetch'

import searchResult from '../test_jsons/state.js'; // remove it when request will work

class RestService {
  searchDocuments (query) {
    const formData = new FormData()
    formData.append('content', query)
    return fetch('http://localhost:8080/search', {method: 'POST', body: formData })
      .then(response => response.json())
      .catch(() => {
        return searchResult.search.searchInfo; // fake data. Remove it when local requests will work
      })
  }
}
export default new RestService()
