import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import {Button} from 'react-toolbox/lib/button';


class DocumentView extends React.Component {

  static propTypes = {
    document: React.PropTypes.object
  }

  render () {
    return (
      <Card raised>
        <CardTitle
          title={this.props.document.get('title')}
        />
        <CardText>
          <img src={`http://localhost:8080/file/${this.props.document.get('id')}`} />
          <div>
            {this.props.document.get('content')}
          </div>
        </CardText>
        <CardActions>
          <Button icon='file_download' label="Download" primary />
          <Button icon='delete_forever' label="Delete" accent />
        </CardActions>
      </Card>
    )
  }
}
export default DocumentView
