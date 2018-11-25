import React from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import Table, {TableCell, TableHead, TableRow} from 'react-toolbox/lib/table';
import { Input } from 'react-toolbox/lib/input';
import { DatePicker } from 'react-toolbox/lib/date_picker';
import Select from '../../../generic_components/Select';
import { Button } from 'react-toolbox/lib/button';
import { Link } from 'react-router'

import theme from './HomeView.css'

import courtsList from '../../../test_jsons/courts.json'; // remove it when request will work
// import searchResult from '../../../test_jsons/state.json'; // remove it when request will work

class HomeView extends React.Component {

  static propTypes = {
    documents: React.PropTypes.object,
    retreiveDocuments: React.PropTypes.func,
    search: React.PropTypes.func
  }

  componentDidMount () {
    // load data for courts select
    fetch('/test_jsons/courts.json')
      .then(response => response.json())
      .then(data => this.setState({
          courtsList: data
        })
      )
      .catch(() => {
        console.log(`fetch failed. Create data from "import"`);
        this.setState({
          courtsList: courtsList
        });
      })
  }

  constructor () {
    super()
    this.state = {
      formData: {}
    }
    this.search = ::this.search
  }

  search () {
    if (this.formValid()) {
      this.props.search(this.state.formData);
    }
  }
  // check is at least one field is not empty
  formValid () {
    let valid = false;
    Object.keys(this.state.formData).map((item) => {
      if (this.state.formData[item].length > 0) {
        valid = true;
      }
    });
    return valid;
  }
  // onChange input. Where event is typed text, type - name of input
  changeInput (event, type) {
    let stateItem = {...this.state};
    stateItem.formData[type] = event;
    this.setState(stateItem);
  }
  // onChange select. Where event is choosen option, type - name of select
  changeSelect (event, type) {
    let stateItem = {...this.state};
    stateItem.formData[type] = event.target.value;
    this.setState(stateItem);
  }
  // onChange DatePicker. Where event is choosen data, type - key in this state.
  changeDate (date, type) {
    let stateItem = {...this.state};
    stateItem.formData[type] = date;
    this.setState(stateItem);
  }
  
  render () {

    const {courtsList = []} = this.state;

    return (
      <div>
        <div className={theme.search}>

          <div className={theme.topForm}>
            {/* <Input label="Пошук" value={this.state.searchQuery} onChange={this.onChange} /> */}
            <Input label="Суддя" name="judge" onChange={(event) => this.changeInput(event, 'judge')} />
            <Input label="Номер справи" name="case number" onChange={(event) => this.changeInput(event, 'caseNumber')} />
            <Select name="Court" value="Виберіть суд" changeSelect={(event) => this.changeSelect(event, 'court')} value={this.state.formData.court}>
              {courtsList.map((court, index) => {
                return (
                  <option value={court.instanse + '_' + court.region} key={court.instanse +  '_' + court.region + '_' + index}>{court.name}</option>
                )
              })}
            </Select>
            <Input label="Форма рішення" name="solution_form" onChange={() => this.changeInput(event, 'solution_form')} />
            <Input label="Форма судочинства" name="application_form" onChange={() => this.changeInput(event, 'application_form')} />
          </div>

          <div className={theme.bottomForm}>
            <h4>Дата надходження</h4>
            <div className={theme.searchElement}>
                <div className={theme.formElem}>
                  <DatePicker label="Від" locale='ua' onChange={(date) => this.changeDate(date, 'come_from')} 
                    maxDate={this.state.formData.come_to} value={this.state.formData.come_from} />
                </div>
                <div className={theme.formElem}>
                  <DatePicker label="До" locale='ua'  onChange={(date) => this.changeDate(date, 'come_to')} 
                    minDate={this.state.formData.come_from} value={this.state.formData.come_to} />
                </div>
            </div>
          </div>

          <div className={theme.bottomForm}>
            <h4>Дата ухвали</h4>
            <div className={theme.searchElement}>
                <div className={theme.formElem}>
                  <DatePicker label="Від" locale='ua' onChange={(date) => this.changeDate(date, 'accept_from')} 
                    maxDate={this.state.accept_to} value={this.state.accept_from} />
                </div>
                <div className={theme.formElem}>
                  <DatePicker label="До" locale='ua'  onChange={(date) => this.changeDate(date, 'accept_to')} 
                    minDate={this.state.accept_from} value={this.state.accept_to} />
                </div>
            </div>
          </div>

          <Button icon='search' onClick={this.search} raised primary/>
        </div>

        <Table selectable={false} style={{ marginTop: 10 }}>
          <TableHead>
            <TableCell>Номер справи</TableCell>
            <TableCell>Категорія справи</TableCell>
            <TableCell>Суд</TableCell>
            <TableCell>Суддя</TableCell>
            <TableCell>Форма судового рішення</TableCell>
            <TableCell>Форма судочинства</TableCell>
            <TableCell>Дата надходження</TableCell>
            <TableCell>Дата ухвали</TableCell>
          </TableHead>
          {this.props.documents.valueSeq().toJS().map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.causeNumber}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.court}</TableCell>
              <TableCell>{item.judge}</TableCell>
              <TableCell>{item.judgment}</TableCell>
              <TableCell>{item.justiceKind}</TableCell>
              <TableCell>{item.receiptDate}</TableCell>
              <TableCell>{item.adjudicationDate}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    )
  }
}
export default HomeView
