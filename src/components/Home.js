import React from 'react';
import {connect} from "react-redux";
import {
    TextField,
    Grid,
    MenuItem,
    Button,
    CircularProgress
} from '@material-ui/core';
import { CardTransaction } from "./CardTransaction";

import {
    getTransactions,
    postTransaction,
    STATUS
} from "../store/transactions"
// import {Grid, TextField, Button, } from "@material-ui/core";
class Home extends React.Component {
    state = {
        amount: 0,
        category: "FOOD ",
        type: "EXPENSE",
        description: " "

    }
    componentDidMount(){
        this.props.postTransaction();
    }

    handleOnChange = e => this.setState({[e.target.name] : e.target.vaalue});
    handleOnSubmit= () => {
        this.props.postTransaction({
            amount: this.state.amount,
            category: this.state.category,
            type: this.state.type,
            description: this.state.description
        });     
    };
    render(){
        const {amount, category, type, description} = this.state;
        const {transactions, status} = this.props.transactions;
        return(
            <Grid container justify="center" >
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        id="outlined-select-currency"
                        select
                        label="select type"
                        value={type}
                        name="type"
                        onChange={this.handleOnChange}
                        helperText="please select type"
                        margin ="normal"
                        variant ="outlined"
                    >
                        <MenuItem key="EXPENSE" value="EXPENSE">
                            EXPENSE 
                        </MenuItem>
                        <MenuItem  value="INCOME">
                            INCOME
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        id="outlined-select-currency"
                        select
                        label="Select Category"
                        value={category}
                        name="category"
                        margin="normal"
                        variant="outlined"
                        helperText="please select category"
                        onChange={this.handleOnChange}
                    >
                        <MenuItem key="FOOD" value="FOOD">
                            FOOD
                        </MenuItem>
                        <MenuItem key="HOBBY" value="HOBBY">
                            HOBBY
                        </MenuItem>
                        <MenuItem key="EDUCATION" value="EDUCATION">
                            EDUCATION
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        name="amount"
                        label="Amount"
                        type="number"
                        placeholder="e.g 50000"
                        variant="outlined"
                        margin="normal"
                        value={amount}
                        onChange={this.handleOnChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        name="description"
                        label="Description"
                        type="text"
                        placeholder="e.g some fruit"
                        variant="outlined"
                        margin="normal"
                        value={description}
                        onChange={this.handleOnChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button 
                        fullWidth
                        variant="contained"
                        color="purple"
                        style={{marginTop: 20, marginBottom: 20, backgroundColor: "purple", color:"white"}}
                        onClick={this.handleOnSubmit}
                    >
                        {status === STATUS.ADDING_TRANSACTION ? (
                            <CircularProgress color="white"/>
                        ) : (
                            "Add transaction"
                        )}
                    </Button>
                </Grid>
                    
                <Grid container justify="center" spacing={10} >
                    {status === STATUS.FETCH_TRANSACTION && (
                        <CircularProgress color="black"/>
                    )}
                    {transactions.map(transaction => (
                        <Grid item xs={3}>
                            <CardTransaction transaction={transaction}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,
    transactions: state.transactions
});

const mapDispatchToProps =  {
    postTransaction,
    getTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);