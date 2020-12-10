import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
// import { RouteComponentProps} from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator'; 
import axios from 'axios';

import './LogIn.css'

interface LogInProps {
  registerFlag: boolean;
}

type userForm = {
  email: string,
  password: string,
  username?: string,
}

type LogInPageResource = {
  button: string,
  postURL: string,
  alternativeLink: JSX.Element,
}


export default function LogIn ({ registerFlag }: LogInProps) {

  const { register, handleSubmit, getValues } = useForm<userForm>();
  const [ responseMessage, setResponseMessage] = useState('');
  const history = useHistory();
  const validator = useRef(new SimpleReactValidator());
  const loginResources: LogInPageResource = {
    button: "login",
    postURL: "http://localhost:3000/login",
    alternativeLink: <p className="message">Not registered? <a href="/register">Create an account</a></p>,
  };
  const registerResources: LogInPageResource = {
    button: "create",
    postURL: "http://localhost:3000/user/create",
    alternativeLink: <p className="message">Already registered? <a href="/logIn">Sign In</a></p>,
  }; 
  const resource = (registerFlag)? registerResources : loginResources;

  const inputField = (name: string, type = "text") => {
    return <input type={type} placeholder={name} name={name} ref={register} />;
  }


  const onSubmit = (data: userForm) => {
    
    if (validator.current.allValid()) {
      axios.post(resource.postURL, { ...data })
        .then(() =>  history.push('/'))
        .catch(error => {
          if (error.response) {
            const { status, data } = error.response;
            setResponseMessage(`${status} - ${data.message}`);
          } else 
            setResponseMessage("Ops something went wrong!");
        });
    } else {
      validator.current.showMessages();
    }
  }

  return (
    <div className="login-page">
      <div className="form">
        { (responseMessage)? <p className="server-response">{ responseMessage }</p> : null }
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          { inputField("email") }
          <div className="input-error">
            { validator.current.message("Invalid Email", getValues("email"), "required|email") }
          </div>

          { inputField("password", "password") }
          <div className="input-error" >
            { validator.current.message("Password must have at least 8 characters", getValues("password"), "required|min:8|max:32") }
          </div>

          { (registerFlag)? inputField("username") : null }

          <button type="submit">{ resource.button }</button>
          { resource.alternativeLink}
        </form>
      </div>
    </div>
  );
};