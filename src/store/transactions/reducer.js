import {
    addTransaction,
    addTransactionSuccess,
    addTransactionError,
    fetchTransactions,
    fetchTransactionsSuccess,
    fetchTransactionsError
} from "./types";

import {isEmpty} from "../../utils";

export const STATUS = {
    ADDING_TRANSACTION : "ADDING_TRANSACTION",
    FETCH_TRANSACTION : "FETCH_TRANSACTION",
    FETCH_TRANSACTIONS : "FETCH_TRANSACTIONS",
    IDLE : "IDLE"
};

export const ERROR = {
    ADD_TRANSACTION_ERROR : "ADD_TRANSACTION_ERROR",
    FETCH_TRANSACTIONS_ERROR : "FETCH_TRANSACTION_ERROR"
};

const intialState = {
     transaction : {},
     transactions : [],
     status : STATUS.IDLE,
     isEmpty: false,
     error: null
};

 export function transactionReducers(state = intialState, action){
     switch(action.type){
         case fetchTransactions :
             return {
                 ...state,
                 error: null,
                 status: STATUS.FETCH_TRANSACTIONS
             };
        
        case fetchTransactionsSuccess :
            return{
                ...state,
                error: null,
                status: STATUS.IDLE,
                transactions: action.payload,
                isEmpty: isEmpty(action.payload)
            };

        case fetchTransactionsError :
            return{
                ...state,
                status: STATUS.IDLE,
                error: ERROR.FETCH_TRANSACTIONS_ERROR
            };

        case addTransaction :
            return{
                ...state,
                error: null,
                status: STATUS.ADDING_TRANSACTION
            };

        case addTransactionSuccess :
            return{
                ...state,
                status: STATUS.IDLE,
                transactions: [action.payload, ...state.transactions]
            };

        case addTransactionError :
            return{
                ...state,
                status: STATUS.IDLE,
                error: ERROR.ADD_TRANSACTION_ERROR
            };

        default :
            return state;
     }
 }