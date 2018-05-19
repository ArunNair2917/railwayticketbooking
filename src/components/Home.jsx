import React from 'react';
import {Link} from 'react-router-dom';
import RunningStatus from '../images/Running-Status.png';
import TrainRoute from '../images/Train-Route.png';
import TrainsBetweenStations from '../images/Trains-between-stations.png';
import TrainsArrivalBetweenStations from '../images/Trains-arrival-at-stations.png';
import CancelledTrains from '../images/Cancelled-Trains.png';
import RescheduledTrains from '../images/RESCHEDULED-TRAINS2.png';

class Home extends React.Component {

  render() {
    return (
      <div className="container-fluid" style={{marginTop : '30px'}}>
        <div className='row' style={{marginBottom : '30px'}}>
          <div className="col-sm-1"></div>
          <div className="col-sm-5 text-center">
            <Link to="/live-status"><div className="embed-responsive embed-responsive-16by9"><img className="embed-responsive-item" src={RunningStatus} alt="Running Status"/></div></Link>
          </div>
          <div className="col-sm-5 text-center">
            <Link to="/train-schedule"><div className="embed-responsive embed-responsive-16by9"><img className="embed-responsive-item" src={TrainRoute} alt="Running Status"/></div></Link>
          </div>
          <div className="col-sm-1"></div>
        </div>

        <div className='row' style={{marginBottom : '30px'}}>

          <div className="col-sm-1"></div>

            <div className="col-sm-5 text-center">
              <Link to="/trains-between-stations"><div className="embed-responsive embed-responsive-16by9"><img className="embed-responsive-item" src={TrainsBetweenStations} alt="TrainsBetweenStations"/></div></Link>
            </div>

            <div className="col-sm-5 text-center">
              <Link to="/train-arrivals-at-station"><div className="embed-responsive embed-responsive-16by9"><img className="embed-responsive-item" src={TrainsArrivalBetweenStations} alt="TrainsArrivalBetweenStations"/></div></Link>
            </div>

          <div className="col-sm-1"></div>

        </div>

        <div className='row' style={{marginBottom : '30px'}}>

          <div className="col-sm-1"></div>

            <div className="col-sm-5 text-center">
              <Link to="/cancelled-trains"><div className="embed-responsive embed-responsive-16by9"><img className="embed-responsive-item" src={CancelledTrains} alt="CancelledTrains"/></div></Link>
            </div>

            <div className="col-sm-5 text-center">
              <Link to="/rescheduled-trains"><div className="embed-responsive embed-responsive-16by9"><img className="embed-responsive-item" src={RescheduledTrains} alt="RescheduledTrains"/></div></Link>
            </div>

          <div className="col-sm-1"></div>

        </div>
      </div>
    );
  }

}

export default Home;
