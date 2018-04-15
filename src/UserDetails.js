import React from "react";

const NameField = ({ name, value, onValidate, ...props }) => {

  const validate = event => {
    // Agnostic of characters, wasn't sure if >2 names was desired
    var valid = event.target.value.trim().split(" ").length === 2;
    onValidate(name, event.target.value, valid);
  };

  return <input
    type="text"
    value={value}
    onChange={validate}
    name={name}
    {...props}
  />;
};

const ContactFieldGroup = ({ name, value, onValidate, ...props }) => {
  const validate = (id, values) => {
    var valid = !!values.type && !!values.value;
    value[id] = values;
    onValidate(name, value, valid);
  };

  var fields = [];
  var fieldCount = 0;
  for (v in value) {
    fields.push(<ContactField
      name={"contact-" + fieldCount}
      value={v}
      onValidate={validate.bind(this)}
    />)
  }

  return (
  );
};

const ContactField = ({ name, value, onValidate, ...props }) => {
  const validate = event => {
    var valid = event.target.value.trim().split(" ").length === 2;
    onValidate(name, event.target.value, valid);
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
    var valid = event.target.value.trim().split(" ").length === 2;
    onValidate(name, event.target.value, valid);
  };

  return <input type="date" value={value} onChange={validate} {...props} />;
};

const GenderField = ({ name, value, onValidate, ...props }) => {
  const validate = event => {
    onValidate(name, event.target.value, true);
  };

  return (
    <select value={value} onChange={validate}>
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
      "name": null,
      "dob": null,
      "gender": 0,
      "contact": [],
      "hasGuardian": false,
      "guardianName": null,
      "guardianContact": []
      "errors": {
        "name": false,
        "dob": false,
        "gender": false,
        "contact": false,
        "hasGuardian": false,
        "guardianName": false,
        "guardianContact": false,
      }
    }
  }

  const onValidate = (name, value, valid) => {
    this.setState({
      name: value,
      "errors": { ...this.state.errors, [name]: valid}
      })
  }

  render() {
    return (
      <div>
        <NameField
          name="name"
          value={this.state.name}
          onValidate={onValidate.bind(this)}
        />
        <DOBField
          name="dob"
          value={this.state.dob}
          onValidate={onValidate.bind(this)}
        />
        <GenderField
          name="gender"
          value={this.state.gender}
          onValidate={onValidate.bind(this)}
        />
        <ContactFieldGroup
          name="contact"
          value={this.state.contact}
          onValidate={onValidate.bind(this)}
        />
        <input type="checkbox" value={this.state.hasGuardian} />
        <div visible={this.state.hasGuardian}>
          <NameField
            name="guardianName"
            value={this.state.guardianName}
            onValidate={onValidate.bind(this)}
          />
          <ContactFieldGroup
            name="guardianContact"
            value={this.state.guardianContact}
            onValidate={onValidate.bind(this)}
          />
        </div>
      </div>
    );
  }
};
