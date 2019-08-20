import {
    addTransaction,
    addTransactionSuccess,
    addTransactionError,
    fetchTransactions,
    fetchTransactionsSuccess,
    fetchTransactionsError,
} from "./types";

import {api } from "../../utils";

export const postTransaction = transactionData => async dispatch => {
    try {
        dispatch({type: addTransaction});
        const res = await api.post('/transaction', transactionData)
        const {data} = await res;
        dispatch({type: addTransactionSuccess, payload: data});
    } catch (error){
        dispatch({type: addTransactionError});
    }
};

export const getTransactions = params => async dispatch => {
    try {
        dispatch({type: fetchTransactions});
        const res = await api.get('/transaction', {params});
        const {data} = await res;
        dispatch({type: fetchTransactionsSuccess, payload:data});
    } catch (error){
        dispatch({type: fetchTransactionsError});
    }
};

