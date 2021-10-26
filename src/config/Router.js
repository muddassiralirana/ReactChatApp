import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";
import {Login,Signup,Profile,Chat,Contacts} from '../containers'
import { onAuthStateChanged, auth } from './Firebase';
import { useEffect } from 'react';
import { useState } from 'react';



function PrivateRoute({ component: Component, auth, ...rest }) {
    return (
        <Route
            {...rest}
            component={({ location }) =>
                auth ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {
                                from: location.pathname
                            },
                        }}
                    />
                )
            }
        />
    );
}

function PublicRoute({ component: Component, auth, ...rest }) {
    const location = useLocation();
    let uid = localStorage.getItem("uid");
    return (
        <Route
            {...rest}
            component={() =>
                !auth ? (
                    <Component />
                ) : (
                    <Redirect
                        to={location.state?.from ? location.state.from : `/profile/${uid}`}
                    />
                )
            }
        />
    );
}


function AppRouter() {
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }
        })
    }, [])
    return (
        <Router>
            <Switch>
                <PublicRoute auth={isAuth} exact path="/" component={Login} />
                <PublicRoute auth={isAuth} exact path="/signup" component={Signup} />
                <PrivateRoute auth={isAuth} exact path="/profile/:uid" component={Profile} />
                <PrivateRoute auth={isAuth} exact path="/chat/:uid" component={Chat} />
                <PrivateRoute auth={isAuth} exact path="/contacts/:uid" component={Contacts} />
            </Switch>
        </Router>
    )
}

export default AppRouter;