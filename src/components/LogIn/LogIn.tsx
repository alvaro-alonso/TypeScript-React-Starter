import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

import './LogIn.css'

interface LogInProps {
  registerFlag: boolean;
}

type userForm = {
  username: string,
  password: string,
  email?: string,
}

type LogInPageResource = {
  button: string,
  postURL: string,
  alternativeLink: JSX.Element,
}

export default function LogIn ({ registerFlag }: LogInProps) {

  const { register, handleSubmit } = useForm<userForm>();
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
    axios.post(resource.postURL, { ...data });
  }

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          { inputField("username") }
          { inputField("password", "password") }
          { (registerFlag)? inputField("email") : null }

          <button type="submit">{ resource.button }</button>
          { resource.alternativeLink}
        </form>
      </div>
    </div>
  );
};