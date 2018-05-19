import React from 'react';
import CancelledTrainsSender from './CancelledTrainsSender';
import CancelledTrainsReciever from './CancelledTrainsReciever';

class CancelledTrains extends React.Component {

  render() {
    return (
      <div>
        <CancelledTrainsSender/>
        <CancelledTrainsReciever/>
      </div>
    );
  }

}

export default CancelledTrains;
