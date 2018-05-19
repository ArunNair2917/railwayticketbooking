import {TRAIN_ROUTE , IS_FETCHING_TRAIN_ROUTE , ERROR_TRAIN_ROUTE_BUSY_MESSAGE } from '../actions';

const INITIAL_STATE = { info : null , isFetching : false , errorMessage : false };

export default function(state = INITIAL_STATE , action){
  switch (action.type) {
    case IS_FETCHING_TRAIN_ROUTE:
        return {...state , isFetching : true}
    case TRAIN_ROUTE:
        return {...state , info : action.payload.data , isFetching : false};
    case ERROR_TRAIN_ROUTE_BUSY_MESSAGE:
        return {...state , errorMessage : true , isFetching : false}
    default:
        return state;
  }
}
