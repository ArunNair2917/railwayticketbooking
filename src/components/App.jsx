import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Route} from 'react-router-dom';
import BackgroundImage from './BackgroundImage';
import Home from './Home.jsx';
import Footer from './Footer.jsx';

import LiveStatus from '../containers/LiveStatus/LiveStatus';
import PnrStatus from '../containers/PnrStatus/PnrStatus';
import TrainRoute from '../containers/TrainRoute/TrainRoute';
import TrainsBetweenStations from '../containers/TrainsBetweenStations/TrainsBetweenStations';
import LiveStation from '../containers/LiveStation/LiveStation';
import CancelledTrains from '../containers/CancelledTrains/CancelledTrains';
import RescheduledTrains from '../containers/RescheduledTrains/RescheduledTrains';

class App extends React.Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <BackgroundImage/>
          <Route exact path="/" component={Home}/>
          <Route path="/live-status" component={LiveStatus}/>
          <Route path="/pnr-status" component={PnrStatus}/>
          <Route path="/train-schedule" component={TrainRoute}/>
          <Route path="/trains-between-stations" component={TrainsBetweenStations}/>
          <Route path="/train-arrivals-at-station" component={LiveStation}/>
          <Route path="/cancelled-trains" component={CancelledTrains}/>
          <Route path="/rescheduled-trains" component={RescheduledTrains}/>
          <Footer/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default App;
