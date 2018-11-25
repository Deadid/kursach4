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
      <div className={theme.children}>
        {this.props.children}
      </div>
    </Layout>
    );
  }
}
export default App;
