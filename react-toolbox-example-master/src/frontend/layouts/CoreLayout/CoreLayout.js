import React from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Button } from 'react-toolbox/lib/button'
import { Link, IndexLink } from 'react-router'
import Navigation from 'react-toolbox/lib/navigation'
import { Layout } from 'react-toolbox';

import theme from './CoreLayout.css'

class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.element
  }
  render () {
    return (
    <Layout theme={theme}>
      <AppBar leftIcon='perm_media' title='Організатор документів'>
        <Navigation type="horizontal">
          <IndexLink activeClassName={theme.active} to='/'><Button raised primary icon='collections_bookmark'>Мої документи</Button></IndexLink>
          <Link activeClassName={theme.active} to='/upload'><Button raised primary icon='file_upload'>Завантажити документ</Button></Link>
        </Navigation>
      </AppBar>
      <div className={theme.children}>
        {this.props.children}
      </div>
    </Layout>
    );
  }
}
export default App;
