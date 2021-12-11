import { Button, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import "./Login.css";
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import Box from '@material-ui/core/Box'

const Login = (props) => {
    const history = useHistory();
    const { setUser } = useContext(AppContext);
    const [enableToat, setToast] = useState(false);
    const [toastTxt, setToastTxt] = useState("");
    const [loginComp,setLoginComp]=useState(true);

    const onLogin = (e) => {
      if(loginComp){
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
      }}else{
        setLoginComp(true);
      }
      e.preventDefault();
    };

    const signUp =(e)=>{
      if(!loginComp){
        if (e.target.email.value == "" || e.target.password.value == ""||e.target.name.value=="" ) {
          setToast(true);
          setToastTxt("Feilds cannot be empty");
        }else{
          axios
          .post("https://umkc-project.herokuapp.com/signUp", {
            "name": e.target.name.value,
            "password": e.target.password.value,
            "email":e.target.email.value,
          })
          .then((response) => {
            setToastTxt("User created");
            setLoginComp(true);
          }).catch((e) => {
            setToast(true);
            setToastTxt("Invalid input");
          });
        }

      }else{
        setLoginComp(false);
      }
      e.preventDefault();
    }

    return (
        <>
            {enableToat ? <Alert variant="filled" severity="error">
                {toastTxt}</Alert> : null}
            {loginComp?< div className="login-container">
                <form className="login-box" onSubmit={e => onLogin(e)}>
                    <TextField label="Username " name="email" variant="outlined" />
                    <TextField type="password" name="password" label="Password" variant="outlined" />
                    <span>
                         <Button  variant="contained" color="primary" type="submit">Login</Button>
                         <Box ml={1} component="span"><Button  type="submit" onClick={e=>setLoginComp(false)} variant="contained" color="primary" >SignUp</Button></Box>
                    </span>
                </form>
            </div>:< div className="login-container">
                <form className="login-box" onSubmit={e => signUp(e)}>
                    <TextField label="Name" name="name" variant="outlined" />  
                    <TextField label="Email" name="email" variant="outlined" />
                    <TextField type="password" name="password" label="Password" variant="outlined" />
                    <span>
                         <Button  variant="contained" color="primary" type="submit">Login</Button>
                         <Box ml={1} component="span"><Button type="submit" variant="contained" color="primary" >SignUp</Button></Box>
                    </span>
                </form>
            </div>}


        </>
    )
}

export default Login;

