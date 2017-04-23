import { retreiveDocuments } from '../../../actions/rest'
import DocumentView from '../components/DocumentView'

import { connect } from 'react-redux'

const mapStateToProps = (store, props) => ({
  document: store.documents.get(props.params.id)
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentView)
