import React from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import { Link } from 'react-router'

import theme from './HomeView.css'

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
        <List selectable ripple>
          {this.props.documents.map(document => {
            return (
              <Link className={theme.link} to={`document/${document.get('id')}`}
                key={document.get('id')}>
                <ListItem caption={document.get('title')} key={document.get('id')} leftIcon='class' rightIcon='file_download' />
              </Link>)
          })}
        </List>
      </div>
    )
  }
}
export default HomeView
