import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateRequest } from '../../../../Actions/Rider/requestAction';
import { getJourney, updatejourney } from '../../../../Actions/Driver/JAction';

const Requestlist = (props) => {
  const [display, setdisplay] = useState(false);
  const radius = { borderRadius: '17px' }

  const { newreq, show, count, notification, getJourney, updatejourney } = props;
  const list = newreq && newreq.slice(-9);
  useEffect(() => {
    getJourney()
  }, [getJourney])


  // Update Request
  const status = async (status, request) => {
    if (status !== undefined) {
      const update = { status, id: request._id };
      await props.updateRequest(update);
    }
    if (status === 'accept' && notification.Date === new Date()) {
      const id = notification._id;
      const returnjourney = { name: request.name, pickuppoint: request.pickuppoint, droppoint: request.droppoint, id, status }
      updatejourney(returnjourney)
    }
  };


  if (list.length !== 0) {
    return (
      <div>




        {
          list.map(request => {
            const date = request.Date;
            const time = date.slice(16, 24);
            return (
              <div key={request.id}>
                <div className='new-grid'>
                  <div onClick={() => { setdisplay(display => !display) }}>Status</div>

                  <div>Name</div>
                  <div>Time</div>
                  <div>No. of Person</div>
                  <div>Destination</div>
                  <div onClick={() => {
                    setdisplay(display => !display)
                  }}>{request.status}</div>

                  <div >{request.name.name}</div>
                  <div>{time}</div>
                  <div>{request.noofperson}</div>
                  <div>{request.droppoint.name.slice(0, 15)}</div>
                </div>
                {display ?
                  <div className='request-box'>
                    <div className='modal-box'>
                      <div className='modal-container'>
                        <div className='modal-header'>
                          <h1>New Request</h1>
                          <span onClick={() => { setdisplay(display => !display) }}>&times;</span>
                        </div>

                        <h4 >Mr. {request.name.name} </h4>

                        <p >Has Requested For Cab to pick him up from</p>
                        <h6 >{request.pickuppoint.name}</h6>
                        <p >  to drop him at</p>
                        <h6 >{request.droppoint.name}</h6>
                        <p >At Time <span >{time}</span></p>
                        <hr className='bg-white' />
                        <div ><button type="button" style={radius} onClick={() => status('reject', request) ? alert(`${request.name} request has been rejected !`) : null}>R e j e c t</button>

                          <button type="button" style={radius} onClick={() => count <= 5 ?
                            (status('accept', request), show(request)) : alert('could not be accepted ! Number of Person Exceeds the limit')} >A c c e p t </button></div>


                      </div>
                    </div>
                  </div>
                  : null}
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
const mapStateToProps = (state) => ({
  notification: state.JourneyD.journey
});
export default connect(mapStateToProps, { updateRequest, getJourney, updatejourney })(Requestlist);
