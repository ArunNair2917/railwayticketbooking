import {PNR_STATUS , IS_FETCHING_PNR_STATUS , ERROR_MESSAGE} from '../actions/index';

const INITIAL_STATE = { info : null , isFetching : false , errorMessage : false };

export default function(state = INITIAL_STATE , action){
  switch (action.type) {
    case IS_FETCHING_PNR_STATUS :
      return { ...state , isFetching : true}
    case PNR_STATUS :
      return { ...state , info : action.payload.data , isFetching : false}
    case ERROR_MESSAGE :
      return { ...state , errorMessage : true , isFetching : false}
    default :
      return state ;
  }
}
