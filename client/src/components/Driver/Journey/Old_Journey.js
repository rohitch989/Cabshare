import React, { useEffect } from 'react';
import { timeadd } from '../../Rawfn/function';
import { connect } from 'react-redux';
import { getJourney, deleteJourney } from '../../../Actions/Driver/JAction';

const Old_Journey = (props) => {
  const { getJourney, notification, deleteJourney } = props

  useEffect(() => {
    getJourney();
  }, [getJourney]);
  console.log(notification)
  const list = notification && notification.map(not => {
    const date = new Date(not.Date).toString();
    const time = date.slice(16, 24);
    const newtime = timeadd(time, not.duration);
    return (
      <div key={not._id} className='accordion-item' >
        <div className='accordion-title'>
          <div>Dropping Mr. {not.guest} on  {date.slice(0, 15)} </div>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className='accordion-content'>
          <p>
            You picked Mr. {not.guest} from  {not.pickuppoint.name} at time {time} and dropped him at place {not.droppoint.name} at time {newtime}
          </p>
          <div className='old-journey-btn'>
            <button onClick={() => deleteJourney(not._id)}>
              Delete
            </button>
          </div>
        </div>
      </div>)
  });
  return (<div>

    {list && list.length !== 0 ? <div>{list}</div> : <div className='off-going'>No Previous Ride</div>
    }
  </div>)
}
const mapStateToProps = (state) => ({
  notification: state.JourneyD.journey
});

export default connect(mapStateToProps, { getJourney, deleteJourney })(Old_Journey);   