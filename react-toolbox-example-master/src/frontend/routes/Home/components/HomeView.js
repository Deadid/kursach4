import React from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import Table, {TableCell, TableHead, TableRow} from 'react-toolbox/lib/table';
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
  onChange (searchQuery) {
    this.setState({ searchQuery })
  }
  search () {
    if (this.state.searchQuery && this.state.searchQuery.length > 0) {
      this.props.search(this.state.searchQuery)
    }
  }
  render () {
    return (
      <div>
        <div className={theme.search}>
          <Input label="Пошук" value={this.state.searchQuery} onChange={this.onChange} />
          <Button icon='search' onClick={this.search} raised primary/>
        </div>
        {this.props.documents && <Table selectable={false} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell>Номер справи</TableCell>
          <TableCell>Категорія справи</TableCell>
          <TableCell>Суд</TableCell>
          <TableCell>Суддя</TableCell>
          <TableCell>Форма судового рішення</TableCell>
          <TableCell>Форма судочинства</TableCell>
          <TableCell>Дата надходження</TableCell>
          <TableCell>Дата ухвали</TableCell>
          <TableCell>Відкрити</TableCell>
        </TableHead>
        {this.props.documents.valueSeq().toJS().map((item, idx) => (
          <TableRow key={item.id}>
            <TableCell>{item.causeNumber ? item.causeNumber : "Невідомо" }</TableCell>
            <TableCell>{item.category ? item.category : "Невідомо" }</TableCell>
            <TableCell>{item.court ? item.court : "Невідомо" }</TableCell>
            <TableCell>{item.judge ? item.judge : "Невідомо" }</TableCell>
            <TableCell>{item.judgment ? item.judgment : "Невідомо" }</TableCell>
            <TableCell>{item.justiceKind ? item.justiceKind : "Невідомо" }</TableCell>
            <TableCell>{item.receiptDate ? item.receiptDate : "Невідомо" }</TableCell>
            <TableCell>{item.adjudicationDate ? item.adjudicationDate : "Невідомо" }</TableCell>
            <TableCell><Link  className={theme.link} to={`/document/${item.id}`}>Відкрити</Link></TableCell>
          </TableRow>
        ))}
      </Table>}
      </div>
    )
  }
}
export default HomeView
