import { connect } from 'react-redux'

import { uploadDocument } from '../../../actions/rest'
import UploadView from '../components/UploadView'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  uploadDocument: () => dispatch(uploadDocument())
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadView)
