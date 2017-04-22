import { retreiveDocuments } from '../../../actions/rest'
import HomeView from '../components/HomeView'

import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  documents: store.documents
})

const mapDispatchToProps = (dispatch) => ({
  retreiveDocuments: () => dispatch(retreiveDocuments())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
