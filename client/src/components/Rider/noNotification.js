import React from 'react';


export default function NoNotification({ close }) {
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
                <h1>Sorry !</h1>
              </div>
              <div className="notif-span ">
                <h1>No Notification Till Now</h1>
              </div>
              <div className="notif-span ">
                <h1> You can`t book any Ride </h1>
              </div>

            </div>
            <button
              type="submit"
              className="request-form-btn"
              onClick={Submit}
            >
              OK ,Close It
          </button>
          </form>
          </div>
        </div>

      </div>
    </div>
  )
}
