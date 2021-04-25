import React from "react";



export default function NewRequestList({ newrequest, Delete }) {

  if (newrequest.length !== 0) {
    return (
      <div>
        {
          newrequest.map(request => {
            const date = request.Date;
            const time = date.slice(16, 24);
            return (
              <div className='new-grid' key={request.id}>
                <div>#</div>
                <div>Time</div>
                <div>Status</div>
                <div>No. of Person</div>
                <div>Destination</div>
                <button className='req-btn' onClick={() => Delete(request._id)
                  ? alert(`Request of placed at time ${time} on ${date} has been deleted `) : null}>
                  &times;
            </button>
                <div>{time}</div>
                <div>{request.status}</div>
                <div>{request.noofperson}</div>
                <div>{request.droppoint.name.slice(0, 15)}</div>
              </div>
            );
          })
        }

      </div>
    );
  } else {
    return <div className='off-going'>No New request...</div>;
  }


}
