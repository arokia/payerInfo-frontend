import React, { Component } from "react";
import moment from "moment";
import Picky from "../vendor/picky/Picky";
import "../vendor/picky/Picky.css";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

Picky.defaultProps = {
  numberDisplayed: 3,
  options: [],
  filterDebounce: 150,
  dropdownHeight: 300,
  onChange: () => {},
  tabIndex: 0,
  keepOpen: true,
  selectAllText: "Select all",
  filterPlaceholder: "Search for Payer"
};
const groupByList = [
  { id: 1, name: "Payer" },
  { id: 2, name: "Transaction" },
  { id: 3, name: "Status" }
];
const aggregatesList = [
  { id: 1, name: "Avg DB Latency" },
  { id: 2, name: "Avg Switch Latency" },
  { id: 3, name: "LTE 1s" }
];
const payerList = [
  { id: 1, name: "Access Medicare" },
  { id: 2, name: "Acclaim, Inc." },
  { id: 3, name: "ACS Benefit Services" },
  { id: 4, name: "Advantek Benefit" },
  { id: 5, name: "Advantek Benefit Administrators" },
  { id: 6, name: "Adventist Health System West" },
  { id: 7, name: "Aetna Admin Medicare Supp" },
  { id: 8, name: "Aetna Better Health of California" },
  { id: 9, name: "Aetna Better Health of Florida" }
];
const transactionTypeList = [
  { id: 1, name: "Claim Financial Enquiry" },
  { id: 2, name: "Clain Status" },
  { id: 3, name: "Eligibility" },
  { id: 4, name: "Functional Acknowledgement" },
  { id: 5, name: "Health Service Reivew (HSR)" },
  { id: 6, name: "Health Service Reivew (X094A1)" },
  { id: 7, name: "Health Service Reivew (X215)" },
  { id: 8, name: "Member Advanced Claiming" },
  { id: 9, name: "No Processing Test" }
];

export default class TransactionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInterval: "",
      startDate: moment(),
      endDate: moment(),
      groupBy: [],
      aggregates: [],
      payers: [],
      transactionTypes: []
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.selectAggregate = this.selectAggregate.bind(this);
    this.selectGroupBy = this.selectGroupBy.bind(this);
    this.selectPayers = this.selectPayers.bind(this);
    this.selectTransactionTypes = this.selectTransactionTypes.bind(this);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
  }
  handleIntervalChange(value) {
    console.count("onChange");
    console.log("Val", value);
    this.setState({ displayInterval: value });
  }
  selectGroupBy(value) {
    console.count("onChange");
    console.log("Val", value);
    this.setState({ groupBy: value });
  }
  selectAggregate(value) {
    console.count("onChange");
    console.log("Val", value);
    this.setState({ aggregates: value });
  }
  selectPayers(value) {
    console.count("onChange");
    console.log("Val", value);
    this.setState({ payers: value });
  }
  selectTransactionTypes(value) {
    console.count("onChange");
    console.log("Val", value);
    this.setState({ transactionTypes: value });
  }
  handleStartDateChange(value) {
    console.count("onChange");
    console.log("Val", value);
    this.setState({ startDate: value });
  }
  handleEndDateChange(value) {
    console.count("onChange");
    console.log("Val", value);
    this.setState({ endDate: value });
  }
  render() {
    return (
      <article className="wrapper">
        <header className="split-two">
          <div>
            <h2>Transaction Statistics</h2>
          </div>
          <div className="expand">[]</div>
        </header>
        <main className="form-wrapper">
          <section>
            <div className="datetime-wrapper">
              <label>Start Date</label>
              <div className="datetime">
                <DatePickerInput
                  small={true}
                  displayFormat="MM/DD/YYYY"
                  returnFormat="YYYY-MM-DD"
                  className="my-react-component"
                  defaultValue={this.state.startDate}
                  onChange={this.handleStartDateChange}
                  showOnInputClick
                  placeholder="placeholder"
                  iconClassName="icon-rc-datepicker icon-rc-datepicker_calendar"
                />
                <div className="time-wrapper">
                  <input
                    className="textbox small-box"
                    type="text"
                    maxLength="2"
                  />
                  <label className="time-separator">:</label>
                  <input
                    className="textbox small-box"
                    type="text"
                    maxLength="2"
                  />
                  <select className="textbox ampm">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="datetime-wrapper">
              <label>End Date</label>
              <div className="datetime">
                <DatePickerInput
                  small={true}
                  displayFormat="MM/DD/YYYY"
                  returnFormat="YYYY-MM-DD"
                  className="my-react-component"
                  defaultValue={this.state.endDate}
                  onChange={this.handleEndDateChange}
                  showOnInputClick
                  placeholder="placeholder"
                  iconClassName="icon-rc-datepicker icon-rc-datepicker_calendar"
                />
                <div className="time-wrapper">
                  <input
                    className="textbox small-box"
                    type="text"
                    maxLength="2"
                  />
                  <label className="time-separator">:</label>
                  <input
                    className="textbox small-box"
                    type="text"
                    maxLength="2"
                  />
                  <select className="textbox ampm">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>
            <section className="split-two">
              <div>
                <label>Display Interval</label>
                <select
                  className="textbox"
                  onChange={this.handleIntervalChange}
                >
                  <option>Select</option>
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                </select>
              </div>
              <div>
                <label>DB Timeout</label>
                <input
                  id="dbtimeout"
                  className="textbox"
                  type="text"
                  placeholder="Timeout"
                  paddingright="8"
                />
              </div>
            </section>
            <section className="split-two">
              <div>
                <label>Group By</label>
                <Picky
                  options={groupByList}
                  valueKey="id"
                  labelKey="name"
                  value={this.state.groupBy}
                  multiple={true}
                  includeSelectAll={true}
                  includeFilter={false}
                  open={true}
                  onChange={this.selectGroupBy}
                  dropdownHeight={150}
                />
              </div>
              <div>
                <label>Aggregates</label>
                <Picky
                  options={aggregatesList}
                  valueKey="id"
                  labelKey="name"
                  value={this.state.aggregates}
                  multiple={true}
                  includeSelectAll={true}
                  includeFilter={false}
                  open={true}
                  onChange={this.selectAggregate}
                  dropdownHeight={150}
                />
              </div>
            </section>
          </section>
          <section className="split-two ">
            <div className="box-long">
              <label>Payers</label>
              <Picky
                options={payerList}
                valueKey="id"
                labelKey="name"
                value={this.state.payers}
                multiple={true}
                includeSelectAll={true}
                includeFilter={true}
                open={true}
                onChange={this.selectPayers}
                dropdownHeight={300}
              />
            </div>
            <div className="box-long">
              <label>Transaction Types</label>
              <Picky
                options={transactionTypeList}
                valueKey="id"
                labelKey="name"
                value={this.state.transactionTypes}
                multiple={true}
                includeSelectAll={true}
                includeFilter={false}
                open={true}
                onChange={this.selectTransactionTypes}
                dropdownHeight={300}
              />
            </div>
          </section>
        </main>
      </article>
    );
  }
}
