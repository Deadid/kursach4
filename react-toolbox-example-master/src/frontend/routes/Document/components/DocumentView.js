import React from 'react';
import { List, ListItem, ListDivider } from 'react-toolbox/lib/list';
import { AppBar, IconButton } from 'react-toolbox';
import { Layout, Panel, Sidebar } from 'react-toolbox';

import Iframe from 'react-iframe'

class DocumentView extends React.Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false
  };

  goHome = () => {
    history.back();
  }

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  };
  static propTypes = {
    document: React.PropTypes.object,
    documentFile: React.PropTypes.object,
    findDocumentFile: React.PropTypes.func
  }

  componentDidMount() {
    
    this.props.findDocumentFile(this.props.document.get("id"))
  }

  
  render() {
    const document = this.props.document.toJS()
    const unkown = "Невідомо"
    const file = this.props.documentFile ? this.props.documentFile.toJS() : null;
    return (
      <Layout>
        <Panel>
          <AppBar leftIcon="arrow_back" rightIcon='info' onRightIconClick={this.toggleSidebar} onLeftIconClick={this.goHome} title={document.causeNumber ?document.causeNumber : unkown}/>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            {file && file.content ? 
            <div dangerouslySetInnerHTML={{__html:`${file.content}`}}></div> : ""}
          </div>
        </Panel>
        <Sidebar pinned={this.state.sidebarPinned} width={11}>
          <div><IconButton icon='close' onClick={this.toggleSidebar} /></div>
          <div style={{ flex: 1 }}>
            <p>
                <List>
                  <ListItem caption={document.causeNumber ?document.causeNumber : unkown} legend="Номер справи" />
                  <ListDivider />
                  <ListItem caption={document.category ?document.category : unkown} legend="Категорія справи" />
                  <ListDivider />
                  <ListItem caption={document.court ?document.court : unkown} legend="Суд" />
                  <ListItem caption={document.judge ?document.judge : unkown} legend="Суддя" />
                  <ListDivider />
                  <ListItem caption={document.justiceKind ?document.justiceKind : unkown} legend="Форма судочинства" />
                  <ListItem caption={document.judgment ?document.judgment : unkown} legend="Форма судового рішення" />
                  <ListDivider />
                  <ListItem caption={document.receiptDate ?document.receiptDate : unkown} legend="Дата надходження" />
                  <ListItem caption={document.adjudicationDate ?document.adjudicationDate : unkown} legend="Дата ухвали" />
                </List>
              </p>
          </div>
        </Sidebar>
      </Layout>

    )
  }
}
export default DocumentView
