import { retreiveDocuments, searchDocuments } from '../../../actions/rest'
import HomeView from '../components/HomeView'

import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  documents: store.documents
})

const mapDispatchToProps = (dispatch) => ({
  retreiveDocuments: () => dispatch(retreiveDocuments()),
  search: (query) => dispatch(searchDocuments(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
