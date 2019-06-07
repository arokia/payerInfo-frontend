import React, { Component } from "react";

import { Container, Row, Col, Alert } from "reactstrap";
import PayerDataService from "../services/payer.service"

export default class PayerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payers: [],
      isLoaded: false,
      error: null,
      payer: {
        name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        contactName: "",
        contactInfo: "",
        type: "",
        provider: "",
        region: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.refreshPayers();
  }
  refreshPayers() {
    PayerDataService.getPayers().then(response => {
      const [error, data] = response;
      if (error) {
        this.setState({
          isLoaded: true,
          payers: [],
          error: data
        });
      } else {
        this.setState({
          isLoaded: true,
          payers: data
        });
      }
    });
  }
  componentWillReceiveProps(nextProps) { 
    console.log("componentWillReceiveProps ran");
    this.refreshPayers();
  }
  handleChange(e) {
    const payerId = e.target.value;
   PayerDataService.getPayer(payerId).then(response => {
     const [error, data] = response;
     if (error) {
       this.setState({
         isLoaded: true,
         payer: "",
         error: data
       });
     } else {
       this.setState({
         isLoaded: true,
         payer: data
       });
     }
   });
  }
  render() {
    const { error, isLoaded, payers } = this.state;

    if (error) {
      return <Alert color="danger">Error: {error}</Alert>;
    } else if (!isLoaded) {
      return <Alert color="primary">Loading...</Alert>;
    } else {
     
      return (
        <Container>
          <Row>
            <Col>
              <h2>Payer List</h2>
              <select
                className="form-control col-md-3"
                onChange={this.handleChange}
              >
                <option key="0">Choose One</option>
              
                {payers.map(payer => {
                  return (
                    <option value={payer.id} key={payer.id}>
                      {payer.name}
                    </option>
                  );
                })

                }
              </select>
            </Col>
          </Row>
          <br />
          {this.state.payer.name && (
            <div className="table-responsive panel col-8">
              <h3>Payer Details</h3>
              <div className="container  ">
                <div className="row  ">
                  <div className="col-3 col-head">Name: </div>
                  <div className="col-2">{this.state.payer.name}</div>
                </div>
                <div className="row">
                  <div className="col-3 col-head">Address1:</div>
                  <div className="col-2">{this.state.payer.address1}</div>
                  <div className="col-3 col-head">Address2:</div>
                  <div className="col-3">{this.state.payer.address2}</div>
                </div>
                <div className="row">
                  <div className="col-3 col-head">City:</div>
                  <div className="col-2">{this.state.payer.city}</div>
                  <div className="col-2 col-head">State:</div>
                  <div className="col-1">{this.state.payer.state}</div>
                  <div className="col-1 col-head">Zip:</div>
                  <div className="col-2">{this.state.payer.zip}</div>
                </div>
                <div className="row">
                  <div className="col-3 col-head">Contact Name:</div>
                  <div className="col-2">
                    {this.state.payer.contact.contactName}
                  </div>
                  <div className="col-3 col-head">Contact Info:</div>
                  <div className="col-2">
                    {this.state.payer.contact.contactInfo}
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 col-head">Payer Type: </div>
                  <div className="col-2">{this.state.payer.type}</div>
                </div>
                {this.state.payer.type === "HOSTED" && (
                  <div className="row">
                    <div className="col-3 col-head">Provider:</div>
                    <div className="col-2">{this.state.payer.provider}</div>
                    <div className="col-3 col-head">Region:</div>
                    <div className="col-2">{this.state.payer.region}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      );
    }
  }
}
