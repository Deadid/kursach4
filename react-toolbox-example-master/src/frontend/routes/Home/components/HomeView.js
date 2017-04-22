import React from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import { Button } from 'react-toolbox/lib/button'; // Bundled component import

class HomeView extends React.Component {

  static propTypes = {
    documents: React.PropTypes.object,
    retreiveDocuments: React.PropTypes.func
  }

  componentDidMount () {
    this.props.retreiveDocuments()
  }

  render () {
    return (
      <div>
        <form action='http://localhost:8080/document/' encType='multipart/form-data' method='POST'>
          <input type='file' name='file' />
          <input type="text" name="title"/>
          <Button type='submit'>Submit </Button>
        </form>
        <List>
          {this.props.documents.map(document => {
            return (
              <Link to={document.get('link')}
                key={document.get('link')}>
                <ListItem key={document.get('link')}>
                  {document.get('title')}
                </ListItem>
              </Link>)
          })}
        </List>
      </div>
    )
  }
}
export default HomeView
