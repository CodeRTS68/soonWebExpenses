import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {AppBar, Toolbar, Button, Grid} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
const colorFont = {
    color: "white"
}

class TopBar extends React.Component {
    render(){
        const {user, isAuthenticated} = this.props.auth;
        return(
          <div >
            <AppBar position="static" style={{background: 'purple'}}>
              <Toolbar>
                  <Grid container justify="space-between">
                    <Grid item>
                        <Link to="/" >
                            <HomeIcon color="action" style={{ fontSize: 35, color: 'black' }}/>
                        </Link>
                        <Link to="/records  " >
                            <AccountBalanceWalletOutlinedIcon style={{ fontSize: 35, color: 'black', paddingLeft: 20 }}/>
                        </Link>
                    </Grid>
                    <Grid item>
                        {isAuthenticated ? (
                            <Button style={colorFont} disable>
                                logged in as {user.email}
                            </Button>
                        ) : (
                            <Fragment>
                                <Link to="/login" >
                                    <Button style={colorFont} >LOGIN</Button>
                                </Link>
                                <Link to="/register" >
                                    <Button style={colorFont}>REGISTER</Button>
                                </Link>
                            </Fragment>
                        )}            
                    </Grid>
                  </Grid>
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(TopBar);