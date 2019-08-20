import React, { Fragment } from 'react';
import {Router, Route } from "react-router-dom";
import {Provider} from "react-redux";
import { CircularProgress } from "@material-ui/core";

import {store} from "./store/store";
import { requestLoginSuccess } from "./store/auth/type";

//components
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import TopBar from './components/TopBar';
import Records from './components/Records';
import {
    getJwtToken,
    isTokenExpired,
    decodeJwt,
    setDefaultAuthHeader,
    history
  } from "./utils";
class App extends React.Component{
    state = {
        isInitializing: true
      };
      componentDidMount() {
        const jwt = getJwtToken();
        if (jwt) {
          const decoded = decodeJwt(jwt);
          const isExpired = isTokenExpired(decoded.exp);
          if (!isExpired) {
            setDefaultAuthHeader(jwt);
            store.dispatch({ type: requestLoginSuccess, payload: decoded });
            this.setState({ isInitializing: false });
          }
        }
        history.push("/login");
        this.setState({ isInitializing: false });
      }
    render(){
        const { isInitializing } = this.state;
        return(
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <TopBar/>
                        {!isInitializing ? (
                            <Fragment>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/register' component={Register} />
                                <Route exact path='/records' component={Records} />
                            </Fragment>
                            
                        ) : (
                            <CircularProgress />
                        )}
                        
                    </div>
                </Router>
            </Provider> 
        );
    }
}

export default App;