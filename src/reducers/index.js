import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import autoSuggestReducer from './autoSuggestReducer';
import liveStatusReducer from './liveStatusReducer';
import pnrStatusReducer from './pnrStatusReducer';
import trainRouteReducer from './trainRouteReducer';
import trainsBetweenStationsReducer from './trainsBetweenStationsReducer';
import stationSuggestReducer from './stationSuggestReducer';
import liveStationReducer from './liveStationReducer';
import cancelledTrainsReducer from './cancelledTrainsReducer';
import rescheduledTrainsReducer from './rescheduledTrainsReducer';

const rootReducer = combineReducers({
  form : formReducer,
  autoSuggestReducer,
  liveStatusReducer,
  pnrStatusReducer,
  trainRouteReducer,
  trainsBetweenStationsReducer,
  stationSuggestReducer,
  liveStationReducer,
  cancelledTrainsReducer,
  rescheduledTrainsReducer
});

export default rootReducer ;
