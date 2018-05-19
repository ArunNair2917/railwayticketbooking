import {FETCHING_TRAINS_BETWEEN_STATIONS , IS_FETCHING_TRAINS_BETWEEN_STATIONS , ERROR_FETCHING_TRAINS_BUSY_MESSAGE } from '../actions';

const INITIAL_STATE = { info : null , isFetching : false , errorMessage : false };

export default function(state = INITIAL_STATE , action){
  switch (action.type) {
    case IS_FETCHING_TRAINS_BETWEEN_STATIONS:
        return {...state , isFetching : true}
    case FETCHING_TRAINS_BETWEEN_STATIONS:
        return {...state , info : action.payload.data , isFetching : false};
    case ERROR_FETCHING_TRAINS_BUSY_MESSAGE:
        return {...state , errorMessage : true , isFetching : false}
    default:
        return state;
  }
}
