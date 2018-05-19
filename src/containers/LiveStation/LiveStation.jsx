import React from 'react';
import LiveStationSender from './LiveStationSender';
import LiveStationReciever from './LiveStationReciever';

class LiveStation extends React.Component {

  render() {
    return (
      <div>
        <LiveStationSender/>
        <LiveStationReciever/>
      </div>
    );
  }

}

export default LiveStation;
