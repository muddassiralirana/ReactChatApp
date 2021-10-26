import './Css/index.css';
import {Button,BasicTextFields,ToggleColorMode} from '../../components';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import {auth,signInWithEmailAndPassword} from '../../config/Firebase';
// import lock from '../../assests/images/lock.png'
// import lock from '../../assests/images/login.png'
import { Formik } from 'formik';

function Login(){
    let user = auth.currentUser;
    let history = useHistory();
    const [mode, setMode] = React.useState('light');
    const [loading, setLoading] = React.useState(false);
    function UserSignIn({email,password}){
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            let uid = user.uid;
            setLoading(false);
            localStorage.setItem("uid",uid);
            history.push(`/profile/${uid}`);
        })
        .catch((error) => {
            setLoading(false);
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }
    return (
        <div className={mode==='light'?"Light Login":"Dark Login"}>
            <ToggleColorMode auth={user} mode={mode} setMode={setMode} title="Login" />
            <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="grid"
            >
                <div className="box">
                    <h1>Login</h1>
                    {/* <img src={lock} alt="Lock" /> */}
                    <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                        errors.email = 'Required';
                        } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                        errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                            }
                        else if(values.password.length < 8){
                            errors.password = 'Password must be atleast 8 characters long.';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        UserSignIn(values);
                        setSubmitting(false);
                    }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                        <BasicTextFields 
                        error={errors.email}
                        title="Email" 
                        type="email" 
                        value={values.email} 
                        name="email" 
                        onBlur={handleBlur} 
                        className="login-input" 
                        onChange={handleChange} 
                        helperText={errors.email && touched.email && errors.email}
                        />
                        <BasicTextFields 
                        error={errors.password}
                        title="Password" 
                        type="password"
                        value={values.password} 
                        name="password"
                        onBlur={handleBlur} 
                        className="login-input" 
                        onChange={handleChange} 
                        helperText={errors.password && touched.password && errors.password}
                        />
                        <Button 
                        className="btn"
                        type="submit"
                        disabled={isSubmitting}
                        >
                            {loading?"Loading...":"Submit"}
                        </Button>
                        </form>
                    )}
                    </Formik>
                </div>
            </Grid>
        </div>
    );
}
export default Login;