import React from "react";
import "./style.css";

const NameField = ({ name, value, onValidate, label, ...props }) => {
  const validate = event => {
    // Agnostic of characters, wasn't sure if >2 names was desired
    var valid = event.target.value.trim().split(" ").length === 2;
    onValidate(event, valid);
  };

  return (
    <React.Fragment>
      <label for={name}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={validate}
        name={name}
        className={props.className}
        {...props}
      />
    </React.Fragment>
  );
};

const ContactFieldGroup = ({ name, value, onValidate, label, ...props }) => {
  const validate = event => {
    // Need to figure out how to structure this to pass the event
    //var valid = !!values.type && !!values.value;
    //value[id] = values;

    onValidate(event, true);
  };

  var fields = [];
  var fieldCount = 0;
  for (var v in value) {
    fields.push(
      <ContactField
        name={"contact-" + fieldCount}
        value={v}
        onValidate={validate.bind(this)}
      />
    );
  }

  const addContact = event => {
    // Not quite sure how to handle this while maintaining immutable state
    //value.append
  };

  return (
    <React.Fragment>
      <label>{label}</label>
      <div>{fields}</div>
      <button onClick={addContact} value="addContact" className="btn">
        Add Contact
      </button>
    </React.Fragment>
  );
};

const ContactField = ({ name, value, onValidate, label, ...props }) => {
  const validate = event => {
    var valid = event.target.value.trim().split(" ").length === 2;
    onValidate(event, valid);
  };

  return (
    <div>
      <label>Number</label>
      <input type="text" value={value.type} onChange={validate} {...props} />
      <input type="text" value={value.value} onChange={validate} {...props} />
    </div>
  );
};

const DOBField = ({ name, value, onValidate, label, ...props }) => {
  const validate = event => {
    // Get the date 18 years ago
    var thresholdDate = new Date();
    thresholdDate.setFullYear(thresholdDate.getFullYear() - 18);
    var valid = new Date(event.target.value) <= thresholdDate;
    onValidate(event, valid);
  };

  return (
    <React.Fragment>
      <label for={name}>{label}</label>
      <input
        name={name}
        type="date"
        value={value}
        onChange={validate}
        {...props}
      />
    </React.Fragment>
  );
};

const GenderField = ({ name, value, onValidate, label, ...props }) => {
  const validate = event => {
    onValidate(event, true);
  };

  return (
    <React.Fragment>
      <label for={name}>{label}</label>
      <select name={name} value={value} onChange={validate}>
        <option value="0">Other/Prefer not to say</option>
        <option value="1">Female</option>
        <option value="2">Male</option>
      </select>
    </React.Fragment>
  );
};

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        name: null,
        dob: null,
        gender: "0",
        contact: [],
        hasGuardian: false,
        guardianName: null,
        guardianContact: []
      },
      isValid: {
        name: true,
        dob: true,
        gender: true,
        contact: true,
        hasGuardian: true,
        guardianName: true,
        guardianContact: true
      }
    };
  }

  onValidate(event, valid = true) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      values: { ...this.state.values, [name]: value },
      isValid: { ...this.state.isValid, [name]: valid }
    });
  }

  exportData() {
    // Not sure where you want the data exported to at this stage

    // Unsure how to reconcile nesting guardian info in its own object with
    // updating the state from component name and allowing the schema to be
    // altered.
    var json = JSON.stringify(this.state.values);
    return json;
  }

  render() {
    let { onSubmit, className, ...props } = this.props;
    return (
      <form
        onSubmit={onSubmit}
        className={`vertical-form ${className}`}
        {...props}
      >
        <NameField
          name="name"
          value={this.state.name}
          onValidate={this.onValidate.bind(this)}
          label="Full Name"
          className={this.state.isValid.name ? "" : "error"}
        />
        <DOBField
          name="dob"
          value={this.state.dob}
          onValidate={this.onValidate.bind(this)}
          label="Date of Birth"
          className={this.state.isValid.dob ? "" : "error"}
        />
        <GenderField
          name="gender"
          value={this.state.gender}
          onValidate={this.onValidate.bind(this)}
          label="Gender"
          className={this.state.isValid.gender ? "" : "error"}
        />
        <ContactFieldGroup
          name="contact"
          value={this.state.contact}
          onValidate={this.onValidate.bind(this)}
          label="Contact Numbers"
          className={this.state.isValid.contact ? "" : "error"}
        />
        <label for="hasGuardian">
          Requires Guardian Consent?
          <input
            type="checkbox"
            name="hasGuardian"
            checked={this.state.hasGuardian}
            onChange={this.onValidate.bind(this)}
            className={this.state.isValid.hasGuardian ? "" : "error"}
          />
        </label>
        {this.state.values.hasGuardian ? (
          <div className="vertical-form">
            <NameField
              name="guardianName"
              value={this.state.guardianName}
              onValidate={this.onValidate.bind(this)}
              label="Guardian Name"
              className={this.state.isValid.guardianName ? "" : "error"}
            />
            <ContactFieldGroup
              name="guardianContact"
              value={this.state.guardianContact}
              onValidate={this.onValidate.bind(this)}
              label="Guardian Contact Numbers"
              className={this.state.isValid.guardianContact ? "" : "error"}
            />
          </div>
        ) : (
          <div />
        )}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default UserForm;
