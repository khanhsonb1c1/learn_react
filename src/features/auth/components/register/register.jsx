import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../register-form/registerForm";

Register.propTypes = {};

function Register(props) {
  const handleSubmit = (values) => {
    console.log("Form Submit: ", values);
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
