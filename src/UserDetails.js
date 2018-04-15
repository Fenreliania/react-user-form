import React from "react";

const NameField = ({ name, value, onValidate, ...props }) => {
  const validate = event => {
    // Agnostic of characters, wasn't sure if >2 names was desired
    var valid = event.target.value.trim().split(" ").length === 2;
    onValidate(event, valid);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={validate}
      name={name}
      {...props}
    />
  );
};

const ContactFieldGroup = ({ name, value, onValidate, ...props }) => {
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

  return <div>{fields}</div>;
};

const ContactField = ({ name, value, onValidate, ...props }) => {
  const validate = event => {
    var valid = event.target.value.trim().split(" ").length === 2;
    onValidate(event, valid);
  };

  return (
    <div>
      <input type="text" value={value.type} onChange={validate} {...props} />
      <input type="text" value={value.value} onChange={validate} {...props} />
    </div>
  );
};

const DOBField = ({ name, value, onValidate, ...props }) => {
  const validate = event => {
    // Get the date 18 years ago
    var thresholdDate = new Date();
    thresholdDate.setFullYear(thresholdDate.getFullYear() - 18);
    var valid = event.target.value < thresholdDate;
    onValidate(event, valid);
  };

  return <input type="date" value={value} onChange={validate} {...props} />;
};

const GenderField = ({ name, value, onValidate, ...props }) => {
  const validate = event => {
    onValidate(event, true);
  };

  return (
    <select name={name} value={value} onChange={validate}>
      <option value="0">Other/Prefer not to say</option>
      <option value="1">Female</option>
      <option value="2">Male</option>
    </select>
  );
};

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      dob: null,
      gender: "0",
      contact: [],
      hasGuardian: false,
      guardianName: null,
      guardianContact: [],
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
      [name]: value,
      errors: { ...this.state.errors, [name]: valid }
    });
  }

  render() {
    return (
      <div>
        <NameField
          name="name"
          value={this.state.name}
          onValidate={this.onValidate.bind(this)}
        />
        <DOBField
          name="dob"
          value={this.state.dob}
          onValidate={this.onValidate.bind(this)}
        />
        <GenderField
          name="gender"
          value={this.state.gender}
          onValidate={this.onValidate.bind(this)}
        />
        <ContactFieldGroup
          name="contact"
          value={this.state.contact}
          onValidate={this.onValidate.bind(this)}
        />
        <input
          type="checkbox"
          name="hasGuardian"
          checked={this.state.hasGuardian}
          onChange={this.onValidate.bind(this)}
        />
        {this.state.hasGuardian ? (
          <div>
            <NameField
              name="guardianName"
              value={this.state.guardianName}
              onValidate={this.onValidate.bind(this)}
            />
            <ContactFieldGroup
              name="guardianContact"
              value={this.state.guardianContact}
              onValidate={this.onValidate.bind(this)}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default UserForm;
