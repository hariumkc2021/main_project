import { Button, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import "./Login.css";
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
const Login = (props) => {
    const history = useHistory();
    const { setUser } = useContext(AppContext);
    const [enableToat, setToast] = useState(false);
    const [toastTxt, setToastTxt] = useState("");

    const onLogin = (e) => {
      if (e.target.email.value == "" || e.target.password.value == "") {
        setToast(true);
        setToastTxt("Feilds cannot be empty");
      } else {
        axios
          .post("https://umkc-project.herokuapp.com/login", {
            userName: e.target.email.value,
            password: e.target.password.value,
          })
          .then((response) => {
            console.log("user", response);
            if (response.data.status == 200) {
              localStorage.setItem('user', JSON.stringify(response.data));
              setUser(response.data);
              history.push("productList");
            } else {
              setToast(true);
              setToastTxt("User not found");
            }
          })
          .catch((e) => {
            setToast(true);
            setToastTxt("Invalid input");
          });
      }
      e.preventDefault();
    };
    return (
        <>
            {enableToat ? <Alert variant="filled" severity="error">
                {toastTxt}</Alert> : null}
            < div className="login-container">
                <form className="login-box" onSubmit={e => onLogin(e)}>
                    <TextField label="Username or email address" name="email" variant="outlined" />
                    <TextField type="password" name="password" label="Password" variant="outlined" />
                    <Button variant="contained" color="primary" type="submit">Login</Button>
                </form>
            </div>


        </>
    )
}

export default Login;

