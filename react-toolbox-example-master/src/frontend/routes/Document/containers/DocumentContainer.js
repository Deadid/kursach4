import { loadDocument } from '../../../actions/rest'
import DocumentView from '../components/DocumentView'

import { connect } from 'react-redux'

const mapStateToProps = (store, props) => ({
  document: store.documents.get(props.params.id),
  documentFile: store.files.get(props.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
  findDocumentFile: (id) => dispatch(loadDocument(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentView)
