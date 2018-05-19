import React from 'react';
import RescheduledTrainsSender from './RescheduledTrainsSender';
import RescheduledTrainsReciever from './RescheduledTrainsReciever';

class RescheduledTrains extends React.Component {

  render() {
    return (
      <div>
        <RescheduledTrainsSender/>
        <RescheduledTrainsReciever/>
      </div>
    );
  }

}

export default RescheduledTrains;
