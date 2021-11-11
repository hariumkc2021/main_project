import { Button, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import "./Login.css";
import Alert from '@material-ui/lab/Alert';

const Login = (props) => {
    const history = useHistory();
    const { setUser } = useContext(AppContext);
    const [enableToat, setToast] = useState(false);
    const [toastTxt, setToastTxt] = useState("");

    const onLogin = (e) => {
        if (e.target.email.value == "" || e.target.password.value == "") {
            setToast(true);
            setToastTxt("Feilds cannot be empty")
        } else if (e.target.email.value == "testing" && e.target.password.value == "testing") {
            setUser("test@bancy.com");
            history.push('productList');
        } else {
            setToast(true);
            setToastTxt("Invalid input")
        }
        e.preventDefault();
    }
    return (
        <>
            {enableToat ? <Alert variant="filled" severity="error">
                {toastTxt}</Alert> : null}
            < div className="login-container">
                <form className="login-box" onSubmit={e => onLogin(e)}>
                    <TextField label="email" name="email" variant="outlined" />
                    <TextField type="password" name="password" label="password" variant="outlined" />
                    <Button variant="contained" color="primary" type="submit">Login</Button>
                </form>
            </div>


        </>
    )
}

export default Login;

