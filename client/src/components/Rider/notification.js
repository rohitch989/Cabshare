import React from 'react';


export default function Notification({ close, notification }) {
  const Submit = (e) => {
    e.preventDefault()
    close()
  }

  return (
    <div>

      <div className='request-box'>
        <div className='modal-box'>
          <div className='modal-container'><form>
            <div className='modal-header'>
              <h1>Invitation For Ride</h1>
              <span onClick={() => { close() }}>&times;</span>
            </div>

            <div className='notif-modal-span'>
              <div className="notif-span">
                <h1>This is the Invitation to get Ride To college</h1>
              </div>
              <div className="notif-span ">
                <h1>On Date {notification.Date.slice(0, 15)} As Cab is returning from place {notification.droppoint.name} </h1>
              </div>
              <div className="notif-span ">
                <h1> at time {notification.Date.slice(16, 24)} to college So whoever are willing to take ride  </h1>
              </div>
              <div className="notif-span ">
                <h1>Can Put their Request on to get A ride  .</h1>
              </div>
              <div className="notif-span ">
                <h1>For any query you may contact Me</h1>
              </div>
            </div>
            <button
              type="submit"
              className="request-form-btn"
              onClick={Submit}
            >
              OK ,Close It
          </button></form>
          </div>
        </div>

      </div>
    </div>
  )
}
