import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../components/form-control/input-field/input_field";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

SongForm.propTypes = {
  onSubmit: PropTypes.func,
};

function SongForm(props) {
  const schema = yup.object().shape({
    title: yup.string()
    .required("Please enter title")
    .min(5, 'title is too short'),
    
  });

  const form = useForm({
    defaultValues: {
      title: '',
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    
    const{onSubmit} = props;
    if(onSubmit) {
        onSubmit(values);
    }
    form.reset();
  };

  return (
   
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="title" label="Song" form={form} />
    </form>

    
  );
}

export default SongForm;
