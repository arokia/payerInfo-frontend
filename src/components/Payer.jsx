import React, { Component } from "react";
import { Alert } from "reactstrap";
import PayerDataService from "../services/payer.service";
import FormErrors from "./FormErrors";
export default class Payer extends Component {
  constructor(props) {
    super(props);

    this.submitPayer = this.submitPayer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancelClick = this.cancelClick.bind(this);

    this.state = {
      error: false,
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      contactName: "",
      contactInfo: "",
      type: "DIRECT",
      provider: "",
      region: "",

      formErrors: { name: "" },
      nameValid: false,
      formValid: false
    };
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length >= 3;
        fieldValidationErrors.name = nameValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid
    });
  }
  cancelClick(e) {
    this.props.history.push("/list");
  }
  submitPayer(e) {
    e.preventDefault();
    const payer = {
      name: this.state.name,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      contactName: this.state.contactName,
      contactInfo: this.state.contactInfo,
      type: this.state.type
    };
    if (this.state.type === "HOSTED") {
      //request another server and get the data -- TODO
      payer.provider = "CHC";
      payer.region = "US-WEST";
    }

    PayerDataService.savePayer(payer).then(response => {
      const [error, data] = response;
      if (error) {
        this.setState({ error: error });
        console.log(data);
      } else {
        this.props.history.push("/list");
      }
    });
    // .catch(error => console.error(error));
  }

  render() {
    let states = ["TN", "AP", "KL", "MH", "OR"];
    let stateItems = states.map(state => (
      <option value={state} key={state}>
        {state}
      </option>
    ));
    return (
      <div className="container col-8 " style={{ marginTop: 10 }}>
        <h3>Add New Payer</h3>
        {this.state.error && (
          <Alert color="danger">Error: {this.state.error}</Alert>
        )}
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <form onSubmit={this.submitPayer}>
          <div className="form-group">
            <label>Payer Name </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              name="name"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Address 1 </label>
              <input
                type="text"
                name="address1"
                className="form-control"
                value={this.state.address1}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Address 2 </label>
              <input
                type="text"
                name="address2"
                className="form-control"
                value={this.state.address2}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputState">State</label>
              <select
                className="form-control"
                value={this.state.state}
                name="state"
                onChange={this.handleChange}
              >
                <option value="0">Choose...</option>
                {stateItems}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputZip">Zip</label>
              <input
                type="text"
                className="form-control"
                name="zip"
                value={this.state.zip}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Contact Name </label>
              <input
                type="text"
                name="contactName"
                className="form-control"
                value={this.state.contactName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Contact Info </label>
              <input
                type="text"
                name="contactInfo"
                className="form-control"
                value={this.state.contactInfo}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <fieldset className="form-group ">
            <div className="form-row">
              <legend className="col-form-label pt-0">Payer Type</legend>
              <div className="col-md-12">
                <div className="form-check  form-check-inline">
                  <input
                    id="hosted"
                    className="form-check-input"
                    type="radio"
                    value="HOSTED"
                    name="type"
                    checked={this.state.type === "HOSTED"}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="hosted">
                    Hosted Payer
                  </label>
                </div>
                <div className="form-check  form-check-inline">
                  <input
                    id="direct"
                    className="form-check-input"
                    type="radio"
                    name="type"
                    value="DIRECT"
                    checked={this.state.type === "DIRECT"}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="direct">
                    Direct Payer
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="form-row col-md-6">
            <div className="form-group mr-3">
              <input
                type="submit"
                value="Save"
                className="btn btn-primary"
                disabled={!this.state.formValid}
              />
            </div>
            <div className="form-group ">
              <input
                type="button"
                value="Cancel"
                className="btn btn-primary"
                onClick={this.cancelClick}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
