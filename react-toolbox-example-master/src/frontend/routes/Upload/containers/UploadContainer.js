import { connect } from 'react-redux'

import { addDocument } from '../../../actions/rest'
import UploadView from '../components/UploadView'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  uploadDocument: (data) => {
    return dispatch(addDocument(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadView)
