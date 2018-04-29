import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {

  renderAlert(){
    if (this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops !</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  
  renderField(field){
    const { meta: { touched, error } } = field;
    const className= `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <fieldset className={className}>
        <label>{ field.label }</label>
        <input
          type= {field.type }
          className="form-control"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </fieldset>
    );
  };

  handleFormSubmit({email, password}) {
    this.props.signupUser({email, password});
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
        <Field
          label="Email"
          name="email"
          type="email"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Confirm Password"
          name="confirm_password"
          type="password"
          component={this.renderField}
        />
        { this.renderAlert() }
        <button
          action="submit"
          className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter an email";
  }

  if (!values.password) {
    errors.password = "Enter a password";
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Enter a password confirmation";
  }

  if (values.confirm_password !== values.password ) {
    errors.confirm_password = "Passwords must match";
  }

  return errors;
};

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  validate,
  form: 'Signin'
})(connect(mapStateToProps, actions)(Signup));
