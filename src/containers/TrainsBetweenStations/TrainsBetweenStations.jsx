import React from 'react';
import TrainsBetweenStationsSender from './TrainsBetweenStationsSender';
import TrainsBetweenStationsReciever from './TrainsBetweenStationsReciever';

class TrainRotue extends React.Component {

  render() {
    return (
      <div>
        <TrainsBetweenStationsSender/>
        <TrainsBetweenStationsReciever/>
      </div>
    );
  }

}

export default TrainRotue;
