import React from 'react';
import {connect} from 'react-redux';
import {Grid, Button, TextField, Zoom} from '@material-ui/core';

import{reqLogin} from "../store/auth";
import {history, isEmpty} from "../utils";
class Login extends React.Component {
    state = {
        email: "",
        password: ""
    };
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            history.push("/");
        }
    }
    componentDidUpdate(){
        if(this.props.auth.isAuthenticated){
            history.push("/")
        }
    }
    handleOnChange = e => this.setState({[e.target.name] : e.target.value});
    handleLogin = ()=>{
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.reqLogin(userData);
    }
    render(){
        const{email, password} = this.state;
        const{isLoading, error} =this.props.auth;
        return(
            <Zoom in>
                <Grid 
                    container
                    spacingh={0}
                    alignItems='center'
                    justify='center' 
                    // ini yang jadi bikin posisi jadi di tengah2
                    direction="column"
                    style={{ minHeight: "95vh" }}
                >
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={email}
                            name='email'
                            placeholder="user@gmail.com"
                            label='email'
                            variant='outlined'
                            onChange={this.handleOnChange}
                        />
                        <TextField
                            fullWidth
                            value={password}
                            name='password'
                            label='password'
                            placeholder="********"
                            variant='outlined'
                            style={{ marginTop: 10 }}
                            onChange={this.handleOnChange}
                            error={!isEmpty(error)}

                        />
                        <Button
                            fullWidth
                            color="primary"
                            variant='contained'
                            style={{ marginTop: 10, background: 'purple', color: 'white' }}
                            onClick={this.handleLogin}
                        >
                            {isLoading ? "Loging in..." : "Log In"}
                        </Button>
                    </Grid>
                </Grid>
            </Zoom>
        )
    }
}
const mapDispatchToProps = () => ({
    reqLogin
});
const mapStateToProps = state =>{
    return{
        auth: state.auth
    };
}
export default connect(mapStateToProps, mapDispatchToProps )(Login);