import React from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import Table, { TableCell, TableHead, TableRow } from 'react-toolbox/lib/table';
import { Input } from 'react-toolbox/lib/input';
import { DatePicker } from 'react-toolbox/lib/date_picker';
import Select from '../../../generic_components/Select';
import { Button } from 'react-toolbox/lib/button';
import { Link } from 'react-router'
import Pagination from '../../../generic_components/Pagination';

import theme from './HomeView.css'

import courtsList from '../../../test_jsons/courts.json'; // remove it when request will work
import justiceKinds from '../../../test_jsons/justice_kinds.json'; // remove it when request will work
import regionList from '../../../test_jsons/regions.json'; // remove it when request will work
import causeCategories from '../../../test_jsons/cause_categories.json'; // remove it when request will work
import judgmentForms from '../../../test_jsons/judgment_forms.json'; // remove it when request will work

class HomeView extends React.Component {

  static propTypes = {
    documents: React.PropTypes.object,
    retreiveDocuments: React.PropTypes.func,
    search: React.PropTypes.func
  }

  // load data for courts select
  loadCourtSelectOptions() {
    this.setState({
      courtsList: courtsList
    });

  }

  // load data for justice kinds select
  loadJusticeKindSelectOptions() {
    this.setState({
      justiceKinds: justiceKinds
    });

  }

  // load data for regions select
  loadRegionSelectOptions() {
    this.setState({
      regionList: regionList
    });
  }

  // load data for Judgment forms select
  loadJudgmentFormsSelectOptions() {
    this.setState({
      judgmentForms: judgmentForms
    });
  }

  // load data for cause categories select
  loadCauseCategoriesSelectOptions() {
    this.setState({
      causeCategories: causeCategories
    });
  }


  componentDidMount() {
    this.loadCourtSelectOptions()
    this.loadCauseCategoriesSelectOptions();
    this.loadRegionSelectOptions();
    this.loadJudgmentFormsSelectOptions();
    this.loadJusticeKindSelectOptions();
  }

  componentWillReceiveProps(nextProps) {}

  constructor() {
    super()
    this.state = {
      formData: {}
    }
    this.search = :: this.search
    this.changePage = :: this.changePage
  }

  search() {
    if (this.formValid()) {
      this.props.search(this.state.formData)
    }
  }

  goToPage(index) {
    this.props.search({...this.state.formData, page: index})
  }
  // check is at least one field is not empty
  formValid() {
    let valid = false;
    Object.keys(this.state.formData).map((item) => {
      if (this.state.formData[item] != null) {
        valid = true;
      }
    });
    return valid;
  }
  // onChange input. Where event is typed text, type - name of input
  changeInput(event, type) {
    let stateItem = { ...this.state };
    stateItem.formData[type] = event === "" ? null : event;
    this.setState(stateItem);
  }
  // onChange select. Where event is choosen option, type - name of select
  changeSelect(event, type) {
    let stateItem = { ...this.state };
    stateItem.formData[type] = event.target.value === "Обрати" ? null : event.target.value;
    this.setState(stateItem);
  }
  // onChange DatePicker. Where event is choosen data, type - key in this state.
  changeDate(date, type) {
    let stateItem = { ...this.state };
    stateItem.formData[type] = date;
    this.setState(stateItem);
  }
  changePage(pageIndex) {
    this.setState({ activePage: pageIndex });
  }

