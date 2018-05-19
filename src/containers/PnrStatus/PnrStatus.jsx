import React from 'react';
import PnrStatusSender from './PnrStatusSender';
import PnrStatusReciever from './PnrStatusReciever';

class PnrStatus extends React.Component {

  render() {
    return (
      <div>
        <PnrStatusSender/>
        <PnrStatusReciever/>
      </div>
    );
  }

}

export default PnrStatus;
