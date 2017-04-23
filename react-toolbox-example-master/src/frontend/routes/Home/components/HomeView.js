import React from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import { Input } from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import { Link } from 'react-router'

import theme from './HomeView.css'

class HomeView extends React.Component {

  static propTypes = {
    documents: React.PropTypes.object,
    retreiveDocuments: React.PropTypes.func,
    search: React.PropTypes.func
  }

  constructor () {
    super()
    this.state = {}
    this.onChange = ::this.onChange
    this.search = ::this.search
  }
  componentDidMount () {
    this.props.retreiveDocuments()
  }
  onChange (searchQuery) {
    this.setState({ searchQuery })
  }
  search () {
    this.props.search(this.state.searchQuery)
  }
  render () {
    return (
      <div>
        <div className={theme.search}>
          <Input label="Search" value={this.state.searchQuery} onChange={this.onChange} />
          <Button icon='search' onClick={this.search} raised primary/>
        </div>
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