  render() {

    const { courtsList = [], regionList = [], causeCategories = [], judgmentForms = [] } = this.state;

    const renderList = this.props.documents.valueSeq().toJS().map((item, idx) => {
      return (
        <TableRow key={idx}>
          <TableCell>{item.causeNumber}</TableCell>
          <TableCell>{item.category}</TableCell>
          <TableCell>{item.court}</TableCell>
          <TableCell>{item.judge}</TableCell>
          <TableCell>{item.judgment}</TableCell>
          <TableCell>{item.justiceKind}</TableCell>
          <TableCell>{item.receiptDate}</TableCell>
          <TableCell>{item.adjudicationDate}</TableCell>
          <TableCell><Link className={theme.link} to={`/document/${item.id}`}>Відкрити</Link></TableCell>
        </TableRow>
      )
    });
    return (
      <div>
        <div className={theme.search}>

          <div className={theme.topForm}>
          <div>
            <div><div>Вміст:</div> <Input label="Вміст" value={this.state.searchQuery} onChange={(event) => this.changeInput(event, "content")} /></div>
            <div><div>Суддя:</div><Input label="Суддя" name="judge" onChange={(event) => this.changeInput(event, 'judge')} /></div>
            <div><div>Номер справи:</div><Input label="Номер справи" name="case number" onChange={(event) => this.changeInput(event, 'caseNumber')} /></div>
            </div>
            <div>
              <Select name="causeCategory" title="Категорія справи" changeSelect={(event) => this.changeSelect(event, 'causeCategory')} value={this.state.formData.causeCategory}>
                <option value={null}>Обрати</option>
                {causeCategories.map((causeCategory) => {
                  return (
                    <option value={causeCategory.name}>{causeCategory.name}</option>
                  )
                })}
              </Select>
            </div>
            <div>
              <Select name="Court" title="Суд" changeSelect={(event) => this.changeSelect(event, 'court')} value={this.state.formData.court}>
              <option value={null}>Обрати</option>
              {courtsList.map((court, index) => {
                return (
                  <option value={court.name} key={court.name}>{court.name}</option>
                )
              })}
            </Select>
            </div>
            <div>
              <Select name="JudgmentForm" title="Форма судового рішення" changeSelect={(event) => this.changeSelect(event, 'judgmentForm')} value={this.state.formData.judgmentForm}>
              <option value={null}>Обрати</option>
              {judgmentForms.map((judgmentForm, index) => {
                return (
                  <option value={judgmentForm.name} key={judgmentForm.name}>{judgmentForm.name}</option>
                )
              })}
            </Select>
            </div>
            <div>
              <Select name="JusticeKind" title="Форма судовочинства" changeSelect={(event) => this.changeSelect(event, 'justiceKind')} value={this.state.formData.justice_kind}>
              <option value={null}>Обрати</option>
              {justiceKinds.map((justiceKind, index) => {
                return (
                  <option value={justiceKind.name} key={justiceKind.justice_kind}>{justiceKind.name}</option>
                )
              })}
            </Select></div>
          </div>

          <div className={theme.bottomForm}>
            <h4>Дата надходження</h4>
            <div className={theme.searchElement}>
              <div className={theme.formElem}>
                <DatePicker label="Від" inputFormat={(value) => `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`} onChange={(date) => this.changeDate(date, 'receiptDateFrom')}
                  maxDate={this.state.formData.receiptDateTo} value={this.state.formData.receiptDateFrom} />
              </div>
              <div className={theme.formElem}>
                <DatePicker label="До" inputFormat={(value) => `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`}onChange={(date) => this.changeDate(date, 'receiptDateTo')}
                  minDate={this.state.formData.receiptDateFrom} value={this.state.formData.receiptDateTo} />
              </div>
            </div>
          </div>

          <div className={theme.bottomForm}>
            <h4>Дата ухвали</h4>
            <div className={theme.searchElement}>
              <div className={theme.formElem}>
                <DatePicker label="Від" inputFormat={(value) => `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`} onChange={(date) => this.changeDate(date, 'adjudicationDateFrom')}
                  maxDate={this.state.formData.adjudicationDateTo} value={this.state.formData.adjudicationDateFrom} />
              </div>
              <div className={theme.formElem}>
                <DatePicker  label="До" inputFormat={(value) => `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`} onChange={(date) => this.changeDate(date, 'adjudicationDateTo')}
                  minDate={this.state.formData.adjudicationDateFrom} value={this.state.formData.adjudicationDateTo} />
              </div>
            </div>
          </div>

          <Button icon='search' onClick={this.search} raised primary />
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
            <TableCell>Відкрити</TableCell>
          </TableHead>
          {renderList}
        </Table>
        {this.props.searchInfo && <Pagination goToPage={(index) => this.goToPage(index)} {...this.props.searchInfo.toJS()} />}
      </div>
    )
  }
}
export default HomeView