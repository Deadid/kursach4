import {searchDocuments } from '../../../actions/rest'
import HomeView from '../components/HomeView'

import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  documents: store.documents,
  searchInfo: store.search.get("searchInfo"),
  isSearching: store.search.get("isSearching", false)
})

const mapDispatchToProps = (dispatch) => ({
  search: (query) => dispatch(searchDocuments(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
