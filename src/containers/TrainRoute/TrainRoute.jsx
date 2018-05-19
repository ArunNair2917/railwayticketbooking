import React from 'react';
import TrainRouteSender from './TrainRouteSender';
import TrainRouteReciever from './TrainRouteReciever';

class TrainRotue extends React.Component {

  render() {
    return (
      <div>
        <TrainRouteSender/>
        <TrainRouteReciever/>
      </div>
    );
  }

}

export default TrainRotue;
