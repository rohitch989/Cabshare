import React from "react";

const OngoingReq = (props) => {
  const { onGoing } = props;

  const Onlist =
    onGoing &&
    onGoing.map((request) => {
      return (
        <div className='on-table'>
          <div>Name</div>
          <div>No. of Person</div>
          <div>pickuppoint</div>
          <div>Destination</div>
          <div>{request
            .name.name}</div>
          <div>{request.noofperson}</div>
          <div>{request.pickuppoint.name.slice(0, 16)}</div>

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
