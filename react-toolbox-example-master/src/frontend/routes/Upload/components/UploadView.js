import React from 'react'
import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import Input from 'react-toolbox/lib/input'

import theme from './UploadView.css'

class UploadView extends React.Component {

  static propTypes = {
    uploadDocument: React.PropTypes.func
  }

  constructor () {
    super()
    this.state = {}
    this.onSubmit = ::this.onSubmit
    this.handleChange = ::this.handleChange
    this.onFileChange = ::this.onFileChange
  }

  onFileChange (data) {
    this.setState({file: data.target.files[0], filename: data.target.files[0].name})
  }

  handleChange (data) {
    this.setState({ title: data })
  }
  onSubmit (event) {
    event.preventDefault()
    this.props.uploadDocument({title: this.state.title, file: this.state.file })
  }

  render () {
    return (
      <form className={theme.addDocument} onSubmit={this.onSubmit}>
        <div className={theme.addFile}>
          <input type='file' name='file' className={theme.hidden} onChange={this.onFileChange}/>
          <Button icon='folder' primary raised>Select file</Button>
          <Input label='Filename' disabled type="text" name="title" value={this.state.filename} />
        </div>
        <Input label='Title' type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
        <Button icon='save' type='submit' primary raised>Submit </Button>
      </form>
    )
  }
}

export default UploadView
