import React from "react";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "features/auth/userSlice";
import { useSnackbar } from "notistack";
import PropTypes from 'prop-types';
import LoginForm from "../login-form/loginForm";


Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {

  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();


  const handleSubmit = async (values) => {
    try {

      // auto set username = email
     

      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      // close dialog

      const{closeDialog} = props;
      if(closeDialog){
        closeDialog();
      }

      
    } catch (error) {
      console.log('Fail to login: ', error);
      enqueueSnackbar(error.message, { variant: 'error'});
      
    }

  };


  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
