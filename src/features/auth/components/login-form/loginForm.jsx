import React from "react";
import PropTypes from "prop-types";
//import InputField from "../../../../components/form-control/input-field/input_field";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-control/input-field/input_field";
import { Avatar, Button, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Container from "@material-ui/core/Container";
import PasswordField from "components/form-control/password-field/password_field";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "40px",
    position: 'relative'
  },

  avatar: {
    backgroundColor: "#ce93d8",

    margin: "0 auto",
  },

  title: {
    margin: "20px 0px 30px 0px",

    textAlign: "center",
  },

  submit: {
    margin: "30px 0px 20px 0px",
  },

  progress: {

    position: 'absolute',
    top: '10px',
    left: 0,
    right: 0,

  },

}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();



  const schema = yup.object().shape({

  
    // validation for email

    identifier: yup
    .string()
    .required('Please enter your email.')
    .email('Please enter a valid email address.'),

    // validation for password

    password: yup.string()
    .required('Please enter your password')
    

    //validation for retypePassword

   
   
  });

  const form = useForm({
    defaultValues: {
     
      identifier: "",
      password: "",
    
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await  onSubmit(values);
    }
    //form.reset();
  };


  const{isSubmitting} = form.formState;


  return (
    <div className={classes.root}>

      
          {/* show loading */}
      {isSubmitting && <LinearProgress className={classes.progress}/>} 

      <Avatar className={classes.avatar}></Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        Login
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        
        <InputField name="identifier" label="email" form={form} />
        <PasswordField name="password" label="password" form={form} />
        

        <Button disabled = {isSubmitting}
        // disabled button submit when submit

          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size = "large"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
