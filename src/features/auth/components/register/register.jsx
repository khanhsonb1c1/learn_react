import React from "react";
import RegisterForm from "../register-form/registerForm";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { register } from "features/auth/userSlice";



Register.propTypes = {};

function Register(props) {

  const dispatch = useDispatch();


  const handleSubmit = async (values) => {
    try {

      // auto set username = email
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log('New user ', user);
      
    } catch (error) {
      console.log('Fail to register: ', error);
      
    }

  };


  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
