import React from 'react'
import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import Input from 'react-toolbox/lib/input'

import theme from './UploadView.css'

class UploadView extends React.Component {

  render () {
    return (
      <form className={theme.addDocument} action='http://localhost:8080/document/' encType='multipart/form-data' method='POST'>
        <input type='file' name='file' />
        <Input label='Title' type="text" name="title"/>
        <Button icon='save' type='submit' primary raised>Submit </Button>
      </form>
    )
  }
}

export default UploadView
