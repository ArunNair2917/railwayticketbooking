import React from 'react';
import LiveStatusSender from './LiveStatusSender';
import LiveStatusReciever from './LiveStatusReciever';

class LiveStatus extends React.Component {

  render() {
    return (
      <div>
        <LiveStatusSender/>
        <LiveStatusReciever/>
      </div>
    );
  }

}

export default LiveStatus;
