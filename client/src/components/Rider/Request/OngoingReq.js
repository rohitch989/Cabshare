import React from "react";

const OngoingReq = (props) => {
  const { onGoing } = props;

  const Onlist =
    onGoing &&
    onGoing.map((request) => {
      const date = request.Date;
      const time = date.slice(16, 24);
      return (
        <div className='on-table'>
          <div>Time</div>
          <div>Status</div>
          <div>No. of Person</div>
          <div>Destination</div>
          <div>{time}</div>
          <div>{request.status}</div>
          <div>{request.noofperson}</div>
          <div>{request.droppoint.name.slice(0, 16)}</div>
        </div>
      );
    });

  return (<div>
    {Onlist && Onlist.length !== 0 ? <div>{Onlist}</div> : <div className='off-going'>No Ongoing Request</div>
    }
  </div>)

}



export default OngoingReq;
