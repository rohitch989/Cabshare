import React, { Component } from 'react';
import './Rider.css';
import Login from './Login';
import SignUp from './Signup';
export class WelcomeR extends Component {
  state = {
    form: 'login'
  }
  render() {
    return (
      <div className='rider-background '>


        <div className='rider-content'>
          <h1 className='rider-h1'>
            Rider
          </h1>
          <p className='rider-paragraph'>Please Log In to Book A cab</p>
        </div>

        <div className='rider-span'>
          <div className='form-signup'>
            <input type='radio' id='login' name='signup' className='rider-form-radio-sign' defaultChecked onClick={
              () => this.setState({ form: 'login' })
            } />
            <span ></span>

            <label htmlFor='login'> Login</label>
          </div>
          <div className='form-signup'>
            <input type='radio' id='signUp' name='signup' className='rider-form-radio' onClick={
              () => {
                this.setState({ form: 'signup' })
              }
            } />
            <span ></span>
            <label htmlFor='signUp'> SignUp</label>
          </div>

        </div>
        <div className='rider-form'>
          {
            this.state.form === 'login' ? <div><Login /></div> : <div><SignUp /></div>
          }
        </div>

      </div>

    )
  }
}

export default WelcomeR
