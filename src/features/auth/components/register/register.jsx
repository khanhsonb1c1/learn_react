import React from "react";
import RegisterForm from "../register-form/registerForm";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { register } from "features/auth/userSlice";
import { useSnackbar } from "notistack";
import PropTypes from 'prop-types';


Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {

  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();


  const handleSubmit = async (values) => {
    try {

      // auto set username = email
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      // close dialog

      const{closeDialog} = props;
      if(closeDialog){
        closeDialog();
      }



      // do something here on register successfully
      //console.log('New user ', user);

      enqueueSnackbar('Register successfully.' , {variant: 'success'});
      
    } catch (error) {
      console.log('Fail to register: ', error);
      enqueueSnackbar(error.message, { variant: 'error'});
      
    }

  };


  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
